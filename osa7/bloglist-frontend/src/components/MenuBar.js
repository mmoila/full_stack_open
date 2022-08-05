import { Link } from "react-router-dom"

const MenuBar = ({ className, user, handleLogout }) => {

  return (
    <div className={className}>
      <h2>blogs</h2>
      <div id="links">
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
      </div>
      <div id="loginInfo">
        <p>user {user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default MenuBar
