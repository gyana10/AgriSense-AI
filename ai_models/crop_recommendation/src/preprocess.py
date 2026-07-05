import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

from config import DATASET_PATH


def load_data():

    df = pd.read_csv(DATASET_PATH)

    return df


def preprocess():

    df = load_data()

    X = df.drop("label", axis=1)

    y = df["label"]

    encoder = LabelEncoder()

    y = encoder.fit_transform(y)

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )

    return (
        X_train,
        X_test,
        y_train,
        y_test,
        encoder,
    )