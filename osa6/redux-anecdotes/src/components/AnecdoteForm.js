import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/store"
import { createNotification, hideNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    dispatch(newAnecdote(event.target.anecdoteContent.value))
    dispatch(createNotification("New anecdote created!"))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000);
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