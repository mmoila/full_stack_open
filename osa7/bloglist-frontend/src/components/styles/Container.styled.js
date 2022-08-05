import styled from "styled-components"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: 200px;
  

  button {
    background-color: white;
    color: black;
    border: 2px solid black;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
  }

  button:hover {
    background: LightGray;
  }

  a {
    margin-top: 15px;
    text-decoration: none;
    font-size: 20px;
  }
`

export default StyledContainer