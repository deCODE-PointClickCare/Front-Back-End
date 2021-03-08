import React, { Component } from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import history from "./history";

class ReadmissionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        race: "Caucasian",
        gender: "Female",
        age: "0-10",
        admission_type_id: "Emergency",
        discharge_disposition_id: "Discharged to home",
        admission_source_id: "Physician Referral",
        time_in_hospital: 1,
        num_lab_procedures: 1,
        num_procedures: 1,
        num_medications: 1,
        number_outpatient: 1,
        number_emergency: 1,
        number_inpatient: 1,
        diag_1: 1,
        diag_2: 1,
        diag_3: 1,
        number_diagnoses: 1,
        medications: [],
      },
      result: "",
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData,
    });
  };

  handleMedicationSelect = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    var formData = this.state.formData;
    formData["medications"] = value;
    this.setState({
      formData,
    });
  };

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch(
      "https://decode-pointclickcare-backend.herokuapp.com/api/prediction",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        history.push({
          pathname: "/Graphs",
          state: { result: response.result },
        });
      });
  };

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  };

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    return (
      <Container>
        <div>
          <h1 className="title"> Readmission Prediction App</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Race</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.race}
                  name="race"
                  onChange={this.handleChange}
                >
                  <option>Caucasian</option>
                  <option>African American</option>
                  <option>Asian</option>
                  <option>Hispanic</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.gender}
                  name="gender"
                  onChange={this.handleChange}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.age}
                  name="age"
                  onChange={this.handleChange}
                >
                  <option>0-10</option>
                  <option>10-20</option>
                  <option>30-40</option>
                  <option>40-50</option>
                  <option>60-70</option>
                  <option>70-80</option>
                  <option>80-90</option>
                  <option>90-100</option>
                  <option>100+</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Admission Type</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.admission_type_id}
                  name="admission_type_id"
                  onChange={this.handleChange}
                >
                  <option>Emergency</option>
                  <option>Urgent</option>
                  <option>Elective</option>
                  <option>Newborn</option>
                  <option>Trauma Center</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Discharge Disposition</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.discharge_disposition_id}
                  name="discharge_disposition_id"
                  onChange={this.handleChange}
                >
                  <option>Discharged to home</option>
                  <option>
                    Discharged/transferred to another short term hospital
                  </option>
                  <option>Discharged/transferred to SNF</option>
                  <option>Discharged/transferred to ICF</option>
                  <option>
                    Discharged/transferred to another type of inpatient care
                    institution
                  </option>
                  <option>
                    Discharged/transferred to home with home health service
                  </option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Admission Source</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.admission_source_id}
                  name="admission_source_id"
                  onChange={this.handleChange}
                >
                  <option>Physician Referral</option>
                  <option>Clinic Referral</option>
                  <option>HMO Referral</option>
                  <option>Transfer from a hospital</option>
                  <option>
                    Transfer from a Skilled Nursing Facility (SNF)
                  </option>
                  <option>Transfer from another health care facility</option>
                  <option>Emergency Room</option>
                  <option>Court/Law Enforcement</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Time in hospital (days)</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.time_in_hospital}
                  name="time_in_hospital"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Number of lab procedures</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.num_lab_procedures}
                  name="num_lab_procedures"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Number of procedures</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.num_procedures}
                  name="num_procedures"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Number of medications</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.num_medications}
                  name="num_medications"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Number of outpatient visits</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.number_outpatient}
                  name="number_outpatient"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Number of emergency visits</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.number_emergency}
                  name="number_emergency"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Number of inpatient visits</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.number_inpatient}
                  name="number_inpatient"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Primary Diagnosis (ICD-9)</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.diag_1}
                  name="diag_1"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Secondary Diagnosis (ICD-9)</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.diag_2}
                  name="diag_2"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Tertiary Diagnosis (ICD-9)</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.diag_3}
                  name="diag_3"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Number of Diagnoses</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.number_diagnoses}
                  name="number_diagnoses"
                  placeholder="number of diagnoses"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>
                  Prescribed medications (select multiple)
                </Form.Label>
                <Form.Control
                  name="metformin"
                  onChange={this.handleMedicationSelect}
                  as="select"
                  multiple
                >
                  <option>metformin</option>
                  <option>repaglinide</option>
                  <option>nateglinide</option>
                  <option>chlorpropamide</option>
                  <option>glimepiride</option>
                  <option>acetohexamide</option>
                  <option>glipizide</option>
                  <option>glyburide</option>
                  <option>tolbutamide</option>
                  <option>pioglitazone</option>
                  <option>rosiglitazone</option>
                  <option>acarbose</option>
                  <option>miglitol</option>
                  <option>troglitazone</option>
                  <option>tolazamide</option>
                  <option>examide</option>
                  <option>citoglipton</option>
                  <option>insulin</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}
                >
                  {isLoading ? "Making prediction" : "Predict"}
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}
                >
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    );
  }
}

export default ReadmissionForm;
