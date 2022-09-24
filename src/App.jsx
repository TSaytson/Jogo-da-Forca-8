import { useState } from 'react'
import GlobalStyle from './GlobalStyle'
import styled from 'styled-components'

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Hangman>
          <img src='./src/assets/forca0.png' />
          <Button>Escolher Palavra</Button>
        </Hangman>
        <Keyboard>
          <li>A</li>
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
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Hangman = styled.div`
  background-color: red;
  display: flex;
  justify-content: space-between;
  max-width: 1280px;
  img{
    height: 400px;
    width: 300px;
  }
`
const Button = styled.button`
  margin-top: 35px;
  color: #fff;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  height: 40px;
  width: 150px;
  background-color: #2ab62a;
`
const Keyboard = styled.ul`
  margin: 80px;
  width: 500px;
  li{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c6c74;
    font-weight: 600;
    font-size: larger;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 10px;
    height: 50px;
    width: 50px;
    background-color: #a5a9ba;
  }
`
const Guess = styled.div`
  font-family:'Arial', sans-serif;
  margin-left: 120px;
  background-color: green;
  width: 80%;
  max-width: 1050px;
  button{
    margin-left: 10px;
    border-radius: 5px;
    background-color: #d9eaff;
    font-weight: 600;
    border: 2px solid #c0c9f8;
    height: 40px;
    width: 80px;
    color: #5c79ca;
    font-size: medium;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    input{
      box-shadow:inset 0.1px 0.1px 1px;
      border-radius: 3px;
      border: 2px solid #9299be89;
      height: 30px;
      margin-left: 10px;
      width: 60%;
      max-width: 800px;
    }
`