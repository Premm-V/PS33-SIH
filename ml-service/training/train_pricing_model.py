"""
train_pricing_model.py

Trains a simple, explainable model that predicts a fair price range for a
crop, given: crop, zone, and roughly what time of year it is.

Run this AFTER generate_synthetic_data.py.
Output: models/pricing_model.pkl
"""

import pandas as pd
import joblib
from datetime import datetime
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error


def load_data():
    df = pd.read_csv("training/historical_transactions.csv")
    df["date"] = pd.to_datetime(df["date"])
    df["day_of_year"] = df["date"].dt.dayofyear
    return df


def build_features(df):
    # Turn crop/zone text into numbers the model can use (one-hot encoding).
    # This is the standard, simple way to handle category columns.
    features = pd.get_dummies(df[["crop", "zone"]])
    features["day_of_year"] = df["day_of_year"]
    return features


def main():
    df = load_data()
    X = build_features(df)
    y = df["price"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    mae = mean_absolute_error(y_test, predictions)
    print(f"Model trained. Average prediction error: Rs {mae:.2f} per kg")
    print("(This is expected to be small since the data is synthetic and clean.)")

    # Save the model AND the exact list of feature columns it expects,
    # so the API can build a matching input row at prediction time.
    joblib.dump({"model": model, "feature_columns": list(X.columns)}, "models/pricing_model.pkl")
    print("Saved model to models/pricing_model.pkl")


if __name__ == "__main__":
    main()
