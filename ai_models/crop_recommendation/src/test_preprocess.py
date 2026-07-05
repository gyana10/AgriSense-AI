from preprocess import preprocess

X_train, X_test, y_train, y_test, encoder = preprocess()

print(X_train.shape)
print(X_test.shape)
print(len(encoder.classes_))