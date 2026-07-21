import streamlit as st
import pandas as pd
import numpy as np
import pickle
import plotly.express as px
import plotly.graph_objects as go
import matplotlib.pyplot as plt

st.set_page_config(page_title="Crop Recommendation System", layout="wide")

st.title("🌾 Crop Recommendation System")

@st.cache_resource
def load_model():
    with open("models/Crop_Recommendation_RF.pkl", "rb") as f:
        model = pickle.load(f)
    return model

@st.cache_data
def load_data():
    df = pd.read_csv("Crop_recommendation (1).csv")
    return df

model = load_model()
df = load_data()


st.sidebar.header("Enter Soil & Weather Details")
N = st.sidebar.slider("Nitrogen (N)", 0, 200, 50)
P = st.sidebar.slider("Phosphorus (P)", 0, 200, 50)
K = st.sidebar.slider("Potassium (K)", 0, 200, 50)
temperature = st.sidebar.slider("Temperature (°C)", 0.0, 50.0, 25.0)
humidity = st.sidebar.slider("Humidity (%)", 0.0, 100.0, 60.0)
ph = st.sidebar.slider("pH Value", 0.0, 14.0, 6.5)
rainfall = st.sidebar.slider("Rainfall (mm)", 0.0, 300.0, 100.0)

if st.sidebar.button("Predict Crop"):
    input_data = pd.DataFrame({
        'N': [N],
        'P': [P],
        'K': [K],
        'temperature': [temperature],
        'humidity': [humidity],
        'ph': [ph],
        'rainfall': [rainfall]
    })
    prediction = model.predict(input_data)[0]
    st.success(f"🌱 Recommended Crop: **{prediction}**")

st.divider()

col1, col2 = st.columns(2)

with col1:
    st.subheader("📊 Dataset Overview")
    st.dataframe(df.head(10))

    st.markdown(f"**Total Rows:** {df.shape[0]}  |  **Columns:** {df.shape[1]}")
    st.write("**Crop Distribution:**")
    crop_count = df['label'].value_counts().reset_index()
    crop_count.columns = ['Crop', 'Count']
    fig1 = px.bar(crop_count, x='Crop', y='Count', title="Crop Frequency", color='Crop')
    fig1.update_layout(xaxis={'categoryorder':'total descending'})
    st.plotly_chart(fig1, use_container_width=True)

with col2:
    st.subheader("🌿 Feature Distribution")
    feature = st.selectbox("Select Feature to Visualize", df.columns[:-1])
    fig2 = px.histogram(df, x=feature, nbins=30, title=f"{feature} Distribution")
    st.plotly_chart(fig2, use_container_width=True)

st.divider()


st.subheader("📈 Feature Importance")
try:
    importances = model.named_steps['classifier'].feature_importances_
except:
    importances = model.feature_importances_

feature_names = list(df.columns[:-1])
importance_df = pd.DataFrame({"Feature": feature_names, "Importance": importances})
importance_df = importance_df.sort_values(by="Importance", ascending=False)

fig3 = px.bar(importance_df, x="Feature", y="Importance", title="Feature Importance", color="Feature")
st.plotly_chart(fig3, use_container_width=True)


