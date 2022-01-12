import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, operation}) => {
  return (
    <button onClick={operation}>
      {text}
    </button>
  )
}

const Anecdote = ({anecdotes, votes, selected}) => <p>{anecdotes[selected]} <br />has {votes[selected]} votes </p>
   
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const setRandomSelected = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNum)
  }

  const setNewVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdotes={anecdotes} votes={votes} selected={selected} />
      <Button text="vote" operation={() => setNewVote()} />
      <Button text="next anecdote" operation={() => setRandomSelected()} />
      <Header text="Anecdote with most votes" />
      <Anecdote anecdotes={anecdotes} votes={votes} selected={votes.indexOf(Math.max(...votes))}/>
    </div>

  )
}

export default App
