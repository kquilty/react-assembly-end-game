import { useState, useEffect } from 'react'
import './App.css'

// Resources / Utilities
import { getFarewellText, getRandomWord } from './utils.js'
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
    const [gameStatus, setGameStatus] = useState('in-progress') // 'in-progress', 'won', 'lost'

    // Effects
    useEffect(() => {
        console.log("The answer is:", answer)
    }, [answer])

    // Derived values
    const isGameLost = checkIfGameLost(guessedLetters, answer)
    const isGameWon = checkIfGameWon(guessedLetters, answer)

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function checkIfGameLost(guessedLetters, answer) {
        const incorrectGuesses = getIncorrectGuesses(guessedLetters, answer)
        return incorrectGuesses.length >= languages.length - 1 // "-1" because last language is Assembly and cannot be killed
    }

    function getIncorrectGuesses(guessedLetters, answer) {
        return guessedLetters.filter(letter => !answer.split('').includes(letter))
    }

    function checkIfGameWon(guessedLetters, answer) {
        return answer.split('').every(letter => guessedLetters.includes(letter))
    }

    function handleNewGameClicked() {
        setAnswer(getRandomWord())
        setGuessedLetters([])
        setGameStatus('')
    }

    function handleLetterGuess(letter) {
        if (guessedLetters.includes(letter)) {
            console.log("Letter already guessed:", letter)
            return // Ignore repeat guesses
        }

        const newGuessedLetters = [...guessedLetters, letter]

        // Accept the guess
        setGuessedLetters(newGuessedLetters)

        // Update game status
        if (checkIfGameWon(newGuessedLetters, answer)) {
            setGameStatus('You Won!')
        } else if (checkIfGameLost(newGuessedLetters, answer)) {
            setGameStatus('You Lost!')
        } else {
            const isCorrectGuess = answer.split('').includes(letter)
            if(!isCorrectGuess) {
                const incorrectGuesses = getIncorrectGuesses(newGuessedLetters, answer)
                const doomedLanguage = languages[incorrectGuesses.length - 1].name
                setGameStatus(getFarewellText(doomedLanguage))
            } else {
                setGameStatus('')
            }
        }
            
    }

    return (
    <>
        <Header />

        <Status 
            gameStatus={gameStatus} />

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
            handleLetterGuess={handleLetterGuess} />

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
