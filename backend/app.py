# import required packages
from flask import Flask, request
from flask_cors import CORS  # comment this on deployment
import pickle

# create a Flask object
app = Flask(__name__)
CORS(app)

# load the ml model which we have saved earlier in .pkl format - rn I'm using Maria's model
model = pickle.load(open('diabetes_readmission_model.pkl', 'rb'))


@app.route('/')
def index():
    return "<h1>deCODE PointClickCare</h1>"


# this gets called in readmissionform
@app.route('/api/prediction', methods=['POST'])
def predict():
    data = request.get_json()

    race_map = {'Caucasian': 1, 'African American': 2, 'Asian': 3, 'Hispanic': 4, 'Other': 5}
    gender_map = {'Female': 1, 'Male': 2, 'Other': 3}
    age_map = {'0-10': 1, '10-20': 2, '30-40': 3, '40-50': 4, '60-70': 5, '70-80': 6, '80-90': 7, '90-100': 8, '100': 9}
    admission_type_map = {'Emergency': 1, 'Urgent': 2, 'Elective': 3, 'Newborn': 4, 'Trauma Center': 7}
    discharge_disposition_map = {'Discharged to home': 1, 'Discharged/transferred to another short term hospital': 2, 'Discharged/transferred to SNF': 3, 'Discharged/transferred to ICF': 4, 'Discharged/transferred to another type of inpatient care institution': 5, 'Discharged/transferred to home with home health service': 6}
    admission_source_map = {'Physician Referral': 1, 'Clinic Referral': 2, 'HMO Referral': 3, 'Transfer from a hospital': 4, 'Transfer from a Skilled Nursing Facility (SNF)': 5, 'Transfer from another health care facility': 6, 'Emergency Room': 7, 'Court/Law Enforcement': 8}

    race = race_map[data['race']]
    gender = gender_map[data['gender']]
    age = age_map[data['age']]
    admission_type_id = admission_type_map[data['admission_type_id']]
    discharge_disposition_id = discharge_disposition_map[data['discharge_disposition_id']]
    admission_source_id = admission_source_map[data['admission_source_id']]
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
    number_diagnoses = data['number_diagnoses']
    max_glu_serum = 0
    a1cresult = 0

    medications = data['medications']

    metformin = 1 if 'metformin' in medications else 0
    repaglinide = 1 if 'repaglinide' in medications else 0
    nateglinide = 1 if 'nateglinide' in medications else 0
    chlorpropamide = 1 if 'chlorpropamide' in medications else 0
    glimepiride = 1 if 'glimepiride' in medications else 0
    acetohexamide = 1 if 'acetohexamide' in medications else 0
    glipizide = 1 if 'glipizide' in medications else 0
    glyburide = 1 if 'glyburide' in medications else 0
    tolbutamide = 1 if 'tolbutamide' in medications else 0
    pioglitazone = 1 if 'pioglitazone' in medications else 0
    rosiglitazone = 1 if 'rosiglitazone' in medications else 0
    acarbose = 1 if 'acarbose' in medications else 0
    miglitol = 1 if 'miglitol' in medications else 0
    troglitazone = 1 if 'troglitazone' in medications else 0
    tolazamide = 1 if 'tolazamide' in medications else 0
    examide = 1 if 'examide' in medications else 0
    citoglipton = 1 if 'citoglipton' in medications else 0
    insulin = 1 if 'insulin' in medications else 0
    glyburide_metformin = 1 if 'glyburide_metformin' in medications else 0
    glipizide_metformin = 1 if 'glipizide_metformin' in medications else 0
    glimepiride_pioglitazone = 1 if 'glimepiride_pioglitazone' in medications else 0
    metformin_rosiglitazone = 1 if 'metformin_rosiglitazone' in medications else 0
    metformin_pioglitazone = 1 if 'metformin_pioglitazone' in medications else 0
    change = 0
    diabetes_med = 0

    prediction = model.predict([[race, gender, age, admission_type_id, discharge_disposition_id, admission_source_id,
                                 time_in_hospital, num_lab_procedures, num_procedures, num_medications,
                                 number_outpatient,
                                 number_emergency, number_inpatient, diag_1, diag_2, diag_3, number_diagnoses,
                                 max_glu_serum, a1cresult, metformin, repaglinide, nateglinide, chlorpropamide,
                                 glimepiride,
                                 acetohexamide, glipizide, glyburide, tolbutamide, pioglitazone, rosiglitazone,
                                 acarbose, miglitol, troglitazone, tolazamide, examide, citoglipton, insulin,
                                 glyburide_metformin, glipizide_metformin, glimepiride_pioglitazone,
                                 metformin_rosiglitazone,
                                 metformin_pioglitazone, change, diabetes_med]])

    readmission_chance = prediction[0]
    response = {'result': readmission_chance}
    print(response)
    return response, 201


if __name__ == "__main__":
    # run method starts our web service
    # Debug : as soon as I save anything in my structure, server should start again
    app.run()
