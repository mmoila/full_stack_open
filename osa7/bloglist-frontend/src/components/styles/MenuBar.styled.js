import styled from "styled-components"
import MenuBar from "../MenuBar"


const StyledMenuBar = styled(MenuBar)`
  display: flex;
  justify-content: space-between;
  background-color: #ADD8E6;
  padding: 1em;
  height: 60px;
  align-items: center;
  margin-bottom: 50px;
  min-width: 300px;

  #links {
    display: flex;
    justify-content: space-between;
    min-width: 90px;
  }

  #links > * {
    text-decoration: none;
    padding: 5px;
    color: black;
    font-size: 20px;
  }
  

  #loginInfo {
    display: flex;
    min-width: 120px;
    justify-content: space-between;

    p {
      margin-right: 1em;
    }
  }

  h2 {
    display: inline-block;
    margin-bottom: 2em;
    margin-right: 5px;
    color: #FFFFF0;
  }

`

export default StyledMenuBar