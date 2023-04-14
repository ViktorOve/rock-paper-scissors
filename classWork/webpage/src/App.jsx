import { useState, useEffect } from 'react'
import './App.css'

const computerOpponentUrl = "http://localhost:5051/rps"

function Button({text, fire}){
  return <button style={{backgroundColor: 'white', color: 'black', margin: 4}}
    onClick={fire}>{text}</button>
}

function App() {
  const [myGuess, setMyGuess] = useState('no guess yet')
  const [computerGuess, setComputerGuess] = useState('no guess yet')
  const [lastGuessTime, setLastGuessTime] = useState(new Date())

  let myGuessString = 'You have not guessed yet'
  if (myGuess != 'no guess yet') myGuessString = "You guessed "+myGuess

  let computerGuessString = "Computer has not guessed yet"
  if (computerGuess != "no guess yet") computerGuessString = "Computer guessed " + computerGuess

  let result = "It was a tie"
  if (myGuess == "no guess yet" || computerGuess == "no guess yet") result = ""
  if (
    (myGuess == 'rock' && computerGuess == "scissors") ||
    (myGuess == 'paper' && computerGuess == "rock") ||
    (myGuess == 'scissors' && computerGuess == "paper")
  ) result = "You won!"
  if (
    (myGuess == 'rock' && computerGuess == "paper") ||
    (myGuess == 'paper' && computerGuess == "scissors") ||
    (myGuess == 'scissors' && computerGuess == "rock")
  ) result = "The computer won!"

  useEffect(()=>{
    if (myGuess == "no guess yet") return;

    async function getComputerGuess(){
      const result = await fetch(computerOpponentUrl)
      const guess = await result.text()
      setComputerGuess(guess)
    }

    getComputerGuess()
  }, [myGuess, lastGuessTime])

  function setGuess(guess) {
    setMyGuess(guess)
    setLastGuessTime(new Date())
  }

  return (
    <div> 
      <h1>Welcome to rock paper scissors</h1>
      <div>{myGuessString}</div>
      <div>{computerGuessString}</div>
      <div>{result}</div>
      <Button text="rock" fire={()=>setGuess('rock')}/>
      <Button text="paper" fire={()=>{setGuess('paper')}}/>
      <Button text="scissors" fire={()=>{setGuess('scissors')}}/>

    </div>
  )
}

export default App
