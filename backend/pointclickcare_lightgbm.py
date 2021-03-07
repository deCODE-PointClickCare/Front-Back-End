# -*- coding: utf-8 -*-
"""PointClickCare_LightGBM.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1wPLwNhrtMuNHLQaqmQ6DrXRDMUmqwoOe

# Read in the data set
"""

import pandas as pd
import numpy as np
import lightgbm
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelBinarizer

# from google.colab import drive
# drive.mount('/content/drive')

# data = pd.read_csv("/content/drive/My Drive/PointClickCare/diabetic_data.csv")
data = pd.read_csv("diabetic_data.csv")

data.head()

"""# Graphs"""

import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(70,70))
cor = data.corr()
sns.heatmap(cor, annot=True, cmap=plt.cm.Reds)
plt.show()

df_age = data[data.readmitted != 'NO'].groupby('age').count()[['readmitted']].reset_index()
df_age.plot(x='age', y='readmitted',kind="bar", color='green')
plt.title('Age vs. Readmission Count')
plt.show()

df_race = data[data.readmitted != 'NO'].groupby('race').count()[['readmitted']].reset_index()
df_race.plot(x='race', y='readmitted',kind="bar")
plt.title('Race vs. Readmission Count')
plt.show()

# Number of inpatient visits = Number of inpatient visits of the patient in the year preceding the encounter
df_number_inpatient = data[data.readmitted != 'NO'].groupby('number_inpatient').count()[['readmitted']].reset_index()
df_number_inpatient.plot(x='number_inpatient', y='readmitted',kind="bar", color='magenta')
plt.title('Number Inpatient vs. Readmission Count')
plt.show()

"""# Drop columns and Normalize values"""

data.isin(['?']).sum(axis=0)

#drop columsn with a lot of ?
data.drop(['weight','payer_code','medical_specialty', 'encounter_id', 'patient_nbr'], inplace=True, axis=1)
for col_name in data:
  data = data.loc[data[col_name] != '?']

data.isin(['?']).sum(axis=0)

count_row = data.shape[0]
print(count_row)

data.head()

# convert readmitted data to be 0 for NO and 1 for <30 or > 30
data["readmitted"].replace({"NO": 0, ">30": 1, "<30": 1}, inplace=True)
data.head()

# Convert non numerical data to numerical data
def handle_non_numerical_data(df):
    columns = df.columns.values
    for column in columns:
        text_digit_vals = {}
        def convert_to_int(val):
            return text_digit_vals[val]

        if df[column].dtype != np.int64 and df[column].dtype != np.float64:
            column_contents = df[column].values.tolist()
            unique_elements = set(column_contents)
            x = 0
            for unique in unique_elements:
                if unique not in text_digit_vals:
                    text_digit_vals[unique] = x
                    x+=1

            df[column] = list(map(convert_to_int, df[column]))

    return df
data = handle_non_numerical_data(data)
print(data.head())

"""# Check that data is balance"""

# Check the distribution of values for readmitted to see if the data is balanced
data['readmitted'].value_counts()

"""# Extraction and Scaling"""

#extracting predictor values & outcome values
x = data.loc[:, data.columns[0:-1]].values
y = data.loc[:, ['readmitted'] ].values
print(x)
print(y)

#create training and validation sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.25, random_state = 0)

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
x_train = sc.fit_transform(x_train)
x_test = sc.transform(x_test)

y_train=y_train.ravel()
train_data = lightgbm.Dataset(x_train, label=y_train)
test_data = lightgbm.Dataset(x_test, label=y_test)

"""# Training"""

params = {}
params['learning_rate'] = 0.003
params['boosting_type'] = 'gbdt'
params['objective'] = 'binary'
params['metric'] = 'binary_logloss'
params['sub_feature'] = 0.5
params['num_leaves'] = 10
params['min_data'] = 50
params['max_depth'] = 10

clf = lightgbm.train(params, train_data, 100)

#Prediction
y_pred=clf.predict(x_test)

#convert into binary values
for i in range(0,len(y_pred)):
    if y_pred[i]>=0.5:       # setting threshold to .5
       y_pred[i]=1
    else:  
       y_pred[i]=0

# Confusion matrix
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_test, y_pred)
# Accuracy
from sklearn.metrics import accuracy_score
accuracy=accuracy_score(y_pred,y_test)

cm
accuracy

"""# Save the model"""

import pickle
# open a file, where you ant to store the data
file = open('diabetes_readmission_model.pkl', 'wb')

# dump information to that file
pickle.dump(clf, file)

loaded_model = pickle.load(open('diabetes_readmission_model.pkl', 'rb'))
# result = loaded_model.score(x_test, y_test)
print(loaded_model.dump_model())

"""# Testing"""

import sklearn
# sklearn.utils.multiclass.type_of_target(y_test)
y_pred=y_pred.ravel()
sklearn.utils.multiclass.type_of_target(y_pred)

data['readmitted'].value_counts(dropna=False).to_string()

data.isin(['?']).sum(axis=0)

numerical_summary = data.describe()
numerical_summary.transpose()

numerical_columns = list(numerical_summary.columns)
cat_columns = list(set(data.columns) - set(numerical_columns) )
print(cat_columns)

for col in cat_columns:
  print('variable:', col)
  print(data[col].value_counts(dropna=False).to_string())