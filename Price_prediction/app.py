import streamlit as st
import pandas as pd
import joblib
import numpy as np


models = {
    "GradientBoosting": joblib.load("GradientBoosting_best_model.pkl"),
    "RandomForest": joblib.load("RandomForest_best_model.pkl"),
    "XGBoost": joblib.load("XGBoost_best_model.pkl")
}

st.title("Odisha Crop Price Prediction 💹")


model_name = st.sidebar.selectbox("Select Model", list(models.keys()))
model = models[model_name]

st.header("Input Crop Data")


district = st.text_input("District", "Cuttack")
crop = st.text_input("Crop", "Rice")
avg_yield = st.number_input("Avg Yield", value=2.5)
min_price = st.number_input("Min Price", value=20.0)
max_price = st.number_input("Max Price", value=40.0)
year = st.text_input("Year (YYYY)", "2025")


year_num = int(str(year)[:4])


input_df = pd.DataFrame({
    "District": [district],
    "Crop": [crop],
    "Avg Yield": [avg_yield],
    "min_price": [min_price],
    "max_price": [max_price],
    "Year_num": [year_num]
})

# --------------------------
# Prediction
# --------------------------
if st.button("Predict Price"):
    prediction = model.predict(input_df)[0]
    st.success(f"Predicted Modal Price: ₹ {prediction:.2f}")