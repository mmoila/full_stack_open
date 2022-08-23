import styled from "styled-components"

const Notification = ({className, message, error}) => {
  if (!message) {
    return (null)
  }

  return (
    <div className={className}>
      <p>{message}</p>
    </div>
  )
}

export default Notification

export const StyledNotification = styled(Notification)`
  color: ${props => props.error ? "red" : "green"};
  padding: 5px;
  border: solid;
  border-color: black;
`


