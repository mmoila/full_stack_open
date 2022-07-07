import { connect } from "react-redux"

const Notification = (props) => {
  const notification = props.notification
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification