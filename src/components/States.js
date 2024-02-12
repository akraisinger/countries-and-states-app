import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './CountriesContext.js';

const States = () => {
    const [states, setStates] = useState([]);
    const code = useContext(AppContext);
    const compareByName = (a,b) => {
        return ((a.name).localeCompare(b.name));
    }    

    useEffect(() => {
        if (code===""){
            setStates([]);
          }
          else {
            const url = `https://xc-countries-api.fly.dev/api/countries/${code}/states/`;
            fetch(url)
              .then(response => response.json())
              .then(data => setStates(data.sort(compareByName)))
              .catch(error => console.error(error));
            
          }
    }, [code]);


    return (
        <label name="States" style={{marginLeft: "20px"}}> States: 
          <select name="States" id="States" style={{marginLeft: "10px"}}>
          <option value="">-- Pick a State --</option>
          {states.map((state) => {
             return (
                <option id={state.code} key={state.id}>{state.name}</option>
             );
          })}
          </select>
          </label>
    )
}
export default States;