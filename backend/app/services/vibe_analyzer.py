from typing import List, Dict

class VibeAnalyzer:
    def analyze_location_vibe(self, reviews: List[Dict]) -> Dict:
        
        tags = []
        emojis = []
        text = " ".join([r["text"] for r in reviews[:10]])
        if any(word in text.lower() for word in ["cozy", "comfy", "warm"]): tags.append("cozy"); emojis.append("☕")
        if any(word in text.lower() for word in ["aesthetic", "beautiful", "decor"]): tags.append("aesthetic"); emojis.append("🌸")
        if any(word in text.lower() for word in ["lively", "crowd", "music"]): tags.append("lively"); emojis.append("🎶")
        if any(word in text.lower() for word in ["quiet", "peaceful", "calm"]): tags.append("quiet"); emojis.append("🌿")
        if any(word in text.lower() for word in ["cheap", "affordable", "budget"]): tags.append("budget-friendly"); emojis.append("💸")
        summary = f"This place feels {' and '.join(tags) if tags else 'unique'}! {''.join(emojis)}"
        return {
            "tags": tags,
            "emojis": emojis,
            "summary": summary,
            "confidence": min(1.0, len(tags)/5),
            "quotes": [r["text"][:100] for r in reviews[:3]]
        }
