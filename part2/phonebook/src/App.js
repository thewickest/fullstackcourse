import { useState } from 'react'

const Name = ({name,number}) => (
  <>
    <p>{name} {number}</p>
  </>
)

const App = () => {
  const [persons, setPersons] = useState(
    [{ name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const savePerson = (event) => {
    event.preventDefault()
    var isThere = persons.reduce(
      (isThere,person)=> isThere || person.name == newName,false)

    if(isThere){
      window.alert(`${newName} is already added to the phonebook`)
    }
    else{
      if(newName!='') setPersons(persons.concat({name:newName,number:newNumber}))
    }
    setNewName('')
    setNewNumber('')
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
      <form onSubmit={savePerson}>
        <div>name: <input value={newName} onChange={handleNewName}/></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Name key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App