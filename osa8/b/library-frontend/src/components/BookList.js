import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "../queries"

const BookList = ({ show, genre, setGenre, filterButtons, bookList }) => {

  const resultForAll = useQuery(ALL_BOOKS)
  const result = useQuery(ALL_BOOKS, {
    variables: genre ? {genre: genre} : {}
  })
  console.log(result, genre)
  
  if (result.loading || resultForAll.loading) {
    return null
  }

  let genres = []
  const allBooks = resultForAll.data.allBooks
  const filteredBooks = result.data.allBooks

  console.log(filteredBooks)
  
  allBooks.forEach(b => {
    const filteredGenres = b.genres.filter(g => genres.indexOf(g) < 0)
    genres = genres.concat(filteredGenres)
  })

  const showFilterButtons = () => {
    if (filterButtons) {
      return (
        <div>
          {genres.map(g => <button key={Math.random() * 100} onClick={() => setGenre(g)}>{g}</button>)}
          <button onClick={() => setGenre(null)}>all genres</button>
        </div>
      )
    }
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          ))}
        </tbody>
      </table>
      {showFilterButtons()}
    </div>
  )
}

export default BookList