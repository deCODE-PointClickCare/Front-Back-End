# Project Requirements

* Here is the project we will be working on in next two days.

* Problem Statement
Out of the total number of patients discharged from a hospital, 23% of them are readmitted. This costs hospitals billions of dollars every year. It is vital for hospitals to track of the performance of SNFs (Skilled Nursing Facilities) to make sure that they discharge their patients to the ones which has lower rate of readmissions. Building a model to predict how many patients from a single SNF have a high change of getting readmitted back to the hospital, will give critical insights to hospital staff which they can use to obtain partnerships with SNFs which has very low rate of readmissions.

* Task
Create prediction models of how likely is it for a patient to get readmitted back to the hospital based on patient vitals, their health history while staying at a SNF and based on caregiver notes

* Dataset
UCI Machine Learning Repository: Diabetes Data Set
http://archive.ics.uci.edu/ml/machine-learning-databases/00296/
http://archive.ics.uci.edu/ml/datasets/diabetes+130-us+hospitals+for+years+1999-2008

* Tools and Technology to use
Scala or Pyscala preferrably on databricks ( you can use Azure data bricks too)

* Front end: React, ES6, typescript(not mandatory), redux (not mandatory ), and react router (only if necessary)
Come up with 3 or 4 models(.e.g decision tree,Linear regressionRandom Forest,light GBM and do hyper tuning and
 Choose your best model and show case your result in interactive front end.
 
 * Front end should also contain different data wrangling like (how many medical specialities you have chosen and how many you have discarded,age and readmission, gender and readmission, race and readmission, A1Cresult and readmission) .

# Setting up the project
1. Set up a virtual environment for Python, If using PyCharm, follow the steps on this site: https://www.jetbrains.com/help/pycharm/creating-virtual-environment.html.
2. After setting up the virtual environment, run the command: `pip install -r requirements.txt`. This will install all the necessary Python libaries.
3. In the frontend folder, run `npm install`. 

# Running the project 
1. For backend: run the command `run app.py` to get the backend up. It will be on `localhost:5000`
2. For UI: run `npm start` in the frontend folder. It will be on `localhost:3000`

