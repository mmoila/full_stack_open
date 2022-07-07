import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async (content) => {
  const data = {
    content,
    id: getId(),
    votes: 0
  }
  const response = await axios.post(baseUrl, data)
  return response.data
}

const addVote = async id => {
  const url = `${baseUrl}/${id}`
  const anecdote = await (await axios.get(url)).data
  const response = await axios.put(url, {...anecdote, votes: anecdote.votes + 1})
  return response.data
}


const anecdoteService = { getAll, addNew, addVote }
export default anecdoteService