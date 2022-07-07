import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/store"
import { setNotification } from "../reducers/notificationReducer"
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

  const addVote = (id) => {
    dispatch(vote(id))
    const message = `Vote added for "${anecdotes.find(a => a.id === id).content}"`
    dispatch(setNotification(message, 5))
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
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList