import {useEffect, useState} from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App=() => {

  const [all, setAll]= useState([])
  const [filter, setFilter] = useState([])

  useEffect(()=>{axios
    .get('https://restcountries.com/v3.1/all')
    .then(response =>{setAll(response.data)})
  },[])

  const setCountry=(country)=>{
    setFilter([country])
  }

  const handleNewName = (event) =>{
    const f = all.filter(
      (country) => country.name.common.toLowerCase()
      .includes(event.target.value.toLowerCase()))
      setFilter(f)
  }

  return (
    <div>
      find countries 
      <input onChange={handleNewName}/>
      <Countries list={filter} handleClick={setCountry}/>
    </div>
  );
}

export default App;
