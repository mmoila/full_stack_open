import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/store"
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdoteContent.value))
    event.target.anecdoteContent.value = ""
    dispatch(setNotification("New anecdote added.", 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdoteContent'/></div>
        <button type="submit">create</button>
      </form>
    </div>
    
  )
}

export default AnecdoteForm