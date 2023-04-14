import { useState, useEffect } from 'react'
import {Button} from './Button.jsx'
import './App.css'

const computerUrl = 'http://localhost:5050/rps'

function App() {
  const [myGuess, setMyGuess] = useState()
  const [computerGuess, setComputerguess] = useState()
  const [lastRequestTime, setLastRequestTime] = useState(new Date())

  let guessString = "You haven't made a guess, that's not a winning move."
  if (myGuess == 'rock') guessString = 'You guessed the mighty rock, nothing beats rock!'
  if (myGuess == 'paper') guessString = 'You guessed wise old paper, that just might cover it!'
  if (myGuess == 'scissors') guessString = 'You guessed scissors, a very sharp move!'



  useEffect(
    ()=>  {
      if (myGuess == null) return;

      async function getComputerGuess() {
        const computerGuess = await (await fetch(computerUrl)).json()
        setComputerguess(computerGuess.text)
      }
      getComputerGuess()
    },
    [myGuess, lastRequestTime]
  )

  let computerGuessString = "The computer hasn't played yet."
  if (computerGuess == 'rock') computerGuessString = 'The computer foolish picked the blunted rock.'
  if (computerGuess == 'paper') computerGuessString = 'The computer tried to smother us with paper.'
  if (computerGuess == 'scissors') computerGuessString = 'The computer tried to sneak scissors past us.'

  let result = "It was a tie"
  if (myGuess == null || computerGuess == 'null') result = ""
  if (
    (myGuess === "rock" && computerGuess === 'scissors') ||
    (myGuess === "paper" && computerGuess === 'rock') ||
    (myGuess === "scissors" && computerGuess === 'paper') 
  ) {
    result = "You won!"
  }

  if (
    (myGuess === "rock" && computerGuess === 'paper') ||
    (myGuess === "paper" && computerGuess === 'scissors') ||
    (myGuess === "scissors" && computerGuess === 'rock') 
  ) {
    result = "You lost :("
  }

  function setGuess(guess){
    setMyGuess(guess)
    setLastRequestTime(new Date())
  }

  return (
    <div className="App">
      <h1>Welcome to Rock Paper Scissors!</h1>
      <div>{guessString}</div>
      <div>{computerGuessString}</div>
      <div>{result}</div>
      <Button text="rock" onClick={()=>setGuess('rock')}/>
      <Button text="paper" onClick={()=>setGuess('paper')}/>
      <Button text="scissors" onClick={()=>setGuess('scissors')}/>
    </div>
  )
}

export default App
