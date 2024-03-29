import { useState } from 'react'
import GlobalStyle from './GlobalStyle'
import styled from 'styled-components'
import forca0 from './assets/forca0.png'
import forca1 from './assets/forca1.png'
import forca2 from './assets/forca2.png'
import forca3 from './assets/forca3.png'
import forca4 from './assets/forca4.png'
import forca5 from './assets/forca5.png'
import forca6 from './assets/forca6.png'

import palavras from './palavras'

export default function App() {

  const newgameMessage = 'Clique em "Escolher Palavra" para iniciar um novo jogo';
  const loss = 6;

  const gallows = [
    forca0,
    forca1,
    forca2,
    forca3,
    forca4,
    forca5,
    forca6
  ]
  const alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z'
  ]
  const keyboard = {
    able: {
      color: '#4571a4',
      backgroundColor: '#bce2ff'
    },
    disabled: {
      color: '#5b6b7e',
      backgroundColor: '#97abbb'
    }
  }

  const [gameState, setGameState] = useState(keyboard.disabled);

  const [lifes, setLifes] = useState(0);
  const [won, setWon] = useState(false);
  const [hangmanState, setHangmanState] = useState(gallows[lifes]);

  const [word, setWord] = useState([]);
  const [tip, setTip] = useState([]);
  const [charsPressed, setCharsPressed] = useState([]);
  const [input, setInput] = useState('');
  const [inputState, setInputState] = useState('disabled');

  function startGame() {
    const randomWord = palavras[Math.floor(Math.random() * 201)];
    const wordArray = [];
    const underlineArray = [];

    for (let i = 0; i < randomWord.length; i++) {
      wordArray.push(randomWord[i]);
      underlineArray.push('_');
    }
    setInput('');
    setWord(wordArray);
    setGameState(keyboard.able);
    setTip(underlineArray);
    setHangmanState(gallows[0]);
    setLifes(0);
    setWon(false);
    setInputState('');
    setCharsPressed([]);
    console.log('wordArray:', wordArray);
  }

  function verifyLoss(lifes) {
    if (lifes === loss) {
      console.log('vidas', lifes);
      setGameState(keyboard.disabled);
      setTip([...word]);
      setWord([]);
      setHangmanState(gallows[lifes]);
      setInputState('disabled');
      setCharsPressed([]);
      alert('Você perdeu! ' + newgameMessage);
      return true;
    }
    return false;
  }

  function verifyWin(lifes, verifyArray) {
    const stringWord = word.join('');
    const stringVerifyArray = verifyArray.join('');
    console.log(stringVerifyArray);
    if ((lifes !== loss) && (stringVerifyArray === stringWord)) {
      setWon(true);
      setGameState(keyboard.disabled);
      setTip([...word]);
      setWord([]);
      setInputState('disabled');
      setCharsPressed([]);
      alert('Parabéns, você acertou! ' + newgameMessage);
      return (true);
    }
    return false;
  }

  function guess() {
    const verifyArray = input.split(' ');
    if (!verifyWin(lifes, verifyArray)) {
      setLifes(loss);
      verifyLoss(loss);
    }
  }

  function checkGame() {
    if (lifes === loss || won || !word.length)
      return false;
    return true;
  }

  function verifyChar(char) {
    if (charsPressed.includes(char) && charsPressed.length)
      alert('tecla já pressionada');
    const verifyArray = [...tip];
    let normalizeWord = [...word];
    normalizeWord = normalizeWord.join('');
    console.log(normalizeWord);
    normalizeWord = normalizeWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    normalizeWord = normalizeWord.split('');
    console.log(verifyArray);
    console.log(normalizeWord);
    if (!verifyLoss(lifes)) {
      console.log(char);
      console.log(word.includes(char));
      if (normalizeWord.includes(char)) {
        normalizeWord.map((charWord, index) => char === charWord ? verifyArray[index] = word[index] : '');
        console.log(verifyArray);
        setTip(verifyArray);
        setCharsPressed([...charsPressed, char]);
      } else if (!charsPressed.includes(char)) {
          setLifes(lifes + 1);
          setHangmanState(gallows[lifes + 1]);
          setCharsPressed([...charsPressed, char]);
      }
    }
    verifyLoss(lifes + 1);
    verifyWin(lifes + 1, verifyArray);
  }
  return (
    <>
      <GlobalStyle />
      <Container>
        <Hangman>
          <img src={hangmanState} />
          <ShowWord lifes={lifes} state={won}>
            <ChooseWord onClick={startGame}>Escolher Palavra</ChooseWord>
            <ul>
              {tip.map((char, index) => <li key={index}>{char}</li>)}
            </ul>
          </ShowWord>
        </Hangman>
        <Keyboard state={gameState} disabledKeys={charsPressed}>
          <ul>
            {alphabet.map((char, index) =>
              <li 
                key={index}
                onClick={() =>
                  (checkGame()) ? verifyChar(char) : alert(newgameMessage)}>
                {char.toUpperCase()}
              </li>)}
          </ul>
        </Keyboard>
        <Guess state={gameState} inputState={inputState}>
          Já sei a palavra!
          <input type='text'
            onChange={(e) => setInput(e.target.value)}
            value={input}
            disabled={inputState}></input>
          <button onClick={() =>
            (checkGame()) ? guess() : alert(newgameMessage)}>Chutar</button>
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
  display: flex;
  justify-content: space-between;
  width: 760px;
  img{
    height: 480px;
    width: 400px;
  }
`
const ShowWord = styled.div`
  position: relative;
  width: 360px;
  ul{
    position: absolute;
    right:0;
    margin-top:400px;
  }
  li{
    color: ${(props) => props.lifes === 6 ? 'red' : props.state ? 'green' : 'black'};
    display:inline;
    font-family:'Arial';
    font-weight: 600;
    margin-right:2px;
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
    color: ${(props) => (props.state.color)};
    font-weight: 600;
    font-size: larger;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 5px;
    background-color: ${(props) => (props.state.backgroundColor)};
    border: 1px solid ${(props) => (props.state.color)};
    cursor: ${(props) => props.state.color === '#4571a4' ? 'pointer' : 'not-allowed'};
    transition: all 0.5s;
    &:hover{
      background-color:${(props) =>
    (props.state.color === '#4571a4' &&
      !props.disabledKeys.includes(props.chars)) ? '#cce8fd' : props.state.backgroundColor};
      color:${(props) => props.state.color === '#4571a4' ? '#5c8bc1' : props.state.color};
      border: 1px solid ${(props) => props.state.color === '#4571a4' ? '#70b2fe' : props.state.color};
    }
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
    background-color: ${(props) => (props.state.backgroundColor)};
    font-weight: 600;
    border: 1px solid ${(props) => (props.state.color)};
    height: 40px;
    width: 80px;
    color: ${(props) => (props.state.color)};
    font-size: medium;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    cursor: ${(props) => props.state.color === '#4571a4' ? 'pointer' : 'not-allowed'};
    transition: all 0.5s;
    &:hover{
      background-color:${(props) => props.state.color === '#4571a4' ? '#cce8fd' : props.state.backgroundColor};
      color:${(props) => props.state.color === '#4571a4' ? '#5c8bc1' : props.state.color};
      border: 1px solid ${(props) => props.state.color === '#4571a4' ? '#70b2fe' : props.state.color};
    }
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