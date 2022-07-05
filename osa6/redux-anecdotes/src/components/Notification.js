import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const style = {
    display: notification.visible ? "" : "none",
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      <p>{notification.message}</p>
    </div>
  )
}

export default Notification