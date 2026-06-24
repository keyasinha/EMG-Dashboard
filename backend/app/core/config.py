from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # ThingSpeak
    THINGSPEAK_CHANNEL_ID: str = "3414979"
    THINGSPEAK_READ_API_KEY: str = "54V9WM6UNJQH0EBF"
    THINGSPEAK_BASE_URL: str = "https://api.thingspeak.com"

    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]

    # Field mappings — extend here when adding ML features
    FIELD_MAP: dict = {
        "field1": "emg_average",
        "field2": "emg_rms",
        "field3": "muscle_load",
    }

    class Config:
        env_file = ".env"


settings = Settings()
