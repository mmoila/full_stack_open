import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const buttonHandler = (action) => {
    store.dispatch({
      type: action
    })
  }

  return (
    <div>
      <button onClick={() => buttonHandler("GOOD")}>good</button>
      <button onClick={() => buttonHandler("OK")}>ok</button>
      <button onClick={() => buttonHandler("BAD")}>bad</button>
      <button onClick={() => buttonHandler("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
