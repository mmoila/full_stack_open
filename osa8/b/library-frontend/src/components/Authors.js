import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import Select from "react-select"

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [selectedName, setSelectedName] = useState(null)
  const [born, setBorn] = useState("")
  console.log(result.data)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      props.setNotification({
        message: error.graphQLErrors[0].message,
        error: true
      })
      setTimeout(() => {
        props.setNotification({message: null, error: false})
      }, 5000);
    }
  })

  if (!props.show || result.loading) {
    return null
  }

  const setBirth = (event) => {
    event.preventDefault()
    
    editAuthor( {variables: {name: selectedName.value, setBornTo: parseInt(born)}} )
    setSelectedName(null)
    setBorn("")
  }

  const authors = result.data.allAuthors
  const options = authors.map(a => ({value: a.name, label: a.name}))
  console.log(options)
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={setBirth}>
        name
        <Select
        value={selectedName}
        onChange={setSelectedName}
        options={options}
        />
        <br/>
        born
        <input
          type="text"
          value={born}
          onChange={({target}) => setBorn(target.value)}
        />
        <br/>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
