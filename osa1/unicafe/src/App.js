import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = ({text, value, mark}) => <tr><td>{text} {value} {mark}</td></tr>

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.good} /> 
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="average" value={props.average} />
        <StatisticsLine text="positive" value={props.positive} mark="%" />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const setToGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const setToNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const setToBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const calcAverage = () => {
    let avg = (good - bad) / all;
    if (isFinite(avg)) {
      return avg
    } 
    return ""
  }

  const calcPositivePercentage = () => {
    let percentage = good / all * 100;
    if (isFinite(percentage)) {
      return percentage
    }
    return ""
  } 

  return (
    <>
      <Header text="give feedback"/>
      <div id="buttons">
        <Button text="good" handleClick={() => setToGood()}/>
        <Button text="neutral" handleClick={() => setToNeutral()}/>
        <Button text="bad" handleClick={() => setToBad()}/>
      </div>
      <Header text="statistics"/>
      <Statistics all={all} good={good} neutral={neutral} bad={bad} average={calcAverage()}
       positive={calcPositivePercentage()}/>
    </>
  )
}

export default App