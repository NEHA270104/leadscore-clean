# server/genai_init.py
import os
from dotenv import load_dotenv

# load server/.env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

ENABLE_GENAI = os.getenv("ENABLE_GENAI", "false").lower() in ("1", "true", "yes")
client = None

if ENABLE_GENAI:
    GENAI_API_KEY = os.getenv("GENAI_API_KEY")
    if not GENAI_API_KEY:
        raise RuntimeError("GENAI_API_KEY missing in server/.env")

    import google.generativeai as genai
    genai.configure(api_key=GENAI_API_KEY)
    client = genai.Client()
    print("GenAI client configured.")
else:
    print("GenAI disabled.")
