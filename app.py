# import required packages
from flask import Flask, render_template, request
import requests
import pickle
import numpy as np
from flask_cors import CORS #comment this on deployment
import sklearn
from sklearn.preprocessing import StandardScaler

# create a Flask object
app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment

# load the ml model which we have saved earlier in .pkl format - rn I'm using Maria's model
model = pickle.load(open('diabetes_readmission_model.pkl', 'rb'))

@app.route('/', methods=['GET'])
# create a function Home that will return index.html(which contains html form)
def Home():
    return render_template('index.html')

# creating object for StandardScaler
standard_to = StandardScaler()

# this gets called in readmissionform
@app.route('/predict_model', methods=['POST'])
def add_movie():
    data = request.get_json()

    # all the values from the cleaned data set see: diabetes_readmission_model
    race = data['Race']
    gender = data['Gender']
    age = data['Age']
    admission_type_id = data['admission_type_id']
    discharge_disposition_id = data['discharge_disposition_id']
    admission_source_id = data['admission_source_id']
    time_in_hospital = data['time_in_hospital']
    num_lab_procedures = data['num_lab_procedures']
    num_procedures = data['num_procedures']
    num_medications = data['num_medications']
    number_outpatient = data['number_outpatient']
    number_emergency = data['number_emergency']
    number_inpatient = data['number_inpatient']
    diag_1 = data['diag_1']
    diag_2 = data['diag_2']
    diag_3 = data['diag_3']
    number_diagnosis = data['number_diagnosis']
    max_glu_serum = data['max_glu_serum']
    a1cresult = data['a1cresult']
    metformin = data['metformin']
    repaglinide = data['repaglinide']
    nateglinide = data['nateglinide']
    chlorpropamide = data['chlorpropamide']
    glimepiride = data['glimepiride']
    acetohexamide = data['acetohexamide']
    glipizide = data['glipizide']
    glyburide = data['glyburide']
    tolbutamide = data['tolbutamide']
    pioglitazone = data['pioglitazone']
    rosiglitazone = data['rosiglitazone']
    acarbose = data['acarbose']
    miglitol = data['miglitol']
    troglitazone = data['troglitazone']
    tolazamide = data['tolazamide']
    examide = data['examide']
    citoglipton = data['citoglipton']
    insulin = data['insulin']
    glyburide_metformin = data['glyburide_metformin']
    glipizide_metformin = data['glipizide_metformin']
    glimepiride_pioglitazone = data['glimepiride_pioglitazone']
    metformin_rosiglitazone = data['metformin_rosiglitazone']
    metformin_pioglitazone = data['metformin_pioglitazone']
    change = data['change']
    diabetesMed = data['diabetesMed']

    prediction = model.predict([[race, gender, age, admission_type_id, discharge_disposition_id, admission_source_id,
                                 time_in_hospital, num_lab_procedures, num_procedures, num_medications, number_outpatient,
                                 number_emergency, number_inpatient, diag_1, diag_2, diag_3, number_diagnosis,
                                 max_glu_serum, a1cresult, metformin, repaglinide, nateglinide, chlorpropamide, glimepiride,
                                 acetohexamide, glipizide, glyburide, tolbutamide, pioglitazone, rosiglitazone,
                                 acarbose, miglitol, troglitazone, tolazamide, examide, citoglipton, insulin,
                                 glyburide_metformin, glipizide_metformin, glimepiride_pioglitazone, metformin_rosiglitazone,
                                 metformin_pioglitazone, change, diabetesMed]])

    return 'Done', 201

# Use this as an example of how to call the ML models ------------------------- delete after we are done with predict_model
@app.route("/predict", methods=['POST'])
# define the predict function which is going to predict the results from ml model based on the given values through html form
def predict():
    Fuel_Type_Diesel = 0
    if request.method == 'POST':

        # Use request.form to get the data from html form through post method.
        # these all are nothing but features of our dataset(ml model)
        Year = int(request.form['Year'])
        Year = 2020 - Year
        Present_Price = float(request.form['Present_Price'])
        Kms_Driven = int(request.form['Kms_Driven'])
        Kms_Driven2 = np.log(Kms_Driven)
        Owner = int(request.form['Owner'])
        Fuel_Type_Petrol = request.form['Fuel_Type_Petrol']

        # Fuel_Type(feature) is categorised into petrol, diesel, cng, therefore we have done one-hot encoding on it while building model
        if (Fuel_Type_Petrol == 'Petrol'):
            Fuel_Type_Petrol = 1
            Fuel_Type_Diesel = 0
        elif (Fuel_Type_Petrol == 'Diesel'):
            Fuel_Type_Petrol = 0
            Fuel_Type_Diesel = 1
        else:
            Fuel_Type_Petrol = 0
            Fuel_Type_Diesel = 0

        # Seller_type(feature) is categorised into indivividual and dealer,therefore we have done one-hot encoding on it while building model
        Seller_Type_Individual = request.form['Seller_Type_Individual']
        if (Seller_Type_Individual == 'Individual'):
            Seller_Type_Individual = 1
        else:
            Seller_Type_Individual = 0

        # Transmission mannual(feature) is categorised into mannual and automatic,therefore we have done one-hot encoding on it while building model
        Transmission_Mannual = request.form['Transmission_Mannual']
        if (Transmission_Mannual == 'Mannual'):
            Transmission_Mannual = 1
        else:
            Transmission_Mannual = 0
        prediction = model.predict([[Present_Price, Kms_Driven2, Owner, Year, Fuel_Type_Diesel, Fuel_Type_Petrol,
                                     Seller_Type_Individual, Transmission_Mannual]])
        output = round(prediction[0], 2)

        # condition for invalid values
        if output < 0:
            return render_template('index.html', prediction_text="Sorry you cannot sell this car")

        # condition for prediction when values are valid
        else:
            return render_template('index.html', prediction_text="You Can Sell the Car at {} lakhs".format(output))

    # html form to be displayed on screen when no values are inserted; without any output or prediction
    else:
        return render_template('index.html')

if __name__ == "__main__":
    # run method starts our web service
    # Debug : as soon as I save anything in my structure, server should start again
    app.run(debug=True)
