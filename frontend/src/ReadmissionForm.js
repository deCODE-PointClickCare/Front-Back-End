<<<<<<< Updated upstream
import React, { useState } from "react";
import { Form, Input, Rating, Button } from "semantic-ui-react";

export const ReadmissionForm = ({ onNewMovie }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);

  return (
    <Form>
      <Form.Field>
        <Input
          placeholder="movie title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Form.Field>
     <Form.Field>
        <Input
          placeholder="year"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Button
          onClick={async () => {
            const movie = { title, rating };
            const response = await fetch("http://localhost:5000/predict_model", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(movie)
            });

            if (response.ok) {
              console.log("response worked!");
//              onNewMovie(movie);
//              setTitle("");
//              setRating(1);
            }
          }}
        >
          submit
        </Button>
      </Form.Field>
    </Form>
  );
};
=======
import React, { Component } from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

class ReadmissionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        textfield1: "",
        textfield2: "",
        select1: 1,
        select2: 1,
        select3: 1,
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

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch("http://127.0.0.1:5000/prediction/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          result: response.result,
          isLoading: false,
        });
      });
  };

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  };

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    return (
      <Container>
        <div>
          <h1 className="title"> Readmission Prediction App</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Text Field 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="textfield1"
                  value={formData.textfield1}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Text Field 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Patient number"
                  name="textfield2"
                  value={formData.textfield2}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.select1}
                  name="select1"
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
              <Form.Group as={Col}>
                <Form.Label>A1c Test Result</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.select2}
                  name="select2"
                  onChange={this.handleChange}
                >
                  <option>None</option>
                  <option> Greater than 8 </option>
                  <option> Greater than 7</option>
                  <option>Normal</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Race</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.select3}
                  name="select3"
                  onChange={this.handleChange}
                >
                  <option> Caucasian</option>
                  <option> Asian</option>
                  <option> African American</option>
                  <option> Hispanic</option>
                  <option> Other</option>
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
          {result === "" ? null : (
            <Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    );
  }
}

export default ReadmissionForm;
>>>>>>> Stashed changes
