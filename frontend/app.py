import os
import sys
import json
import re
import streamlit as st
import requests
from dotenv import load_dotenv, find_dotenv

# --- Custom CSS for Enhanced UI and Chat History Visibility ---
st.markdown("""
    <style>
        .main-container {
            max-width: 900px;
            margin: 2.5rem auto 2.5rem auto;
            padding: 2.2rem 1.2rem 2.2rem 1.2rem;
            background: #f7fafc;
            border-radius: 18px;
            box-shadow: 0 8px 36px rgba(0,0,0,0.08);
        }
        .vibe-card {
            border: 1.5px solid #d1d5db;
            border-radius: 12px;
            background: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.04);
            padding: 20px 22px;
            margin-bottom: 18px;
            transition: box-shadow 0.2s;
        }
        .vibe-card:hover {
            box-shadow: 0 4px 18px rgba(0,0,0,0.10);
        }
        .vibe-title {
            font-size: 1.28em;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 0.2em;
        }
        .vibe-tags {
            color: #3182ce;
            font-size: 1em;
            margin-bottom: 0.5em;
        }
        .vibe-summary {
            font-size: 1.09em;
            color: #2d3748;
            margin: 10px 0 4px 0;
        }
        .vibe-source {
            color: #718096;
            font-size: 0.97em;
            margin-top: 6px;
        }
        .chat-history-block {
            background: #191c24;
            border-radius: 14px;
            padding: 17px 20px 10px 20px;
            margin-bottom: 14px;
            font-size: 1.06em;
            color: #f5f6fa;
            box-shadow: 0 2px 10px rgba(0,0,0,0.07);
        }
        .user-msg {
            background: #3e5c76;
            border-radius: 10px;
            margin-bottom: 8px;
            padding: 10px 16px;
            color: #f5f6fa;
        }
        .assistant-msg {
            background: #36b37e;
            border-radius: 10px;
            margin-bottom: 8px;
            padding: 10px 16px;
            color: #fff;
        }
        .stTextInput>div>div>input {
            font-size: 1.13em;
        }
        .stSelectbox>div>div>div>div {
            font-size: 1.09em;
        }
        .stMultiSelect>div>div>div>div {
            font-size: 1.09em;
        }
        @media (max-width: 600px) {
            .main-container { padding: 1rem 0.2rem; }
            .vibe-card { padding: 12px 8px; }
            .chat-history-block { padding: 10px 6px 6px 6px; }
        }
    </style>
""", unsafe_allow_html=True)

# --- Load Environment Variables (optional for frontend) ---
load_dotenv(find_dotenv(), override=True)

st.set_page_config(page_title="Vibe Navigator", page_icon="🌆", layout="centered")

# --- FastAPI Backend URL ---
BACKEND_URL = "https://vibe-navigator-app.onrender.com/get_vibe"

with st.container():
    st.markdown('<div class="main-container">', unsafe_allow_html=True)
    st.title("🌆 Vibe Navigator")
    st.markdown("#### Your AI-powered city explorer: Discover the vibe of any place, grounded in real reviews!")

    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []

    with st.form("vibe_query_form", clear_on_submit=False):
        user_message = st.text_input(
            "Ask your travel/vibe question (e.g., 'Tell me a great coffee shop in Delhi with a floral theme')", ""
        )
        category = st.selectbox(
            "Category", ["cafe", "restaurant", "bar", "park", "gym", "museum", "other"]
        )
        vibe_tags = st.multiselect(
            "Select vibe tags",
            [
                "aesthetic", "quiet", "lively", "nature-filled", "cozy", "budget-friendly",
                "floral", "romantic", "family-friendly", "luxury", "historic", "trendy",
                "hidden-gem", "pet-friendly"
            ],
            default=["cozy"]
        )
        submit = st.form_submit_button("Get Vibe Recommendations")

    if submit and user_message:
        st.session_state.chat_history.append({"role": "user", "content": user_message})
        payload = {
            "user_message": user_message,
            "category": category,
            "vibe_tags": vibe_tags,
            "chat_history": st.session_state.chat_history
        }
        with st.spinner("Getting recommendations from Vibe Navigator..."):
            try:
                response = requests.post(BACKEND_URL, json=payload, timeout=180)
                if response.status_code == 200:
                    result = response.json()
                    vibe_cards = result.get("vibe_cards", [])
                    answer = result.get("agent_answer", "")
                else:
                    st.error("Backend error! Please try again.")
                    vibe_cards = []
                    answer = ""
            except Exception as e:
                st.error(f"Backend connection error: {e}")
                vibe_cards = []
                answer = ""

        if vibe_cards:
            st.session_state.chat_history.append({"role": "system", "content": str(vibe_cards)})

        st.markdown("### ✨ Vibe Cards")
        for card in vibe_cards:
            st.markdown(f"""
            <div class="vibe-card">
                <div class="vibe-title">{card['location']}</div>
                <div class="vibe-tags"><b>Tags:</b> {', '.join(card['tags'])}</div>
                <div class="vibe-summary">{card['summary']}</div>
                <div class="vibe-source">Source: {card['source']} | <a href="{card['source_url']}" target="_blank">Review Link</a></div>
            </div>
            """, unsafe_allow_html=True)

        st.markdown("### 🤖 Vibe Navigator's Recommendation")
        if answer:
            st.success(answer)
            st.session_state.chat_history.append({"role": "assistant", "content": answer})

    # --- Improved Conversation History Block ---
    if st.session_state.chat_history:
        st.markdown("----")
        st.markdown('<div class="chat-history-block">', unsafe_allow_html=True)
        st.markdown("#### 💬 Conversation History", unsafe_allow_html=True)
        for entry in st.session_state.chat_history:
            if entry["role"] == "user":
                st.markdown(f'<div class="user-msg"><b>You:</b> {entry["content"]}</div>', unsafe_allow_html=True)
            elif entry["role"] == "assistant":
                st.markdown(f'<div class="assistant-msg"><b>Vibe Navigator:</b> {entry["content"]}</div>', unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
