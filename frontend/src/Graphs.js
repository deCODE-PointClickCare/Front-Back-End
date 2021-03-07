import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
  Legend,
} from "recharts";
import * as d3 from "d3";
import diabetic_data from "./diabetic_data.csv";
import age_avg from "./age_avg.csv";
import race_avg from "./race_avg.csv";
import { useLocation } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const age_readmitted_data = {};
const race_readmitted_data = {};
const inpatient_readmitted_data = {};
const age_avg_readmitted_data = [];
const race_avg_readmitted_data = [];

function Graphs() {
  const location = useLocation();
  const [ageData, setAgeData] = useState([]);
  const [raceData, setRaceData] = useState([]);
  const [inpatientData, setInpatientData] = useState([]);
  const [ageAvgData, setAgeAvgData] = useState([]);
  const [raceAvgData, setRaceAvgData] = useState([]);

  function age_graph_data() {
    const temp_data = [];
    for (const age in age_readmitted_data) {
      temp_data.push({
        age: age,
        readmission_number: age_readmitted_data[age],
      });
    }
    setAgeData(temp_data);
  }

  function race_graph_data() {
    const temp_data = [];
    for (const race in race_readmitted_data) {
      temp_data.push({
        race: race,
        readmission_number: race_readmitted_data[race],
      });
    }
    setRaceData(temp_data);
  }

  function inpatient_graph_data() {
    const temp_data = [];
    for (const inpatient in inpatient_readmitted_data) {
      temp_data.push({
        inpatient: inpatient,
        readmission_number: inpatient_readmitted_data[inpatient],
      });
    }
    setInpatientData(temp_data);
  }

  useEffect(() => {
    d3.csv(diabetic_data, function (diabetic_data) {
      if (age_readmitted_data[diabetic_data["age"]]) {
        if (diabetic_data["readmitted"] !== "NO") {
          age_readmitted_data[diabetic_data["age"]] += 1;
        }
      } else {
        age_readmitted_data[diabetic_data["age"]] = 1;
      }

      if (race_readmitted_data[diabetic_data["race"]]) {
        if (diabetic_data["readmitted"] !== "NO") {
          race_readmitted_data[diabetic_data["race"]] += 1;
        }
      } else {
        race_readmitted_data[diabetic_data["race"]] = 1;
      }

      if (inpatient_readmitted_data[diabetic_data["number_inpatient"]]) {
        if (diabetic_data["readmitted"] !== "NO") {
          inpatient_readmitted_data[diabetic_data["number_inpatient"]] += 1;
        }
      } else {
        inpatient_readmitted_data[diabetic_data["number_inpatient"]] = 1;
      }
    }).then(() => {
      age_graph_data();
      race_graph_data();
      inpatient_graph_data();
    });

    d3.csv(age_avg, function (age_avg) {
      age_avg_readmitted_data.push({
        age: age_avg["age"],
        readmission_number: parseFloat(age_avg["avg(prediction)"]),
      });
    }).then(() => setAgeAvgData(age_avg_readmitted_data));

    d3.csv(race_avg, function (race_avg) {
      race_avg_readmitted_data.push({
        race: race_avg["race"],
        readmission_number: parseFloat(race_avg["avg(prediction)"]),
      });
    }).then(() => setRaceAvgData(race_avg_readmitted_data));
  }, []);

  return (
    <>
      {location.state.result === "" ? null : (
        <Row>
          <Col className="result-container">
            <h5>Patient Readmission Probability</h5>
            <h5 id="result">
              {(location.state.result * 100).toFixed(2) + "%"}
            </h5>
          </Col>
        </Row>
      )}
      {ageData && (
        <>
          <h1>Age vs. Readmission Count</h1>
          <LineChart width={600} height={300} data={ageData}>
            <Line
              type="monotone"
              dataKey="readmission_number"
              stroke="#8884d8"
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="age" />
            <YAxis />
          </LineChart>
        </>
      )}
      {raceData && (
        <>
          <h1>Race vs. Readmission Count</h1>
          <LineChart width={600} height={300} data={raceData}>
            <Line
              type="monotone"
              dataKey="readmission_number"
              stroke="#8884d8"
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="race" />
            <YAxis />
          </LineChart>
        </>
      )}
      {inpatientData && (
        <>
          <h1>Number Inpatient vs. Readmission Count</h1>
          <LineChart width={600} height={300} data={inpatientData}>
            <Line
              type="monotone"
              dataKey="readmission_number"
              stroke="#8884d8"
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="inpatient" />
            <YAxis />
          </LineChart>
        </>
      )}
      {ageAvgData && (
        <>
          <h1>Age vs. Predicted Readmission Average</h1>
          <BarChart width={600} height={300} data={ageAvgData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="readmission_number" fill="#8884d8" name="avg" />
          </BarChart>
        </>
      )}
      {raceAvgData && (
        <>
          <h1>Race vs. Predicted Readmission Average</h1>
          <BarChart width={600} height={300} data={raceAvgData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="race" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="readmission_number" fill="#8884d8" name="avg" />
          </BarChart>
        </>
      )}
    </>
  );
}

export default Graphs;
