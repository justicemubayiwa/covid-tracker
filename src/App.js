import Table from './Table'
import {sortData} from './util'
import LineGraph from './LineGraph';

import InfoBox from './InfoBox';
import Map from './Map';
import { Card } from '@material-ui/core';
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
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  useEffect(()=> {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data);
    })
  }, [])

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
        
        const sortedData = sortData(data);
        setTableData(sortedData)
        setCountries(countries) 
      })
     }
      getCountriesData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)
  

  const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
  .then(response => response.json())
  .then(data => {
    setCountryInfo(data)
  })

  }

  console.log(countryInfo)




  return (
    <div className="app">
      <div className="app__left">
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

        <div className="app__stats">
          <InfoBox 
            title ="Cases" 
            cases={countryInfo.active} 
            total ={countryInfo.cases} />
          <InfoBox 
            title ="Recovered" 
            cases ={countryInfo.todayRecovered} 
            total = {countryInfo.recovered} />
          <InfoBox title ="Deaths" 
            cases ={countryInfo.todayDeaths} 
            total ={countryInfo.deaths}  
          />
        </div>

  
        <Map />
      </div>
      <Card className='app__right' >
        <h3>Live Cases by Country</h3>
        <Table countries={tableData} />
        <h3>Worldwide new cases</h3>
        <LineGraph />
      </Card>
    </div>
      
  );
}

export default App;
