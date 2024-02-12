import React, { useState, useEffect} from 'react';
import {AppContext} from './CountriesContext';
import States from './States';

const Countries = () => {
  
  const [countries, setCountries] = useState([]);
  const [code, setCode] = useState("");

  const compareByName = (a,b) => {
    return ((a.name).localeCompare(b.name));
  }

  useEffect(() => {
    fetch('https://xc-countries-api.fly.dev/api/countries/')
      .then(response => response.json())
      .then(data => setCountries(data.sort(compareByName)))
      .catch(error => console.error(error));
  }, []);


  const onChangeHandler = () => {
    setCode(document.getElementById("Country").value);
  }

  return (
    <AppContext.Provider value={code}>
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
      <States />
      </AppContext.Provider>
  );
}

export default Countries;