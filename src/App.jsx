import { useState } from 'react'
import './App.css'

// Resources / Utilities
import { getRandomWord } from './utils.js'
import { languages } from './languages.js'

// Components
import Header from './components/Header.jsx'
import LanguageList from './components/LanguageList.jsx'
import Status from './components/Status.jsx'
import AnswerSection from './components/AnswerSection.jsx'
import KeyboardSection from './components/KeyboardSection.jsx'

function App() {

    // States
    const [answer, setAnswer] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])

    // Derived values
    const isGameLost = checkIfGameLost(guessedLetters, answer)
    const isGameWon = checkIfGameWon(guessedLetters, answer)

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function checkIfGameLost(guessedLetters, answer) {
        const incorrectGuesses = guessedLetters.filter(letter => !answer.split('').includes(letter))
        return incorrectGuesses.length >= languages.length - 1 // "-1" because last language is Assembly and cannot be killed
    }

    function checkIfGameWon(guessedLetters, answer) {
        return answer.split('').every(letter => guessedLetters.includes(letter))
    }

    function handleNewGameClicked() {
        setAnswer(getRandomWord())
        setGuessedLetters([])
    }

    return (
    <>
        <Header />

        <Status 
            isGameLost={isGameLost} 
            isGameWon={isGameWon} />

        <LanguageList 
            languages={languages} 
            guessedLetters={guessedLetters} 
            answer={answer} />

        <AnswerSection 
            answer={answer} 
            guessedLetters={guessedLetters} 
            isGameLost={isGameLost} 
            isGameWon={isGameWon} />
  
        <KeyboardSection 
            alphabet={alphabet} 
            guessedLetters={guessedLetters} 
            answer={answer} 
            setGuessedLetters={setGuessedLetters} />

        <NewGameButton 
            onClick={handleNewGameClicked} />
    </>
  )
}

function NewGameButton({onClick}) {
    return (
        <button className="new-game-button" onClick={onClick}>
            New Game
        </button>
    )
}

export default App
