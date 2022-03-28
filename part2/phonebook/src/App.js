import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import personsService from './services/service'

const App = () => {

  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(()=>{
    personsService
    .getAll()
    .then(response => {
      setPersons(response) 
      setSearch(response)
    })
  },[])

  const savePerson = (event) => {
    event.preventDefault()
    var isThere = search.reduce(
      (isThere,person)=> isThere || person.name.toLowerCase() == newName.toLowerCase(),false)

    if(isThere){
      window.alert(`${newName} is already added to the phonebook`)
    }
    else{
      if(newName!='') {
        const newPerson = {name:newName,number:newNumber,id:persons.length+1}
        setPersons(persons.concat(newPerson))
        setSearch(persons.concat(newPerson))
        personsService.create(newPerson)
      }
      
    }
    setNewName('')
    setNewNumber('')
  }

  const filterPerson = (event) => {
    var newmap = persons.filter(
      (person)=>person.name.toLocaleLowerCase().includes(event.target.value.toLowerCase()))
    setSearch(newmap)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
      setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={filterPerson}/>
      <h2>Add a new</h2>
      <Form onSubmit={savePerson}
        textName="name:" valueName={newName} onChangeName={handleNewName}
        textNumber="number:" valueNumber={newNumber} onChangeNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons people={search}/>
    </div>
  )
}

export default App