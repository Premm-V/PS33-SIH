"""
main.py

The ML microservice. This is the ONLY file the backend team talks to.
They call POST /predict/price, they never touch the model file directly.

Run with: uvicorn main:app --host 0.0.0.0 --port 8069
Then test in a browser at: http://localhost:8069/docs
"""

from datetime import datetime
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="Farmer Marketplace ML Service")

# Load the trained model ONCE at startup, not on every request (much faster).
saved = joblib.load("models/pricing_model.pkl")
model = saved["model"]
feature_columns = saved["feature_columns"]


# This defines exactly what the backend must send us.
# Matches api-contract.md's price-suggestion request shape.
class PriceRequest(BaseModel):
    crop: str
    zone: str
    quantity_kg: float
    date: str  # e.g. "2026-09-01"


# This defines exactly what we send back. Matches api-contract.md.
class PriceResponse(BaseModel):
    suggested_min: float
    suggested_max: float


def build_input_row(crop: str, zone: str, day_of_year: int) -> pd.DataFrame:
    """
    Turns a plain request into the same one-hot-encoded shape the model
    was trained on. If the model was trained with a "crop_Tomato" column,
    we need a matching column here, set to 1 or 0.
    """
    row = {col: 0 for col in feature_columns}
    row["day_of_year"] = day_of_year

    crop_col = f"crop_{crop}"
    zone_col = f"zone_{zone}"
    if crop_col in row:
        row[crop_col] = 1
    if zone_col in row:
        row[zone_col] = 1

    return pd.DataFrame([row])[feature_columns]


@app.post("/predict/price", response_model=PriceResponse)
def predict_price(req: PriceRequest):
    day_of_year = datetime.fromisoformat(req.date).timetuple().tm_yday
    input_row = build_input_row(req.crop, req.zone, day_of_year)

    predicted_price = model.predict(input_row)[0]

    # Give a small range around the point prediction rather than one exact
    # number — a range reads as more honest and is more useful to a farmer
    # than a single number claiming false precision.
    suggested_min = round(predicted_price * 0.9, 2)
    suggested_max = round(predicted_price * 1.1, 2)

    return PriceResponse(suggested_min=suggested_min, suggested_max=suggested_max)


@app.get("/")
def health_check():
    return {"status": "ML service is running"}
