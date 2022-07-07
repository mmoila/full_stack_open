import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      state.push(action.payload) 
      console.log(state)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdote = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      return (
        state
          .map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
          .sort((a, b) => b.votes - a.votes)
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { newAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.addNew(content)
    dispatch(newAnecdote(anecdote))
  }
}

export const vote = id => {
  return async dispatch => {
    const anecdote = await anecdoteService.addVote(id)
    dispatch(addVote(anecdote.id))
  }
}

export default anecdoteSlice.reducer
