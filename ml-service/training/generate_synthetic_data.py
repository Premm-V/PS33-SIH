"""
generate_synthetic_data.py  (v2 — 12 crops, grounded in real Sep 2026 mandi data)

Real, granular per-zone/per-day price history isn't publicly available, so we
still generate synthetic historical data to train on. BUT the starting point
(base prices) and the seasonal shape are no longer arbitrary — they're set
from actual Indian mandi/wholesale price reports checked in September 2026
(commodityonline.com mandi data, market.todaypricerates.com state mandi
boards, and CRISIL/RBI commentary on onion-tomato-potato seasonality).

This matters for the demo: if a judge asks "why is tomato ~20/kg and apple
~150/kg", the honest answer is "that's roughly what mandis were actually
reporting in September 2026" — not a made-up number.

Run this FIRST, before train_pricing_model.py.
Output: training/historical_transactions.csv
"""

import csv
import random
from datetime import date, timedelta

random.seed(42)  # reproducible fake data

ZONES = ["Zone A", "Zone B"]

# Base wholesale/mandi price in Rs/kg, anchored to Sept 2026 mandi reports.
# This is the price level a farmer selling through a hub would realistically
# see today — not the marked-up retail price a consumer pays in a shop.
BASE_PRICE = {
    "Tomato":      20,   # Tamil Nadu/UP/Chhattisgarh mandi avg, Sep 2026: Rs16-26/kg
    "Onion":       45,   # State mandi avg Sep 2026: Rs34-55/kg; CRISIL flagged Sep lean-season spike
    "Potato":      25,   # State mandi avg Sep 2026: Rs20-31/kg
    "Garlic":      160,  # State mandi avg Sep 2026: Rs148-189/kg
    "Ginger":      90,   # State mandi avg Sep 2026: Rs80-98/kg
    "Capsicum":    40,   # Bell pepper, state mandi avg Sep 2026: Rs34-44/kg
    "Cauliflower": 30,   # State mandi avg Sep 2026: Rs26-37/kg
    "Chilli":      55,   # Green chilli, state mandi avg Sep 2026: Rs46-63/kg
    "Grapes":      110,  # Off-season (Indian table grapes peak Jan-Apr) -- Sep mandi avg ~100-130/kg
    "Apple":       150,  # Himachal/Kashmir harvest month (Aug-Oct) -- Shimla variety mandi avg ~140-180/kg
    "Banana":      45,   # Grown year-round, stable -- state mandi avg Sep 2026: Rs44-49/kg
    "Strawberry":  180,  # Deep off-season (Indian season is Nov-Mar, e.g. Mahabaleshwar) -- priced as scarce
}

# Each crop's realistic Indian harvest/lean-season calendar. Rather than a
# generic sine wave, this reflects actual cropping patterns:
#   "lean_months"    -> months where supply is short and price runs HIGH
#   "harvest_months"  -> months where fresh stock floods in and price runs LOW
# Anything not listed is treated as a normal, moderately stable month.
SEASON_PROFILE = {
    "Tomato":      {"lean_months": [6, 7, 8, 9], "harvest_months": [11, 12, 1, 2]},
    "Onion":       {"lean_months": [8, 9], "harvest_months": [11, 12, 1]},
    "Potato":      {"lean_months": [6, 7, 8, 9], "harvest_months": [1, 2, 3]},
    "Garlic":      {"lean_months": [8, 9, 10], "harvest_months": [2, 3, 4]},
    "Ginger":      {"lean_months": [7, 8, 9], "harvest_months": [10, 11, 12]},
    "Capsicum":    {"lean_months": [6, 7, 8], "harvest_months": [11, 12, 1, 2]},
    "Cauliflower": {"lean_months": [6, 7, 8, 9], "harvest_months": [11, 12, 1]},
    "Chilli":      {"lean_months": [6, 7, 8], "harvest_months": [11, 12, 1]},
    "Grapes":      {"lean_months": [7, 8, 9, 10], "harvest_months": [1, 2, 3, 4]},
    "Apple":       {"lean_months": [4, 5, 6], "harvest_months": [8, 9, 10]},
    "Banana":      {"lean_months": [], "harvest_months": []},  # year-round, stable
    "Strawberry":  {"lean_months": [6, 7, 8, 9, 10], "harvest_months": [12, 1, 2, 3]},
}

START_DATE = date(2025, 10, 1)   # a year of history leading up to Sep 2026
NUM_DAYS = 365


def seasonal_multiplier(crop, month):
    profile = SEASON_PROFILE[crop]
    if month in profile["lean_months"]:
        return random.uniform(1.15, 1.35)   # lean season: price runs high
    if month in profile["harvest_months"]:
        return random.uniform(0.75, 0.9)    # harvest glut: price runs low
    return random.uniform(0.95, 1.05)       # normal month: mild noise only


def main():
    rows = []
    for i in range(NUM_DAYS):
        current_date = START_DATE + timedelta(days=i)
        month = current_date.month

        for crop, base in BASE_PRICE.items():
            mult = seasonal_multiplier(crop, month)
            for zone in ZONES:
                zone_noise = random.uniform(0.96, 1.04)  # small zone-to-zone variation
                price = round(base * mult * zone_noise, 2)
                quantity_sold = round(random.uniform(20, 100), 1)

                rows.append(
                    {
                        "date": current_date.isoformat(),
                        "crop": crop,
                        "zone": zone,
                        "price": price,
                        "quantity_sold_kg": quantity_sold,
                    }
                )

    out_path = "training/historical_transactions.csv"
    with open(out_path, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["date", "crop", "zone", "price", "quantity_sold_kg"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"Wrote {len(rows)} fake transactions for {len(BASE_PRICE)} crops to {out_path}")


if __name__ == "__main__":
    main()
