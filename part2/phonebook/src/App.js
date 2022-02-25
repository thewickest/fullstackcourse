import { useState } from 'react'

const Name = ({name,number}) => (
  <>
    <p>{name} {number}</p>
  </>
)

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
      (isThere,person)=> isThere || person.name == newName,false)

    if(isThere){
      window.alert(`${newName} is already added to the phonebook`)
    }
    else{
      if(newName!='') {
        setPersons(search.concat({name:newName,number:newNumber}))
        setSearch(search.concat({name:newName,number:newNumber}))
      }
      
    }
    setNewName('')
    setNewNumber('')
  }

  const filterPerson = (event) => {

    var newmap = persons.map(
      function (person) {
        console.log(person.name)
        console.log(event.target.value)
        console.log("--------")
        if (person.name.includes(event.target.value)) {
          return person
        }else{
          return {name:'',number:''}
        }
      })
    setSearch(newmap)
    console.log(newmap)
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
        <div>filter shown with<input onChange={filterPerson}/></div>
      <h2>Add a new</h2>
      <form onSubmit={savePerson}>
        <div>name: <input value={newName} onChange={handleNewName}/></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {search.map(person => <Name key={person.id} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App