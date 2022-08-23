import { useApolloClient, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import {StyledNotification} from './components/Notification'
import { updateCache } from './utilities/helpers'

import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState({message: null, error: false})
  const client = useApolloClient()

  useEffect(() => {
    const userToken = localStorage.getItem("user-token")
    if (userToken !== null) {
      setToken(userToken)
    }
  }, [])

  const logout = () => {
    console.log("loggin out")
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("login")
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(`subscription data: ${JSON.stringify(subscriptionData)}`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token == null
          ? <button onClick={() => setPage("login")}>login</button>
          : (
          <div style={{display: "inline"}}>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage("recommendations")}>recommend</button>
            <button onClick={logout}>logout</button>
          </div>
          )
        }
      </div>


      <StyledNotification 
        message={notification.message} 
        error={notification.error} 
      /> 

      <Authors show={page === 'authors'} setNotification={setNotification}/>

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setNotification={setNotification} />

      <LoginForm 
        show={page === "login"} 
        setToken={setToken} 
        setNotification={setNotification} 
        setPage={setPage}
      />

      <Recommendations show={page === "recommendations"} />

    </div>
  )
}

export default App
