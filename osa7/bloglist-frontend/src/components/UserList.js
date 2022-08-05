import { Link } from "react-router-dom"

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table id="userList">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number of blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  )
}

export default UserList
