import { useState } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [search, setSearch] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const savePerson = (event) => {
    event.preventDefault()
    var isThere = search.reduce(
      (isThere,person)=> isThere || person.name.toLowerCase() == newName.toLowerCase(),false)

    if(isThere){
      window.alert(`${newName} is already added to the phonebook`)
    }
    else{
      if(newName!='') {
        setPersons(persons.concat({name:newName,number:newNumber,id:persons.length+1}))
        setSearch(persons.concat({name:newName,number:newNumber,id:persons.length+1}))
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