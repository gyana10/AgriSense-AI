import streamlit as st
import pandas as pd
import joblib


crop_model = joblib.load("models/crop_prediction_model.pkl")
fertility_model = joblib.load("models/fertility_prediction_model.pkl")
scaler = joblib.load("models/crop_scaler.pkl")
label_encoder = joblib.load("models/crop_label_encoder.pkl")


df = pd.read_csv("full_merged_crop_data.csv")
districts = df["District"].unique().tolist()
cities = df["City_Town"].unique().tolist()
places = df["Place_Locality"].unique().tolist()


crop_info = {
  
    "rice": {
        "sowing": "June-July",
        "harvest": "Oct-Nov",
        "duration": "120-150 days",
        "watering": "High (often grown in flooded paddies)",
        "seasonal_water_need_mm": "900-2500"
    },
    "wheat": {
        "sowing": "Nov-Dec",
        "harvest": "Mar-Apr",
        "duration": "140-160 days",
        "watering": "Moderate (irrigation at critical growth stages)",
        "seasonal_water_need_mm": "450-650"
    },
    "maize": {
        "sowing": "June-July",
        "harvest": "Sep-Oct",
        "duration": "90-120 days",
        "watering": "Moderate to High (critical during tasseling and grain fill)",
        "seasonal_water_need_mm": "500-800"
    },
    "barley": {
        "sowing": "Nov-Dec",
        "harvest": "Mar-Apr",
        "duration": "120-140 days",
        "watering": "Moderate (drought-tolerant but needs irrigation for good yield)",
        "seasonal_water_need_mm": "400-600"
    },
    "sorghum": {
        "sowing": "Jun-Jul",
        "harvest": "Sep-Oct",
        "duration": "100-120 days",
        "watering": "Low (highly drought-tolerant)",
        "seasonal_water_need_mm": "450-650"
    },
    "millet": {
        "sowing": "Jun-Jul",
        "harvest": "Sep-Oct",
        "duration": "90-110 days",
        "watering": "Low (very drought-tolerant, suitable for arid regions)",
        "seasonal_water_need_mm": "350-550"
    },
    "soybean": {
        "sowing": "Jun-Jul",
        "harvest": "Sep-Oct",
        "duration": "90-120 days",
        "watering": "Moderate (needs consistent moisture, especially during flowering and pod fill)",
        "seasonal_water_need_mm": "450-700"
    },
    "groundnut": {
        "sowing": "Jun-Jul",
        "harvest": "Sep-Oct",
        "duration": "100-120 days",
        "watering": "Moderate (consistent watering needed, especially during pegging)",
        "seasonal_water_need_mm": "500-700"
    },
    "mustard": {
        "sowing": "Oct-Nov",
        "harvest": "Feb-Mar",
        "duration": "120-130 days",
        "watering": "Low to Moderate (requires limited irrigation)",
        "seasonal_water_need_mm": "300-400"
    },
    "cotton": {
        "sowing": "Apr-May",
        "harvest": "Oct-Nov",
        "duration": "150-180 days",
        "watering": "Moderate (needs regular water, but sensitive to waterlogging)",
        "seasonal_water_need_mm": "700-1300"
    },
    "sugarcane": {
        "sowing": "Feb-Mar",
        "harvest": "Nov-Dec",
        "duration": "270-365 days",
        "watering": "High (requires frequent and heavy irrigation)",
        "seasonal_water_need_mm": "1500-2500"
    },
    "tobacco": {
        "sowing": "Feb-Mar",
        "harvest": "Aug-Sep",
        "duration": "150-180 days",
        "watering": "Moderate (requires consistent moisture, avoid waterlogging)",
        "seasonal_water_need_mm": "400-600"
    },
    "tea": {
        "sowing": "Jun-Jul",
        "harvest": "Dec-Feb",
        "duration": "180-210 days",
        "watering": "High (requires high rainfall and humidity)",
        "seasonal_water_need_mm": "1200-1500"
    },
    "coffee": {
        "sowing": "Jun-Jul",
        "harvest": "Dec-Feb",
        "duration": "180-210 days",
        "watering": "High (prefers specific rainfall patterns and well-drained soil)",
        "seasonal_water_need_mm": "1000-1500"
    },
    "banana": {
        "sowing": "Year-round",
        "harvest": "9-12 months",
        "duration": "270-365 days",
        "watering": "High (requires frequent and deep watering)",
        "seasonal_water_need_mm": "1200-2200"
    },
    "mango": {
        "sowing": "Jul-Aug",
        "harvest": "Apr-Jun",
        "duration": "300+ days",
        "watering": "Moderate (young trees need regular watering; mature trees are drought-tolerant)",
        "seasonal_water_need_mm": "800-1200"
    },
    "orange": {
        "sowing": "Jun-Jul",
        "harvest": "Dec-Jan",
        "duration": "180-210 days",
        "watering": "Moderate to High (requires regular deep watering, especially during fruit set)",
        "seasonal_water_need_mm": "900-1200"
    },
    "apple": {
        "sowing": "Jan-Feb",
        "harvest": "Sep-Oct",
        "duration": "150-180 days",
        "watering": "Moderate (requires consistent moisture, especially during fruit development)",
        "seasonal_water_need_mm": "600-800"
    },
    "grapes": {
        "sowing": "Dec-Jan",
        "harvest": "Apr-May",
        "duration": "120-150 days",
        "watering": "Moderate (deep watering is crucial, but can tolerate some stress)",
        "seasonal_water_need_mm": "500-1200"
    },
    "coconut": {
        "sowing": "Year-round",
        "harvest": "6-10 years",
        "duration": "2190-3650 days",
        "watering": "High (prefers high rainfall and well-drained soil)",
        "seasonal_water_need_mm": "1500-2200"
    },
    "potato": {
        "sowing": "Oct-Nov",
        "harvest": "Jan-Feb",
        "duration": "90-120 days",
        "watering": "Moderate to High (requires frequent and consistent watering due to shallow roots)",
        "seasonal_water_need_mm": "500-700"
    },
    "tomato": {
        "sowing": "Sep-Oct",
        "harvest": "Dec-Jan",
        "duration": "90-100 days",
        "watering": "Moderate (consistent watering is key to prevent fruit cracking)",
        "seasonal_water_need_mm": "400-600"
    }

}

crop_translations = {
     "rice": {"en": "Rice", "hi": "चावल", "or": "ଚାଉଳ", "te": "బియ్యం", "ta": "அரிசி", "ml": "അരിപ്പ്", "bn": "চাল"},
    "wheat": {"en": "Wheat", "hi": "गेहूँ", "or": "ଗହମ", "te": "గోధుమ", "ta": "கோதுமை", "ml": "ഗേहुँ", "bn": "গম"},
    "maize": {"en": "Maize", "hi": "मक्का", "or": "ମକା", "te": "మక్కా", "ta": "மக்காச்சோளம்", "ml": "ഭൂട്ടാൻ", "bn": "মকাই"},
    "barley": {"en": "Barley", "hi": "जौ", "or": "ଜୌ", "te": "జొన్న", "ta": "பார்லி", "ml": "ബാർലി", "bn": "যব"},
    "sorghum": {"en": "Sorghum", "hi": "ज्वार", "or": "ଜ୍ୱାର", "te": "జొన్న", "ta": "சோர்கம்", "ml": "സോർഗം", "bn": "জোয়ার"},
    "millet": {"en": "Millet", "hi": "बाजरा", "or": "ବାଜରା", "te": "సజ్జా", "ta": "சாமை", "ml": "സജ്ജ", "bn": "বজরা"},
    "soybean": {"en": "Soybean", "hi": "सोयाबीन", "or": "ସୋୟାବିନ", "te": "సోయాబీన్", "ta": "சாய்பீன்", "ml": "സോയാബീൻ", "bn": "সয়াবিন"},
    "groundnut": {"en": "Groundnut", "hi": "मूँगफली", "or": "ବେର ଚଣା", "te": "వేరుశనగ", "ta": "வேர்க்கடலை", "ml": "അറുക്ക്", "bn": "শুঁটকোলা"},
    "mustard": {"en": "Mustard", "hi": "सरसों", "or": "ସରିସ", "te": "ఆవాలు", "ta": "கடலைப்பூசணி", "ml": "മസ്താർഡ്", "bn": "সরিষা"},
    "cotton": {"en": "Cotton", "hi": "कपास", "or": "କପାସ", "te": "పత్తి", "ta": "பருத்தி", "ml": "പട്ടു", "bn": "কাপাস"},
    "sugarcane": {"en": "Sugarcane", "hi": "गन्ना", "or": "ଇଁଡ଼ିଆ ଗନ୍ନା", "te": "చెరకు", "ta": "கரும்பு", "ml": "ശർക്കരക്കടി", "bn": "আখ"},
    "tobacco": {"en": "Tobacco", "hi": "तमाकू", "or": "ତମାକୁ", "te": "తమాకు", "ta": "புகையிலை", "ml": "തൂവാലി", "bn": "তামাক"},
    "tea": {"en": "Tea", "hi": "चाय", "or": "ଚା", "te": "టీ", "ta": "டீ", "ml": "ചായ", "bn": "চা"},
    "coffee": {"en": "Coffee", "hi": "कॉफी", "or": "କଫି", "te": "కాఫీ", "ta": "காஃபி", "ml": "കോഫി", "bn": "কফি"},
    "banana": {"en": "Banana", "hi": "केला", "or": "କଦଳୀ", "te": "అరటి", "ta": "வாழை", "ml": "വാഴപ്പഴം", "bn": "কলা"},
    "mango": {"en": "Mango", "hi": "आम", "or": "ଆମ୍ବ", "te": "మామిడి", "ta": "மாம்பழம்", "ml": "മാമ്പഴം", "bn": "আম"},
    "orange": {"en": "Orange", "hi": "संतरा", "or": "କମଳ", "te": "కమలఫలం", "ta": "ஆரஞ்சு", "ml": "ഓറഞ്ച്", "bn": "কমলা"},
    "apple": {"en": "Apple", "hi": "सेब", "or": "ସେବ", "te": "ఆపిల్", "ta": "ஆப்பிள்", "ml": "ആപ്പിൾ", "bn": "আপেল"},
    "grapes": {"en": "Grapes", "hi": "अंगूर", "or": "ଆଙ୍ଗୁର", "te": "ద్రాక్ష", "ta": "திராட்சை", "ml": "ദ്രാക്ഷ", "bn": "আঙুর"},
    "coconut": {"en": "Coconut", "hi": "नारियल", "or": "ନାଡିଆଳ", "te": "కొబ్బరి", "ta": "தேங்காய்", "ml": "തേങ്ങ", "bn": "নারিকেল"},
    "potato": {"en": "Potato", "hi": "आलू", "or": "ଆଳୁ", "te": "ఆలుగడ్డ", "ta": "உருளைக்கிழங்கு", "ml": "ഉരുളകിഴങ്ങ്", "bn": "আলু"},
    "tomato": {"en": "Tomato", "hi": "टमाटर", "or": "ଟମାଟର", "te": "టమోటా", "ta": "தக்காளி", "ml": "തക്കാളി", "bn": "টমেটো"}
    
}

translations = {
    "en": {"title":"🌾 AGRIMEN - Smart Crop Recommendation System", "welcome":"Welcome! Predict crop and fertility based on conditions.", "district":"District", "city":"City/Town", "place":"Place/Locality", "manual_input":"Manual Input", "predict_btn":"Predict", "results":"Predicted Crop & Fertility", "sowing":"Sowing", "harvest":"Harvest", "duration":"Duration"},
    "hi": {"title":"🌾 AGRIMEN - स्मार्ट फसल  प्रणाली", "welcome":"स्वागत है! मिट्टी और जलवायु के आधार पर फसल और उर्वरता पूर्वानुमान करें।", "district":"जिला", "city":"शहर/कस्बा", "place":"स्थान", "manual_input":"मैन्युअल इनपुट", "predict_btn":"पूर्वानुमान लगाएं", "results":"पूर्वानुमानित फसल और उर्वरता", "sowing":"बुवाई", "harvest":"कटाई", "duration":"अवधि"},
    "or": {"title":"🌾 AGRIMEN - ସ୍ମାର୍ଟ ଫସଲ  ପ୍ରଣାଳୀ", "welcome":"ସ୍ୱାଗତ! ମାଟି ଏବଂ ଜଳବାୟୁ ଅବସ୍ଥା ଆଧାରରେ ଫସଲ ଏବଂ ଉର୍ବରତା ପୂର୍ବାନୁମାନ କରନ୍ତୁ।", "district":"ଜିଲ୍ଲା", "city":"ସହର/ଟାଉନ୍", "place":"ସ୍ଥାନ", "manual_input":"ମାନୁଆଲ୍ ଇନପୁଟ୍", "predict_btn":"ପୂର୍ବାନୁମାନ କରନ୍ତୁ", "results":"ପୂର୍ବାନୁମିତ ଫସଲ ଏବଂ ଉର୍ବରତା", "sowing":"ବିଆର", "harvest":"କାଟନି", "duration":"ଅବଧି"},
    "te": {"title":"🌾 AGRIMEN -వ్యవసాయ- స్మార్ట్ పంట సిఫార్సు వ్యవస్థ", "welcome":"స్వాగతం! నేల మరియు వాతావరణం ఆధారంగా పంట మరియు ఫెర్టిలిటీ అంచనా వేయండి.", "district":"జిల్లా", "city":"నగరం/పట్టణం", "place":"స్థలం", "manual_input":"మాన్యువల్ ఇన్‌పుట్", "predict_btn":"అంచనా వేయండి", "results":"అంచనా పంట & ఫెర్టిలిటీ", "sowing":"పిడుగు వేయడం", "harvest":"కొట్టడం", "duration":"వ్యవధి"},
    "ta": {"title":"🌾 AGRIMEN - வேளாண்மை- ஸ்மார்ட் பயிர் பரிந்துரை அமைப்பு", "welcome":"வரவேற்கிறோம்! நிலம் மற்றும் காலநிலை அடிப்படையில் பயிர் மற்றும் உரப்பொருள் கணிக்கவும்.", "district":"மாவட்டம்", "city":"நகரம்/புரம்", "place":"இடம்", "manual_input":"கையேடு உள்ளீடு", "predict_btn":"கணிக்கவும்", "results":"கணிக்கப்பட்ட பயிர் மற்றும் உரப்பொருள்", "sowing":"விதைப்பது", "harvest":"பழுப்பு", "duration":"காலம்"},
    "ml": {"title":"🌾 AGRIMEN - അഗ്രിമെൻ- സ്മാർട്ട് ക്രോപ്പ് ശുപാർശ സംവിധാനം", "welcome":"സ്വാഗതം! മണ്ണും കാലാവസ്ഥയും അടിസ്ഥാനമാക്കി വിളയും ഉർവരതയും പ്രവചിക്കുക.", "district":"ജില്ല", "city":"നഗരം/പട്ടണം", "place":"സ്ഥലം", "manual_input":"മാനുവൽ ഇൻപുട്ട്", "predict_btn":"പ്രവചിക്കുക", "results":"പ്രവചിച്ച വിളയും ഉർവരതയും", "sowing":"തൈവ്", "harvest":"പൊക്കം", "duration":"അവധി"},
    "bn": {"title":"🌾 AGRIMEN - কৃষি- স্মার্ট ফসল সুপারিশ ব্যবস্থা", "district":"জেলা", "city":"শহর/টাউন", "place":"স্থান", "manual_input":"ম্যানুয়াল ইনপুট", "predict_btn":"পূর্বাভাস করুন", "results":"পূর্বাভাসিত ফসল ও উর্বরতা", "sowing":"বপন", "harvest":"কাটা", "duration":"সময়কাল"}
}

st.set_page_config(page_title="AGRIMEN", page_icon="🌾", layout="wide")

lang_options = {"en":"English","hi":"Hindi","or":"Odia","te":"Telugu","ta":"Tamil","ml":"Malayalam","bn":"Bengali"}
lang = st.sidebar.selectbox("🌐 Choose Language", options=list(lang_options.keys()), format_func=lambda x: lang_options[x])
T = translations[lang]

st.title(T["title"])
st.write(T["welcome"])


district = st.selectbox(T["district"], districts, index=st.session_state.get('district_idx', 0))
city = st.selectbox(T["city"], cities, index=st.session_state.get('city_idx', 0))
place = st.selectbox(T["place"], places, index=st.session_state.get('place_idx', 0))

st.session_state['district_idx'] = districts.index(district)
st.session_state['city_idx'] = cities.index(city)
st.session_state['place_idx'] = places.index(place)


N = st.number_input("Nitrogen (N)", 0, 200, 50)
P = st.number_input("Phosphorus (P)", 0, 200, 50)
K = st.number_input("Potassium (K)", 0, 200, 50)
temperature = st.number_input("Temperature (°C)", -10.0, 60.0, 25.0)
humidity = st.number_input("Humidity (%)", 0.0, 100.0, 50.0)
ph = st.number_input("pH", 0.0, 14.0, 6.5)
rainfall = st.number_input("Rainfall (mm)", 0.0, 500.0, 100.0)

if st.button(T["predict_btn"]):
    data = scaler.transform([[N, P, K, temperature, humidity, ph, rainfall]])
    crop_pred = crop_model.predict(data)
    crop_label = label_encoder.inverse_transform(crop_pred)[0]
    crop_translated = crop_translations.get(crop_label.lower(), {}).get(lang, crop_label)

    fertility_pred = round(fertility_model.predict(data)[0], 2)

    st.success(f"✅ {T['results']}: {crop_translated}, Fertility Score: {fertility_pred}")

    if crop_label.lower() in crop_info:
        info = crop_info[crop_label.lower()]
        st.info(f"📅 **{T['sowing']}:** {info['sowing']} | 🌾 **{T['harvest']}:** {info['harvest']} | ⏳ **{T['duration']}:** {info['duration']}")
