import {useEffect, useState} from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Weather from './components/Weather'

const App=() => {

  const [all, setAll]= useState([])
  const [weather, setWeather] = useState(null)
  const [filter, setFilter] = useState([])

  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response =>{setAll(response.data)})
  },[])
  
  function getAxios(country){
    axios
      .get("http://api.openweathermap.org/data/2.5/weather?q="
                  +country[0].name.common
                  +"&appid="
                  +process.env.REACT_APP_API_KEY)
      .then(response => setWeather(response.data))
      .catch(error => error)
  }

  async function getWeather(country){
    if(country.length===1){
      getAxios(country)
    }
  }
  
  const setCountry=(country)=>{
    setFilter([country])
    getWeather([country])
  }

  const handleNewName = (event) =>{
    const f = all.filter(
      (country) => country.name.common.toLowerCase()
      .includes(event.target.value.toLowerCase()))
      setFilter(f)
      if(f.length===1) getWeather(f)
      else setWeather(null)
  }

  return (
    <div>
      find countries 
      <input onChange={handleNewName}/>
      <Countries list={filter} handleClick={setCountry} weather={weather}/>
    </div>
  );
}

export default App;
