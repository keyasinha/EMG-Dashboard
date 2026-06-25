import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    THINGSPEAK_CHANNEL_ID: str = os.getenv("THINGSPEAK_CHANNEL_ID", "3414979")
    THINGSPEAK_READ_API_KEY: str = os.getenv("THINGSPEAK_READ_API_KEY", "54V9WM6UNJQH0EBF")
    THINGSPEAK_BASE_URL: str = os.getenv("THINGSPEAK_BASE_URL", "https://api.thingspeak.com")

    FIELD_MAP: dict = {
        "field1": "emg_average",
        "field2": "emg_rms",
        "field3": "muscle_load",
    }

    @property
    def ALLOWED_ORIGINS(self) -> list[str]:
        raw = os.getenv("ALLOWED_ORIGINS", '["http://localhost:3000","http://localhost:5173"]')
        # Strip brackets and quotes, split by comma
        raw = raw.strip("[]").replace('"', "").replace("'", "")
        return [o.strip() for o in raw.split(",") if o.strip()]


settings = Settings()
