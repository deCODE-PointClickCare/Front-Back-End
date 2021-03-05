# import required packages
from flask import Flask, request
from flask_cors import CORS  # comment this on deployment
import pickle
import pandas as pd

# create a Flask object
app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)  # comment this on deployment

# load the ml model which we have saved earlier in .pkl format - rn I'm using Maria's model
model = pickle.load(open('diabetes_readmission_model.pkl', 'rb'))


# this gets called in readmissionform
@app.route('/prediction/', methods=['POST'])
def predict():
    data = request.get_json()

    race_map = {'Caucasian': 1, 'African American': 2, 'Asian': 3, 'Hispanic': 4, 'Other': 5}
    gender_map = {'Female': 1, 'Male': 2, 'Other': 3}
    age_map = {'0-10': 1, '10-20': 2, '30-40': 3, '40-50': 4, '60-70': 5, '70-80': 6, '80-90': 7, '90-100': 8, '100': 9}

    # all the values from the cleaned data set see: diabetes_readmission_model

    race = race_map[data['race']]
    gender = gender_map[data['gender']]
    age = age_map[data['age']]
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
    glyburide_metformin = 1
    glipizide_metformin = 1
    glimepiride_pioglitazone = 1
    metformin_rosiglitazone = 1
    metformin_pioglitazone = 1
    change = 1
    diabetes_med = 1

    prediction = model.predict([[race, gender, age, admission_type_id, discharge_disposition_id, admission_source_id,
                                 time_in_hospital, num_lab_procedures, num_procedures, num_medications,
                                 number_outpatient,
                                 number_emergency, number_inpatient, diag_1, diag_2, diag_3, number_diagnosis,
                                 max_glu_serum, a1cresult, metformin, repaglinide, nateglinide, chlorpropamide,
                                 glimepiride,
                                 acetohexamide, glipizide, glyburide, tolbutamide, pioglitazone, rosiglitazone,
                                 acarbose, miglitol, troglitazone, tolazamide, examide, citoglipton, insulin,
                                 glyburide_metformin, glipizide_metformin, glimepiride_pioglitazone,
                                 metformin_rosiglitazone,
                                 metformin_pioglitazone, change, diabetes_med]])

    readmission_chance = prediction[0]
    response = {'readmission_chance': readmission_chance}
    print(response)
    return response, 201


if __name__ == "__main__":
    # run method starts our web service
    # Debug : as soon as I save anything in my structure, server should start again
    app.run(debug=True)
