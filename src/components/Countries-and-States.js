import React, { useState, useEffect } from 'react';

const CountriesAndStates = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);


  useEffect(() => {
    fetch('https://xc-countries-api.fly.dev/api/countries/')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error(error));
  }, []);

  const onChangeHandler = () => {
    const c = document.getElementById("Country");
    const code = c.value;
    const url = 'https://xc-countries-api.fly.dev/api/countries/'+code+'/states/';
    fetch(url)
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(error => console.error(error));
  }


  return (
    <div>
      <label for="Country"> Countries: 
      <select name="Country" id="Country" style={{marginLeft: "10px"}} onChange={onChangeHandler}>
        <option value="">-- Pick a Country --</option>
      {countries.map((country) => {
         return (
            <option value={country.code}>{country.name}</option>
         );
      })}
      </select>
      </label>

      <label for="States" style={{marginLeft: "20px"}}> States: 
      <select name="States" id="States" style={{marginLeft: "10px"}}>
      <option value="">-- Pick a State --</option>
      {states.map((state) => {
         return (
            <option id={state.code}>{state.name}</option>
         );
      })}
      </select>
      </label>
    </div>
  );
}

export default CountriesAndStates;