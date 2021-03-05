import { useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import * as d3 from 'd3';
import diabetic_data from './diabetic_data.csv';

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
const age_readmitted_data = {}
const age_readmitted_graph_data = []

function Graphs() {
    function age_graph_data(){
        for (const age in age_readmitted_data){
            age_readmitted_graph_data.push({'age': age, 'readmission_number': age_readmitted_data[age]})
        }
    }

    useEffect(() => {
         d3.csv(diabetic_data, function(diabetic_data) { 
                if (age_readmitted_data[diabetic_data["age"]]){
                    if (diabetic_data["readmitted"] !== "NO"){
                        age_readmitted_data[diabetic_data["age"]] += 1
                    }
                } else {
                    age_readmitted_data[diabetic_data["age"]] = 1
                }
            }).then(age_graph_data())     
    }, [])
    return (
        <>
        {console.log(age_readmitted_data)}
        {console.log(age_readmitted_graph_data)}
        {age_readmitted_graph_data.length !== 0 && 
            <LineChart width={600} height={300} data={age_readmitted_data}>
                <Line type="monotone" dataKey="readmission_number" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="age" />
                <YAxis />
            </LineChart>
        }
      </>
    );
  }
  
  export default Graphs;