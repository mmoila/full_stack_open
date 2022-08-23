import BookList from "./BookList"
import { useState } from "react"


const Books = (props) => {
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{genre == null ? "all" : genre}</b></p>
      <BookList 
        show={props.show} 
        genre={genre} 
        setGenre={setGenre}
        filterButtons={true}
      />
    </div>
  )
}

export default Books
