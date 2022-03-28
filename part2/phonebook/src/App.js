import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import personsService from './services/service'

const App = () => {

  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  /**For getting the people(persons) */
  useEffect(()=>{
    personsService
    .getAll()
    .then(response => {
      console.log(response)
      setPersons(response) 
      setSearch(response)
    })
  },[])

  /**For saving the person */
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

  /**For delete one person */
  const deletePerson = (person) =>{
    if(window.confirm(`Delete ${person.name}`)){
      personsService
      .erase(person.id)
      .then(response=>{
        setSearch(search.filter(p => p.id !=person.id))
        setPersons(persons.filter(p => p.id !=person.id))
      })
    }
  }

  /**Filter each time something it's write on the filter */
  const filterPerson = (event) => {
    var newmap = persons.filter(
      (person)=>person.name.toLocaleLowerCase().includes(event.target.value.toLowerCase()))
    setSearch(newmap)
  }

  /**Add a new name*/
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  /**Add a new number */
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
      <Persons people={search} handleOnClick={deletePerson}/>
    </div>
  )
}

export default App