import { useEffect, useState } from "react"
import axios from 'axios'

const SearchResults = ({searchResults}) => {
  if(searchResults.length > 10){
    return(<div>Too many matches, specify another filter</div>)
  } else if (searchResults.length <= 10 && searchResults.length > 1){
    return(
      <div>
        <ul>
          {searchResults.map(country => 
            <li key={country.area}> {country.name.common}</li>
          )}
        </ul>
      </div>
    )
  } else if (searchResults.length === 0){
    return(<div>no results</div>)
  } else {
    return(
      <div>
        <h3>info</h3>
        <ul>
          <li>name : {searchResults[0].name.common}</li>
          <li>capital : {searchResults[0].capital}</li>
          <li>area : {searchResults[0].area}</li>  
          <li>population: {searchResults[0].population}</li>
        </ul>
        <h3>languages</h3>
        <p>
          {searchResults[0].languages[0]}
        </p>
        <h3>weather in {searchResults[0].capital}</h3>
        <h3>flag</h3>
        <img src ={searchResults[0].flags.png}/>
        <h3>map</h3>
        <a href={searchResults[0].maps.googleMaps} target="_blank" rel="noopener noreferrer">View on Google Maps</a>

      </div>
    )
  }
}
const App = () => {
  const [searchKey, setSearchKey] = useState('')
  const [countries, setCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        console.log(res)
        setCountries(res.data)
      })
  },[])
  const handleSearchKeyChange = (event) => {
    const searchTerm = event.target.value
    setSearchKey(searchTerm)
    const results = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(results.filter(result => result.name.common !== "Saint Barthélemy"))  
  }
  return(
    <div>
      <h2>learn api with countries challenge</h2>
      find countries: <input value = {searchKey} onChange={handleSearchKeyChange}/>
      <h2>search results: {searchResults.length}</h2>
      <SearchResults searchResults = {searchResults}/>
      {/* <ul>
        {searchResults.map(country => 
          <li key={country.area}> {country.name.common}</li>
        )}
      </ul> */}
    </div>
  )
}

export default App