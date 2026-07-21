import streamlit as st
import pandas as pd
import joblib

# Load trained model artifacts
model = joblib.load("models/crop_yield_model.pkl")
scaler = joblib.load("models/yield_scaler.pkl")
le_crop = joblib.load("models/crop_label_encoder.pkl")
le_season = joblib.load("models/season_label_encoder.pkl")
le_state = joblib.load("models/state_label_encoder.pkl")

# Translation dictionary with full translations
translations = {
    "en": {
        "title": "🌾 AGRIMEN – Smart Crop Yield Prediction",
        "welcome": "Welcome! Predict crop yield based on soil & climate data.",
        "manual_input": "📝 Manual Input Prediction",
        "predict_btn": "🌱 Predict Yield",
        "bulk_prediction": "📂 Bulk Prediction (CSV/Excel Upload)",
        "required_cols": "👉 Required Columns: Crop, Crop_Year, Season, State, Area, Production, Annual_Rainfall, Fertilizer, Pesticide",
        "results": "📊 Predicted Yield",
        "unit": "tons per hectare",
        "download": "📥 Download Results as CSV"
    },
    "hi": {
        "title": "🌾 AGRIMEN – स्मार्ट फसल उत्पादन भविष्यवाणी",
        "welcome": "स्वागत है! मिट्टी और जलवायु डेटा के आधार पर फसल उत्पादन का अनुमान लगाएँ।",
        "manual_input": "📝 मैनुअल इनपुट पूर्वानुमान",
        "predict_btn": "🌱 उत्पादन अनुमानित करें",
        "bulk_prediction": "📂 बल्क पूर्वानुमान (CSV/Excel अपलोड)",
        "required_cols": "👉 आवश्यक कॉलम: Crop, Crop_Year, Season, State, Area, Production, Annual_Rainfall, Fertilizer, Pesticide",
        "results": "📊 अनुमानित उत्पादन",
        "unit": "टन प्रति हेक्टेयर",
        "download": "📥 परिणाम CSV के रूप में डाउनलोड करें"
    },
    "or": {
        "title": "🌾 AGRIMEN – ସ୍ମାର୍ଟ କ୍ରପ୍ ୟିଲ୍ଡ ପ୍ରିଡିକ୍ସନ୍",
        "welcome": "ମଟି ଓ ଆବହା ତଥ୍ୟ ଉପରେ ଆଧାର କରି କ୍ରପ୍ ୟିଲ୍ଡ ପ୍ରିଡିକ୍ସନ୍ କରନ୍ତୁ।",
        "manual_input": "📝 ମାନୁଆଲ ଇନପୁଟ ପ୍ରିଡିକ୍ସନ୍",
        "predict_btn": "🌱 ପ୍ରିଡିକ୍ସନ୍ କରନ୍ତୁ",
        "bulk_prediction": "📂 ବଲ୍କ ପ୍ରିଡିକ୍ସନ୍ (CSV/Excel ଅପଲୋଡ୍)",
        "required_cols": "👉 ଆବଶ୍ୟକ କଲମ୍ସ: Crop, Crop_Year, Season, State, Area, Production, Annual_Rainfall, Fertilizer, Pesticide",
        "results": "📊 ପ୍ରିଡିକ୍ଟ କୃତ ୟିଲ୍ଡ",
        "unit": "ଟନ୍ ପ୍ରତି ହେକ୍ଟେର୍",
        "download": "📥 ପରିଣାମ ଡାଉନଲୋଡ୍ କରନ୍ତୁ"
    },
    "te": {
        "title": "🌾 AGRIMEN – స్మార్ట్ పంట దిగుబడి అంచనా",
        "welcome": "స్వాగతం! మట్టితత్వం మరియు వాతావరణం ఆధారంగా పంట దిగుబడి అంచనా.",
        "manual_input": "📝 మాన్యువల్ ఇన్‌పుట్ అంచనా",
        "predict_btn": "🌱 దిగుబడి అంచనా వేయండి",
        "bulk_prediction": "📂 బల్క్ అంచనా (CSV/Excel అప్లోడ్)",
        "required_cols": "👉 అవసరమైన కాలమ్స్: Crop, Crop_Year, Season, State, Area, Production, Annual_Rainfall, Fertilizer, Pesticide",
        "results": "📊 అంచనా వేశారు దిగుబడి",
        "unit": "టన్నులు ప్రతి హెక్టేరు",
        "download": "📥 ఫలితాలను CSV గా డౌన్లోడ్ చేయండి"
    },
    "ta": {
        "title": "🌾 AGRIMEN – ஸ்மார்ட் பயிர் விளைவு கணிப்பு",
        "welcome": "வரவேற்பு! நிலம் மற்றும் காலநிலை தரவின் அடிப்படையில் பயிர் விளைவை கணிக்கவும்.",
        "manual_input": "📝 கைமுறை உள்ளீட்டு கணிப்பு",
        "predict_btn": "🌱 விளைவு கணிக்கவும்",
        "bulk_prediction": "📂 தொகுப்பு கணிப்பு (CSV/Excel பதிவேற்றம்)",
        "required_cols": "👉 தேவைப்படும் பத்திகள்: Crop, Crop_Year, Season, State, Area, Production, Annual_Rainfall, Fertilizer, Pesticide",
        "results": "📊 கணிக்கப்பட்ட விளைவு",
        "unit": "டன் ஒன்றுக்கு ஹெக்டேர்",
        "download": "📥 முடிவுகளை CSV ஆக பதிவிறக்கவும்"
    },
    "ml": {
        "title": "🌾 AGRIMEN – സ്മാർട്ട് വിളവ് പ്രവചനം",
        "welcome": "സ്വാഗതം! മണ്ണ് & കാലാവസ്ഥാ ഡാറ്റ അടിസ്ഥാനമാക്കി വിളവ് പ്രവചിക്കുക.",
        "manual_input": "📝 മാനുവൽ ഇൻപുട്ട് പ്രവചന ഫീൽഡ്",
        "predict_btn": "🌱 വിളവ് പ്രവചിക്കുക",
        "bulk_prediction": "📂 ബൾക്ക് പ്രവചനം (CSV/Excel അപ്‌ലോഡ്)",
        "required_cols": "👉 ആവശ്യമായ കോളങ്ങൾ: Crop, Crop_Year, Season, State, Area, Production, Annual_Rainfall, Fertilizer, Pesticide",
        "results": "📊 പ്രവചിച്ച വിളവ്",
        "unit": "ടൺസ് പ്രതി ഹെക്ടർ",
        "download": "📥 ഫലങ്ങൾ CSV ആയി ഡൗൺലോഡ് ചെയ്യുക"
    },
    "bn": {
        "title": "🌾 AGRIMEN – স্মার্ট ফসল উৎপাদন পূর্বাভাস",
        "welcome": "স্বাগতম! মাটি এবং জলবায়ু তথ্যের ভিত্তিতে ফসলের উৎপাদন পূর্বাভাস দিন।",
        "manual_input": "📝 ম্যানুয়াল ইনপুট পূর্বাভাস",
        "predict_btn": "🌱 উৎপাদন পূর্বাভাস দিন",
        "bulk_prediction": "📂 ব্যাচ পূর্বাভাস (CSV/Excel আপলোড)",
        "required_cols": "👉 প্রয়োজনীয় কলাম: Crop, Crop_Year, Season, State, Area, Production, Annual_Rainfall, Fertilizer, Pesticide",
        "results": "📊 পূর্বাভাসিত উৎপাদন",
        "unit": "টন প্রতি হেক্টর",
        "download": "📥 ফলাফল CSV হিসাবে ডাউনলোড করুন"
    }
}

# Page config
st.set_page_config(page_title="Crop Yield Prediction", page_icon="🌾", layout="wide")

# Language selection
lang_options = {
    "en": "English",
    "hi": "Hindi",
    "or": "Odia",
    "te": "Telugu",
    "ta": "Tamil",
    "ml": "Malayalam",
    "bn": "Bengali"
}

lang = st.sidebar.selectbox("🌐 Select Language", options=list(lang_options.keys()), format_func=lambda x: lang_options[x])

# Ensure language change triggers rerun
if 'current_lang' not in st.session_state or st.session_state.current_lang != lang:
    st.session_state.current_lang = lang
    st.experimental_rerun()

T = translations[lang]

# Display UI
st.title(T["title"])
st.write(T["welcome"])

st.subheader(T["manual_input"])

col1, col2, col3 = st.columns(3)
with col1:
    crop = st.selectbox(T["manual_input"], options=le_crop.classes_)
    crop_year = st.number_input("Crop Year", 1997, 2025, 2020)
    season = st.selectbox("Season", options=le_season.classes_)
with col2:
    state = st.selectbox("State", options=le_state.classes_)
    area = st.number_input("Area (in hectares)", min_value=0.1, max_value=1e7, value=1000.0, step=0.1)
    production = st.number_input("Production (in kg)", min_value=0.0, max_value=1e10, value=5000.0, step=1.0)
with col3:
    annual_rainfall = st.number_input("Annual Rainfall (mm)", min_value=0.0, max_value=10000.0, value=1200.0, step=0.1)
    fertilizer = st.number_input("Fertilizer Used (kg)", min_value=0.0, max_value=1e8, value=50000.0, step=1.0)
    pesticide = st.number_input("Pesticide Used (kg)", min_value=0.0, max_value=1e7, value=1000.0, step=1.0)

if st.button(T["predict_btn"]):
    crop_enc = le_crop.transform([crop])[0]
    season_enc = le_season.transform([season])[0]
    state_enc = le_state.transform([state])[0]

    data = [[crop_enc, crop_year, season_enc, state_enc, area, production, annual_rainfall, fertilizer, pesticide]]
    data_scaled = scaler.transform(data)
    yield_pred = model.predict(data_scaled)[0]

    st.success(f"✅ {T['results']}: {yield_pred:.2f} {T['unit']}")

st.subheader(T["bulk_prediction"])
st.write(T["required_cols"])

file = st.file_uploader("Upload CSV or Excel file", type=["csv", "xlsx"])

if file:
    if file.name.endswith('.csv'):
        df = pd.read_csv(file)
    else:
        df = pd.read_excel(file)

    required_cols = ['Crop', 'Crop_Year', 'Season', 'State', 'Area', 'Production', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']
    if not all(col in df.columns for col in required_cols):
        st.error("❌ Missing required columns in the uploaded file.")
    else:
        df['Crop'] = le_crop.transform(df['Crop'])
        df['Season'] = le_season.transform(df['Season'])
        df['State'] = le_state.transform(df['State'])

        input_data = scaler.transform(df[required_cols])
        predictions = model.predict(input_data)

        df['Predicted_Yield'] = [f"{pred:.2f} {T['unit']}" for pred in predictions]

        st.write(T["results"])
        st.dataframe(df)

        csv = df.to_csv(index=False).encode('utf-8')
        st.download_button(label=T["download"], data=csv, file_name='predicted_yields.csv', mime='text/csv')
