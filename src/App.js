import './App.css';
import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core'
import './App.css'

function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('Worldwide')

  useEffect(() => {
     const getCountriesData = async ()=> {
      fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=> response.json())
      .then((data)=>{
        const countries = data.map((country) => ({
          key: country.countryInfo._id,
          name: country.country,
          value: country.countryInfo.iso2
        }))

        setCountries(countries) 
      })
     }
      getCountriesData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid 19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select
            onChange = {onCountryChange}
            varient="outlined"
            value={country}>
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}
                </MenuItem>
              ))
            }

          </Select>
        </FormControl>
      </div>
      
      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* Info Boxes */}
      {/* Info Boxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
