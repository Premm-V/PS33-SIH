# Idea a farmer picks a crop and zone, this service predicts
# a fair price range. What's in this version:

1. **12 crops** — tomato, onion, potato, garlic, ginger, grapes,
   capsicum, cauliflower, strawberry, apple, banana, chilli.
2. **Real starting prices, not made-up ones.** Every `BASE_PRICE` value in
   `generate_synthetic_data.py` is anchored to actual Indian mandi/wholesale
   price reports checked in September 2026 (state mandi boards via
   commodityonline.com and market.todaypricerates.com, plus CRISIL/RBI
   commentary on onion-tomato-potato seasonality). If a judge asks "why is
   tomato ~₹20/kg and apple ~₹150/kg," the honest answer is *"that's what
   mandis were actually reporting this September"* — not a guess.
3. **Real Indian seasonal logic, not a generic sine wave.** Each crop has its
   own `lean_months` (supply is short, price runs high) and `harvest_months`
   (fresh stock floods in, price runs low), based on actual Indian cropping
   calendars — e.g. onion has a well-documented September lean patch before
   the Kharif harvest lands in November; apple's harvest month is Aug-Oct in
   Himachal/Kashmir, so September prices are actually moderate, not spiked.

---

## The 12 crops and their price basis (September 2026)

| Crop | Base price (Rs/kg) | Why |
|---|---|---|
| Tomato | 20 | State mandi avg, Sep 2026 (Rs16-26 range across TN/UP/Chhattisgarh) |
| Onion | 45 | State mandi avg; CRISIL flagged a September lean-season price rise |
| Potato | 25 | State mandi avg, Sep 2026 (Rs20-31 range) |
| Garlic | 160 | State mandi avg, Sep 2026 (Rs148-189 range) |
| Ginger | 90 | State mandi avg, Sep 2026 (Rs80-98 range) |
| Capsicum | 40 | Bell pepper, state mandi avg, Sep 2026 |
| Cauliflower | 30 | State mandi avg, Sep 2026 |
| Chilli | 55 | Green chilli, state mandi avg, Sep 2026 |
| Grapes | 110 | Off-season (Indian table grapes peak Jan-Apr) |
| Apple | 150 | Himachal/Kashmir harvest month (Aug-Oct) |
| Banana | 45 | Grown year-round in India — the most stable of the 12 |
| Strawberry | 180 | Deep off-season (Indian season is Nov-Mar) — priced as scarce |

These are **wholesale/mandi-level** prices — the price level a farmer selling
through a hub would realistically see, not the marked-up retail price a
shopper pays. That distinction matters for your pitch: it's the gap between
this number and the retail number that is the whole "cut out the middleman"
story.

---

## How to run this

```bash
pip install -r requirements.txt

python training/generate_synthetic_data.py   # ~8,760 fake transactions across 12 crops, 1 year
python training/train_pricing_model.py        # trains and saves the model
uvicorn main:app --reload --port 8001          # starts the live API
```

Open `http://localhost:8001/docs` to test predictions directly in the browser.

## Example predictions (tested, September dates)

```
Tomato       Zone A: Rs 22.86 - 27.94 /kg
Onion        Zone A: Rs 47.98 - 58.64 /kg    <- elevated, matches Sep lean season
Garlic       Zone A: Rs 177.53 - 216.99 /kg  <- elevated, pre-harvest lean
Apple        Zone B: Rs 102.67 - 125.49 /kg  <- moderate, it's harvest month
Strawberry   Zone A: Rs 205.17 - 250.76 /kg  <- high, deep off-season
Banana       Zone B: Rs 41.15 - 50.29 /kg    <- stable, year-round crop
```

Notice the direction of each number matches what's actually happening in the
market right now — that's the point of grounding the base prices and season
calendars in real data instead of picking round numbers.

---

## What the backend sends and receives (unchanged contract)

**Backend sends:**
```json
{ "crop": "Apple", "zone": "Zone B", "quantity_kg": 50, "date": "2026-09-15" }
```

**ML service replies:**
```json
{ "suggested_min": 102.67, "suggested_max": 125.49 }
```

Works for any of the 12 crops — the backend doesn't need to change anything,
since `crop` was always a plain string in the contract, not a fixed list.

---

## If you add a 13th crop later

1. Add a `BASE_PRICE` entry with a real, sourced mandi number.
2. Add a `SEASON_PROFILE` entry with realistic lean/harvest months for that crop.
3. Re-run `generate_synthetic_data.py` and `train_pricing_model.py`.

That's the entire process — nothing else in `main.py` needs to change.

---

## If something breaks

- **"Model file not found"** — you skipped a training step, or you're running
  `main.py` from the wrong folder. Always run commands from inside `ml-service/`.
- **A price looks wrong for a crop** — check that crop's `BASE_PRICE` and
  `SEASON_PROFILE` entries against a quick mandi price search; the model can
  only be as sensible as what it was trained on.
- **Backend can't reach the service** — make sure `uvicorn` is still running
  in a terminal window during the demo.
