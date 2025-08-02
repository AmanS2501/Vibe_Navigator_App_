# 🌟 Vibe Navigator

**An AI-Powered City Explorer for Discovering Authentic Local Vibes**

Vibe Navigator is a full-stack web application that helps users discover the real vibe of any place—cafés, restaurants, bars, and more—grounded in authentic reviews from Google Maps and Reddit. Built with a custom RAG (Retrieval-Augmented Generation) pipeline and LLMs, it generates mood-based recommendations and interactive, storytelling responses.

## 🚀 Features

- **Real-time Review Scraping**: Automatically collects authentic reviews from Google Maps and Reddit
- **Semantic Search**: Powered by ChromaDB for intelligent review analysis
- **Mood-Based Recommendations**: AI-generated vibe summaries with mood tags and emojis
- **Transparent Citations**: Every recommendation includes source review citations
- **Conversational AI Agent**: Context-aware chat interface using LangChain
- **Session History**: Seamless exploration with maintained chat context
- **Mobile-Friendly**: Responsive design for all devices

## 🛠️ Tech Stack

### Frontend
- **Streamlit**: Modern, interactive UI with mobile-friendly design
- **Deployment**: Streamlit Community Cloud

### Backend
- **FastAPI**: Scalable, async, modular API architecture
- **Deployment**: Render.com
- **Features**: CORS handling, error management, environment variables

### Data Processing
- **Scraping**: Python scripts for Google Maps & Reddit data collection
- **Reddit API**: asyncpraw for asynchronous Reddit data fetching
- **Vector Database**: ChromaDB for semantic search capabilities

### AI & ML
- **LLM**: Groq (Llama3) for summarization and conversational responses
- **Framework**: LangChain for AI agent orchestration
- **RAG Pipeline**: Custom Retrieval-Augmented Generation implementation

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Streamlit UI  │◄──►│   FastAPI       │◄──►│   Data Sources  │
│   (Frontend)    │    │   (Backend)     │    │   (Maps/Reddit) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                               │
                               ▼
                    ┌─────────────────┐
                    │   ChromaDB      │
                    │   (Vector DB)   │
                    └─────────────────┘
                               │
                               ▼
                    ┌─────────────────┐
                    │   Groq/Llama3   │
                    │   (LLM)         │
                    └─────────────────┘
```

## 🌐 Live Demo

- **Frontend**: [Vibe Navigator App](https://lnkd.in/dfmrygUG)
- **Backend API**: [API Documentation](https://lnkd.in/dCgaCkJR)

> **Note**: Due to heavy real-time scraping and large data processing requirements, the backend may occasionally exceed free tier memory limits. Complete deployment optimization is in progress.

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js (for any frontend dependencies)
- API keys for Groq and Reddit

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/AmanS2501/Vibe_Navigator_App_
cd Vibe_Navigator_App_
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
# Create .env file
GROQ_API_KEY=your_groq_api_key
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=your_reddit_user_agent
```

4. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Streamlit dependencies:
```bash
pip install streamlit
```

3. Run the Streamlit app:
```bash
streamlit run app.py
```

## 🔧 Usage

### Basic Usage

1. **Enter a Location**: Type in any city, neighborhood, or specific place
2. **Get Vibe Summary**: Receive AI-generated mood analysis with emojis and tags
3. **Explore Recommendations**: Browse curated suggestions based on authentic reviews
4. **Chat with AI**: Ask follow-up questions for personalized recommendations
5. **View Citations**: Access source reviews for transparency

### API Endpoints

- `GET /health` - Health check
- `POST /search` - Search for place vibes
- `POST /chat` - Conversational AI interface
- `GET /reviews/{place_id}` - Get raw review data

## 🧠 How It Works

### 1. Data Collection
- Scrapes real-time reviews from Google Maps and Reddit
- Processes and cleans review text for analysis
- Stores data in structured format

### 2. Semantic Processing
- Embeds reviews using ChromaDB vector database
- Enables semantic search across review content
- Maintains context and relevance scoring

### 3. AI Generation
- Uses Groq's Llama3 model for natural language generation
- Implements RAG pipeline for grounded responses
- Provides mood-based summaries with emotional context

### 4. User Interaction
- Streamlit frontend for intuitive user experience
- Session-based chat history for continuous exploration
- Real-time response generation

## 🚧 Current Limitations

- **Memory Usage**: Heavy real-time scraping may exceed free tier limits
- **Rate Limits**: API calls may be throttled during peak usage
- **Data Freshness**: Reviews are scraped in real-time, which may affect response speed

## 🔮 Future Enhancements

- [ ] Implement caching for frequently requested locations
- [ ] Add user authentication and personalized recommendations
- [ ] Expand to more data sources (Yelp, TripAdvisor, etc.)
- [ ] Mobile app development
- [ ] Advanced filtering and sorting options
- [ ] Integration with mapping services

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Jinvaanii AI** and **Shivang Jain** for organizing the hackathon
- **Open Source Community** for the amazing Python and AI tools
- **Groq** for providing the Llama3 model
- **ChromaDB** for vector database capabilities
- **Streamlit** and **FastAPI** communities for excellent frameworks

## 📧 Contact

**Aman Shaikh** - [@AmanS2501](https://github.com/AmanS2501)

Project Link: [https://github.com/AmanS2501/Vibe_Navigator_App_](https://github.com/AmanS2501/Vibe_Navigator_App_)

---

*Built with ❤️ during the AI Hackathon | Powered by AI, Grounded in Reality*

## 🏷️ Tags

`#AI` `#Hackathon` `#Python` `#FastAPI` `#Streamlit` `#Groq` `#ChromaDB` `#LLM` `#FullStack` `#OpenSource` `#VibeNavigator` `#JinvaaniAI` `#LangChain` `#RAG` `#NLP` `#WebScraping`
