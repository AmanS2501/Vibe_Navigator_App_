import os
import json
import re
from dotenv import load_dotenv, find_dotenv
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from langchain.schema import Document
from langchain.prompts import PromptTemplate
from services.test_scraper import main as scraper_main

load_dotenv(find_dotenv(), override=True)
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

summary_prompt = PromptTemplate(
    input_variables=["context", "location", "tags"],
    template="""
Summarize the vibe of '{location}' using the following reviews.
Use a playful tone, include emojis and mood tags ({tags}),
and cite each review by its source.
Reviews: {context}
"""
)
agent_prompt = PromptTemplate(
    input_variables=["user_message", "vibe_cards", "history"],
    template="""
You are Vibe Navigator, a witty, friendly city expert.
Here is the chat so far: {history}
User asked: "{user_message}"
Based on these vibe cards, recommend a personalized tour in a storytelling style.
Reference real reviews and keep the tone playful and casual.
Vibe Cards: {vibe_cards}
"""
)
llm = ChatGroq(
    api_key=os.environ["GROQ_API_KEY"],
    model_name="llama3-8b-8192"
)

def extract_place_name(user_query):
    pattern1 = re.compile(
        r"\b(?:in|at|from|near|around)\s+([A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*)*)",
        re.IGNORECASE
    )
    matches = pattern1.findall(user_query)
    if matches:
        filtered = [
            m for m in matches if not any(
                x in m.lower() for x in [
                    'with', 'for', 'the', 'best', 'find', 'place', 'places',
                    'restaurants', 'cafes', 'bars', 'spots'
                ]
            )
        ]
        if filtered:
            cleaned = []
            for m in filtered:
                split_words = re.split(
                    r'\s+(with|for|the|and|or|but|near|in|at|from)\b',
                    m,
                    flags=re.IGNORECASE
                )
                cleaned.append(split_words[0].strip())
            return max(cleaned, key=len).strip()
        else:
            return max(matches, key=len).strip()
    pattern2 = re.compile(r"([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)")
    matches2 = pattern2.findall(user_query)
    if matches2:
        return max(matches2, key=len).strip()
    pattern3 = re.compile(r"\b([A-Z][a-z]+)\b")
    matches3 = pattern3.findall(user_query)
    if matches3:
        filtered3 = [
            m for m in matches3 if m.lower() not in [
                'find', 'tell', 'show', 'best', 'places', 'place',
                'restaurants', 'cafes', 'bars', 'spots'
            ]
        ]
        if filtered3:
            return filtered3[-1].strip()
        else:
            return matches3[-1].strip()
    return ""

async def run_full_pipeline(user_message, category, vibe_tags, chat_history):
    place_name = extract_place_name(user_message)
    await scraper_main(place_name)
    json_file = f"/content/restaurant_reviews_{place_name.replace(' ', '_').lower()}.json"
    with open(json_file, 'r', encoding='utf-8') as f:
        all_reviews = json.load(f)
    def get_field(item, key, fallback=''):
        if key == 'text':
            return item.get('text') or item.get('review_text') or ''
        return item.get(key, fallback)
    filtered_reviews = []
    for item in all_reviews:
        item['location_name'] = get_field(item, 'location_name')
        item['text'] = get_field(item, 'text')
        item['source'] = get_field(item, 'source')
        item['category'] = get_field(item, 'category')
        item['city'] = get_field(item, 'city')
        item['author'] = get_field(item, 'author')
        item['date'] = get_field(item, 'date')
        item['source_url'] = get_field(item, 'source_url')
        item['helpful_count'] = get_field(item, 'helpful_count', 0)
        if place_name.lower() in (item['city'] or '').lower() or place_name.lower() in (item['location_name'] or '').lower():
            filtered_reviews.append(item)
    docs = []
    for idx, item in enumerate(filtered_reviews):
        metadata = {
            "location_name": item['location_name'],
            "source": item['source'],
            "category": item['category'],
            "city": item['city'],
            "author": item['author'],
            "date": item['date'],
            "source_url": item['source_url'],
            "helpful_count": item['helpful_count'],
            "doc_id": str(idx)
        }
        docs.append(Document(page_content=item['text'], metadata=metadata))
    embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vectorstore = Chroma.from_documents(
        documents=docs,
        embedding=embedding_model,
        persist_directory="/content/chromadb"
    )
    vectorstore.persist()
    def generate_summary_groq(reviews, location, tags):
        context = "\n".join(reviews)
        prompt = summary_prompt.format(context=context, location=location, tags=", ".join(tags))
        response = llm.invoke(prompt)
        return response.content if hasattr(response, "content") else response
    def suggest_locations(place, category, vibe_tags, k=5):
        query = f"{category} in {place} with {' and '.join(vibe_tags)} vibe"
        retriever = vectorstore.as_retriever(search_kwargs={"k": k})
        retrieved_docs = retriever.get_relevant_documents(query)
        vibe_cards = []
        for doc in retrieved_docs:
            reviews = [doc.page_content]
            location = doc.metadata.get("location_name", "Unknown Location")
            summary = generate_summary_groq(reviews, location, vibe_tags)
            vibe_cards.append({
                "location": location,
                "summary": summary,
                "tags": vibe_tags,
                "source": doc.metadata.get("source", ""),
                "source_url": doc.metadata.get("source_url", "")
            })
        return vibe_cards
    vibe_cards = suggest_locations(place_name, category, vibe_tags)
    prompt = agent_prompt.format(
        user_message=user_message,
        vibe_cards=json.dumps(vibe_cards),
        history=json.dumps(chat_history)
    )
    response = llm.invoke(prompt)
    answer = response.content if hasattr(response, "content") else response
    return vibe_cards, answer
