import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/store"
import { createNotification, hideNotification } from "../reducers/notificationReducer"
import Filter from "./Filter"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state =>
    state.anecdotes
    .filter(anecdote => 
      anecdote.content
      .toLowerCase()
      .indexOf(state.filter.toLowerCase()) !== -1
    )
  )

  const vote = (id) => {
    dispatch(addVote(id))
    dispatch(createNotification(`Vote added for "${anecdotes.find(a => a.id === id).content}"`))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000);
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <div>
        <Filter />
      </div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList