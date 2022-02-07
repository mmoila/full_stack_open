import React, { useState, useEffect } from 'react'
import phoneBookService from './phoneBookService'

const Filter = ({filterValue, handleFilterInput}) => (
  <div>
    <label>
      filter shown with:
    </label>
    <input value={filterValue} onChange={handleFilterInput} />
  </div>
)


const PersonForm = (props) => (
  <form>
    <label>name: </label>
    <input value={props.newName} onChange={props.handleNameInput} /><br />
    <label>number: </label>
    <input value={props.newNumber} onChange={props.handleNumberInput} /><br />
    <button type="submit" onClick={props.submitNewPerson}>add</button>
  </form>

)


const PhoneBook = ({persons, filterValue, deletePerson}) => {

  const filterPersons = (persons, filterValue) => {
    if (filterValue === "") {
      return persons
    }
    return persons.filter(p =>
      p.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1)
  } 

  persons = filterPersons(persons, filterValue)

  return (
    <tbody>
      {persons.map(person => 
        <tr key={person.name}>
          <td>{person.name}</td>
          <td>{person.number}</td>
          <td><button onClick={() => deletePerson(person)}>delete</button></td>
        </tr>
      )}
    </tbody>
  )
}

const Notification = ({ message, error }) => {
  const notificationStyle = {
    marginBottom: 20, 
    padding: 10,
    fontSize: 26,
    font: "italic", 
    color: error ? "red": "green",
    backgroundColor: "lightgrey",
    border: "solid",
    borderColor: error ? "red": "green"
  }

  if (message === "") {
    return null
  }

  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [notification, setNotification] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(response => {
        console.log(response);
        setPersons(response)
      })
  }, [])

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    setFilterValue(event.target.value)
  }

  const deletePerson = (person) => {
    if (window.confirm("Do you really want to delete this contact?")) {
      phoneBookService.removeContact(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        setNotification(`${person.name} deleted from phonebook.`)
        setTimeout(() => setNotification(""), 5000)
      })
      .catch(error => {
        setError(true)
        setNotification(`${person.name} already deleted from phonebook.`)
        setTimeout(() => {
          setNotification("")
          setError(false)
        }, 5000)
      }
        
      )
    }
  }

  const updateNumber = (id, newPerson) => {
    if (window.confirm(`${newPerson.name} already in phonebook. Replace the number with new one?`)) { 
      phoneBookService.updateContact(id, newPerson).then(contact => {
        setPersons(persons.map(person => person.id !== contact.id ? person : contact))
        setNotification(`${contact.name}'s number updated to phonebook.`)
        setTimeout(() => setNotification(""), 5000)
      })
    } 
  }

  const submitNewPerson = (event) => {
    event.preventDefault()

    let unique = true
    const newPerson = {
      name: newName,
      number: newNumber
    }

    persons.forEach(person => {
      if (person.name === newName) {
        updateNumber(person.id, newPerson)
        unique = false
      }
    })
    if (unique) {
      phoneBookService
        .addNew(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`${returnedPerson.name} added to phonebook.`)
          setTimeout(() => setNotification(""), 5000)
        })
    }

    setNewNumber("")
    setNewName("")
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <Notification message={notification} error={error} />
        <Filter filterValue={filterValue} handleFilterInput={handleFilterInput}/>
      <h2>Add new</h2>
        <PersonForm newName={newName} handleNameInput={handleNameInput} 
          newNumber={newNumber} handleNumberInput={handleNumberInput} 
          submitNewPerson = {submitNewPerson}
        />
      <h2>Numbers</h2>
      <table>
        <PhoneBook persons={persons} filterValue={filterValue} deletePerson={deletePerson} />
      </table>
    </div>
  )

}

export default App