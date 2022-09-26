import { useState } from 'react'
import GlobalStyle from './GlobalStyle'
import styled from 'styled-components'

export default function App() {

  const gallows = [
    './src/assets/forca0.png',
    './src/assets/forca1.png',
    './src/assets/forca2.png',
    './src/assets/forca3.png',
    './src/assets/forca4.png',
    './src/assets/forca5.png',
    './src/assets/forca6.png'
  ]
  const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X',
    'Y','Z'
  ]
  const [hangmanState, setHangmanState] = useState(gallows[0]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Hangman>
          <img src={hangmanState} />
          <ShowWord>
            <ChooseWord>Escolher Palavra</ChooseWord>
            <ul>
              <li>_</li>
              <li>_</li>
              <li>_</li>
              <li>_</li>
              <li>_</li>
              <li>_</li>
              <li>_</li>
              <li>_</li>
              <li>_</li>
              <li>_</li>
              <li>_</li>
            </ul>
          </ShowWord>
        </Hangman>
        <Keyboard>
          <ul>
            {alphabet.map((char, index) => <li key={index}>{char}</li>)}
          </ul>
        </Keyboard>
        <Guess>
          Já sei a palavra!
          <input></input>
          <button>Chutar</button>
        </Guess>
      </Container>
    </>

  )
}

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

const Hangman = styled.div`
  background-color: red;
  display: flex;
  justify-content: space-between;
  width: 720px;
  img{
    height: 480px;
    width: 400px;
  }
`
const ShowWord = styled.div`
  position: relative;
  background-color:aqua;
  ul{
    margin-top:400px;
  }
  li{
    display:inline;
    margin-right:10px;
    font-size:40px;
  }
`

const ChooseWord = styled.button`
  position: absolute;
  right:0;
  top:35px;
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  height: 40px;
  width: 150px;
  background-color: #2ab62a;
  cursor: pointer;
  transition: all 0.5s;
  &:hover{
    background-color: #26df26;
  }
`
const Keyboard = styled.div`
  margin: 20px;
  ul{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width:640px;
    height:100px;
  }
  li{
    margin: 3px;
    width: 40px;
    height: 40px;
    display: inline;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4571a4;
    font-weight: 600;
    font-size: larger;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 5px;
    background-color: #bce2ff;
    border: 1px solid #4571a4;
  }
`

const Guess = styled.div`
  font-family:'Arial', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  max-width: 900px;
  button{
    margin-left: 10px;
    border-radius: 5px;
    background-color: #bce2ff;
    font-weight: 600;
    border: 1px solid #4571a4;
    height: 40px;
    width: 80px;
    color: #4571a4;
    font-size: medium;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    input{
      box-shadow:inset 0.1px 0.1px 1px;
      border-radius: 3px;
      border: 2px solid #707070;
      height: 30px;
      margin-left: 10px;
      width: 50%;
      max-width: 720px;
    }
`