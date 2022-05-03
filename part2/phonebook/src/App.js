import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import personsService from './services/service'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  /**For getting the people(persons) */
  useEffect(()=>{
    personsService
    .getAll()
    .then(response => {
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
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const person = search.find(p => p.name.toLocaleLowerCase() == newName.toLocaleLowerCase())
        const newPerson = {...person, number: newNumber}
        personsService.update(person.id, newPerson)
        .then(savedPerson => {
          setSearch(search.map(p => p.id != person.id ? p : savedPerson))
          setPersons(persons.map(p => p.id != person.id ? p : savedPerson))
          setMessage({message:`${newName} updated`,isError:false})
          setTimeout(() => {setMessage(null)},5000)
        })
        .catch(error=>{
          setMessage({
            message:`Information of ${person.name} has already been removed from server`,
            isError:true
          })
          setTimeout(() => {setMessage(null)},5000)
          setSearch(search.filter(p => p.id !=person.id))
          setPersons(persons.filter(p => p.id !=person.id))
        })
      }
    }else{
      if(newName!='') {
        const newPerson = {name:newName,number:newNumber,id:persons.length+1}
        personsService.create(newPerson)
        .then(savedPerson=>{
          console.log('No he tenido errores')
          setPersons(persons.concat(savedPerson))
          setSearch(persons.concat(savedPerson))
          setMessage({message:`${newName} created`,isError:false})
          setTimeout(() => {setMessage(null)},5000)
        })
        .catch(error=>{
          setMessage({
            message: error.response.data.error,
            isError:true
          })
          setTimeout(() => {setMessage(null)},5000)
          setSearch(search.filter(p => p.id !=newPerson.id))
          setPersons(persons.filter(p => p.id !=newPerson.id))
        })
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
      .catch(error=>{
        setMessage({
          message:`Information of ${person.name} has already been removed from server`,
          isError:true
        })
        setTimeout(() => {setMessage(null)},5000)
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
      <Notification message={message}/>
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