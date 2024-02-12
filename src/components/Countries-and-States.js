import React, { useState, useEffect } from 'react';

const CountriesAndStates = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const compareByName = (a,b) => {
    return ((a.name).localeCompare(b.name));
  }

  useEffect(() => {
    fetch('https://xc-countries-api.fly.dev/api/countries/')
      .then(response => response.json())
      .then(data => setCountries(data.sort(compareByName)))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const code = document.getElementById("Country").value;
    if (code!==""){
      const url = `https://xc-countries-api.fly.dev/api/countries/${code}/states/`;
      fetch(url)
        .then(response => response.json())
        .then(data => setStates(data.sort(compareByName)))
        .catch(error => console.error(error));
    }
  }, [states, setStates]);

  const onChangeHandler = () => {
    setStates([])
  }
  
  return (
    <div>
      <label> Countries: 
      <select name="Country" id="Country" style={{marginLeft: "10px"}} onChange={onChangeHandler}>
        <option value="">-- Pick a Country --</option>
      {countries.map((country) => {
         return (
            <option value={country.code} key={country.id}>{country.name}</option>
         );
      })}
      </select>
      </label>

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
    </div>
  );
}

export default CountriesAndStates;