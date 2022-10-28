import BookList from "./BookList"
import { GET_ME } from "../queries"
import { useQuery } from "@apollo/client"

const Recommendations = (props) => {

  const result = useQuery(GET_ME, {
    skip: !props.show
  });

  if (!props.show || result.loading) {
    return null
  }

  const genre = result.data.me.favoriteGenre

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <b>{genre}</b></p>
      <BookList 
        show={props.show} 
        genre={genre} 
        filterButtons={false}
      />
    </div>
  )
}

export default Recommendations