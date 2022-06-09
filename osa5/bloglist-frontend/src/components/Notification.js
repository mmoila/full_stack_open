const Notification = ({ message, error }) => {
  const notificationStyle = {
    marginBottom: 20, 
    padding: 10,
    fontSize: 26,
    font: "italic", 
    color: error ? "red": "green",
    backgroundColor: "lightgrey",
    border: "solid",
    borderColor: error ? "red": "green"
  }

  if (!message) {
    return null
  }

  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification