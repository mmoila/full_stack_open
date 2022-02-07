import { useEffect, useState } from 'react';
import React from 'react';
import axios from "axios"

const CountryList = (props) => {
  const countries = props.getFilteredCountries(props.allCountries, props.filterValue)
  console.log(`render country list: ${props.showCountry}`)

  if (props.showCountry) {
    return <Country country={countries.filter(c => c.altSpellings[0] === props.showCountry)[0]}
      weather={props.weather}/>

  } else if (countries.length > 10) {
    return <p>too many matches, specify another filter</p>

  } else {
    return (
      <table>
        <tbody>
          {countries.map(country => 
          <tr key={country.altSpellings[0]}>
            <td>{country.name.common}</td>
            <td><button onClick={() => props.showCountryDetails(country.altSpellings[0], country.capital[0])}>show</button></td>
          </tr>)}
        </tbody>
      </table>
    )
  }
}

const Country = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>  
      <div>
        <p>Capital: {country.capital}</p>
        <p>Currency: {Object.keys(country.currencies)}</p>
      </div>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages)
          .map((entry, i) => 
            <li key={i}>{entry[1]}</li>)}
      </ul>
      <br />
      <div>
        <img src={country.flags.png} alt='Flag of the country'/>
      </div>
      <Weather country={country} weather={weather} />
    </div>
  )
}

const Weather = ({ country, weather }) => {
  
  if (Object.keys(weather).length === 0) {
    console.log("no weather data")
    return <p>No weather data</p>
  }
  return (
    <div>
      <h2>Weather at {country.capital[0]}</h2>
      <div>
        <p><strong>Temperature </strong>{weather.temp_c}</p>
        <img src={weather.condition.icon} alt="Weather icon" />
        <p><strong>Wind </strong>{weather.wind_kph} km/h from direction {weather.wind_dir}</p>
      </div>
    </div>
  )
}

const CountrySearch = ({ filterValue, handleSearchInput }) => {
  return (
    <form>
      <label>find countries: </label>
      <input value={filterValue} onChange={handleSearchInput}/> 
    </form>
  )
}

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [weather, setWeather] = useState({}) 
  const [filterValue, setFilterValue] = useState("")
  const [showCountry, setShowCountry] = useState("") 


 
  useEffect(() => {
    console.log("effect hook1")
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setAllCountries(allCountries.concat(response.data))
        console.log(response.data)
      })
  }, [])
            
  const getWeather = (city) => {
    console.log("getting weather data")
    axios
      .get("http://api.weatherapi.com/v1/current.json", {
        params: {
          key: process.env.REACT_APP_WEATHER_API_KEY,
          q : city
        }
      })
      .then(response => {
        console.log(response.data.current)
        setWeather(response.data.current)
      })
  }
    
  const showCountryDetails = (country, capital) => {
    console.log(`getting ${country} details`)
    setShowCountry(country)
    getWeather(capital)
  }


  const handleSearchInput = (event) => {
    setFilterValue(event.target.value)
    const filteredCountries = getFilteredCountries(allCountries, event.target.value)

    if (filteredCountries.length === 1) {
      showCountryDetails(filteredCountries[0].altSpellings[0], filteredCountries[0].capital[0])
      
    } else {
      setShowCountry("")
    }
  }

  const getFilteredCountries = (allCountries, filterValue) => {
    if (filterValue === "") {
      return allCountries
    }
    const filteredCountries = allCountries.filter(country =>
      country.name.common
        .toLowerCase()
        .indexOf(filterValue.toLowerCase()) !== -1)
    return filteredCountries
  } 
  
  return (
    <>
      <CountrySearch filterValue={filterValue} handleSearchInput={handleSearchInput}/>
      <CountryList getFilteredCountries={getFilteredCountries} allCountries={allCountries}
      filterValue={filterValue} showCountryDetails={showCountryDetails} showCountry={showCountry}
      weather={weather}/>
    </>
  )
}

export default App;
