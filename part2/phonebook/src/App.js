import { useState } from 'react'

const Name = ({name}) => (
  <>
    <p>{name}</p>
  </>
)

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  const saveName = (event) => {
    event.preventDefault()
    var isThere = persons.reduce(
      (isThere,person)=> isThere || person.name == newName,false)

    if(isThere){
      window.alert(`${newName} is already added to the phonebook`)
    }
    else{
      if(newName!='') setPersons(persons.concat({name:newName}))
    }
    setNewName('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={saveName}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Name key={person.name} name={person.name}/>)}
    </div>
  )
}

export default App