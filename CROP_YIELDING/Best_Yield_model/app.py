import streamlit as st
import pandas as pd
import pickle
import numpy as np
import plotly.express as px

st.set_page_config(layout="wide", page_title="Crop Yield Prediction")

st.title("Crop Yield Prediction using Optimized Random Forest Model")
st.markdown("""
Predict crop yield based on environmental and agricultural parameters.
Visual insights are shown using rainfall, humidity, and season data.
""")

@st.cache_resource
def load_model_and_data():
    try:
        with open('models/Random_Forest_Best.pkl', 'rb') as f_model:
            model = pickle.load(f_model)
        df = pd.read_csv('Odisha_Crop_Yield_Dataset_Enhanced.csv')
    except FileNotFoundError:
        return None, None
    return model, df

model, dataset = load_model_and_data()

st.sidebar.header("Input Agricultural Parameters")

districts = dataset['District'].unique().tolist() if dataset is not None else []
crops = dataset['Crop'].unique().tolist() if dataset is not None else []
seasons = ['Kharif', 'Rabi', 'Summer']
soil_types = ['Alluvial', 'Red', 'Laterite', 'Black', 'Saline'] 
crop_varieties = ['High-Yield', 'Traditional']
irrigation_types = ['Canal', 'Well', 'Rain-fed', 'Other']

district = st.sidebar.selectbox("Select District", districts)
crop = st.sidebar.selectbox("Select Crop", crops)
season = st.sidebar.selectbox("Select Season", seasons)
seed_variety = st.sidebar.selectbox("Seed Variety", crop_varieties)

min_temp = st.sidebar.slider("Min Temperature (°C)", 5, 30, 20)
max_temp = st.sidebar.slider("Max Temperature (°C)", 25, 50, 35)
sunshine_hours = st.sidebar.slider("Sunshine Hours (per day)", 4.0, 10.0, 7.5)
humidity = st.sidebar.slider("Humidity (%)", 20, 100, 70)

irrigation_type = st.sidebar.selectbox("Irrigation Type", irrigation_types)
soil_type = st.sidebar.selectbox("Soil Type", soil_types)
soil_ph = st.sidebar.slider("Soil pH", 4.0, 9.0, 6.5)
nitrogen = st.sidebar.number_input("Nitrogen Applied (Kg/Ha)", 0.0, 200.0, 80.0)
phosphorus = st.sidebar.number_input("Phosphorus Applied (Kg/Ha)", 0.0, 200.0, 40.0)
potassium = st.sidebar.number_input("Potassium Applied (Kg/Ha)", 0.0, 200.0, 40.0)

st.sidebar.markdown("---")
st.sidebar.subheader("Monthly Rainfall (mm)")
months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
rainfall = {}
for m in months:
    rainfall[m] = st.sidebar.number_input(m, 0.0, 500.0, 50.0)

st.sidebar.markdown("---")

if model is None or dataset is None:
    st.error("Model or dataset not found. Please run the training script first.")
else:
    if st.sidebar.button("Predict Crop Yield"):
        input_data = pd.DataFrame({
            'District':[district], 'Crop':[crop], 'Season':[season],
            'Min_Temperature_C':[min_temp], 'Max_Temperature_C':[max_temp],
            'Sunshine_Hours':[sunshine_hours], 'Humidity':[humidity],
            'Irrigation_Type':[irrigation_type], 'Soil Type':[soil_type],
            'Seed_Variety':[seed_variety],
            'Soil pH':[soil_ph],
            'Nitrogen_kg_per_ha':[nitrogen], 'Phosphorus_kg_per_ha':[phosphorus],
            'Potassium_kg_per_ha':[potassium],
            **{f'Rainfall_{m}_mm':[v] for m,v in rainfall.items()},
            'Year':[2025]  # dummy column for model compatibility
        })

        input_data['Temp_Range'] = input_data['Max_Temperature_C'] - input_data['Min_Temperature_C']

        # Ensure categorical columns are strings
        cat_cols = ['District','Crop','Season','Irrigation_Type','Soil Type','Seed_Variety','Year']
        for c in cat_cols:
            input_data[c] = input_data[c].astype(str)

        prediction_transformed = model.predict(input_data)[0]
        prediction_original = np.expm1(prediction_transformed)

        st.header("Predicted Crop Yield")
        st.metric(label="Predicted Yield (Q/Ha)", value=f"{prediction_original:.2f}")

        # Visualizations (not year-based)
        st.subheader("Yield Visual Insights")

        # Scatter: Total Rainfall vs Avg Yield
        dataset['Total_Rainfall'] = dataset[[f'Rainfall_{m}_mm' for m in months]].sum(axis=1)
        fig_rain = px.scatter(
            dataset, x='Total_Rainfall', y='Avg Yield', color='Season',
            labels={'Total_Rainfall':'Total Rainfall (mm)', 'Avg Yield':'Avg Yield (Q/Ha)'},
            title="Yield vs Total Rainfall"
        )
        st.plotly_chart(fig_rain, use_container_width=True)
        st.markdown("Scatter plot showing how total rainfall influences yield across different seasons.")

        # Scatter: Humidity vs Avg Yield
        fig_hum = px.scatter(
            dataset, x='Humidity', y='Avg Yield', color='Season',
            labels={'Humidity':'Humidity (%)', 'Avg Yield':'Avg Yield (Q/Ha)'},
            title="Yield vs Humidity"
        )
        st.plotly_chart(fig_hum, use_container_width=True)
        st.markdown("Scatter plot showing how humidity affects crop yield across different seasons.")

    else:
        st.info("Fill in the parameters and click 'Predict Crop Yield' to see the predicted yield and visual insights.")
        