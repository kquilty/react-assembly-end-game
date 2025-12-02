import { useState } from 'react'
import './App.css'
import {getRandomWord} from './utils.js'
import { languages } from './languages.js'

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
        const incorrectGuesses = guessedLetters.filter(letter => !answer.toUpperCase().split('').includes(letter))
        return incorrectGuesses.length >= languages.length - 1 // "-1" because last language is Assembly and cannot be killed
    }

    function checkIfGameWon(guessedLetters, answer) {
        return answer.toUpperCase().split('').every(letter => guessedLetters.includes(letter))
    }

    function handleNewGameClicked() {
        setAnswer(getRandomWord())
        setGuessedLetters([])
    }

    return (
    <>
        <Header />

        <Status isGameLost={isGameLost} isGameWon={isGameWon} />

        <LanguageList languages={languages} guessedLetters={guessedLetters} answer={answer} />

        <AnswerSection answer={answer} guessedLetters={guessedLetters} isGameLost={isGameLost} isGameWon={isGameWon} />
  
        <KeyboardSection 
            alphabet={alphabet} 
            guessedLetters={guessedLetters} 
            answer={answer} 
            setGuessedLetters={setGuessedLetters}
        />

        <NewGameButton onClick={handleNewGameClicked} />
    </>
  )
}

function Header() {
    return (
        <header className="app-header">
          <h1>React Assembly: The End Game</h1>
          <p>Guess the word to keep the world safe from having to program everything in Assembly!</p>
        </header>
    )
}

function Status({isGameLost, isGameWon}) {
    const statusText = isGameWon ? "You Won!" : isGameLost ? "You Lost!" : "In Progress"
    return (
        <section className="status-section">
            Status: {statusText}
        </section>
    )
}

function LanguageList({languages, guessedLetters, answer}) {
    
    const incorrectGuesses = guessedLetters.filter(letter => !answer.toUpperCase().split('').includes(letter))

    const languageTiles = languages.map((language, i) => {

        const isDead = (i < incorrectGuesses.length)
        const className = (isDead ? "dead-language-tile dead" : "living-language-tile")

        return <div 
            key={language.name} 
            className={className} 
            style={{backgroundColor: language.backgroundColor, color: language.color}}
        >
            {language.name}
        </div>
    })
    return (
        <section className="language-list-section">
            {languageTiles}
        </section>
    )
}

function AnswerSection({answer, guessedLetters, isGameLost, isGameWon}) {
    let answerTiles = answer.toUpperCase().split('').map((letter, index) => {

        const showLetter = guessedLetters.includes(letter) || isGameLost || isGameWon

        return (
            <div key={index} className="answer-tile">
                {showLetter && letter}
            </div>
        )
    })
    return (
        <section className="answer-section">
            {answerTiles}
        </section>
    )
}

function KeyboardSection({alphabet, guessedLetters, answer, setGuessedLetters}) {

    return (
        <section className="keyboard-section">
            {alphabet.toUpperCase().split('').map(letter => {
                
                let style =  'unguessed-letter' // default
                if (guessedLetters.includes(letter)) {
                    // If they guessed at this one...
                    style = answer.toUpperCase().split('').includes(letter) 
                        ? 'guessed-correctly-letter' 
                        : 'guessed-incorrectly-letter'
                }

                return <button 
                    key={letter} 
                    className={style}
                    onClick={() => {
                        handleLetterGuess(letter, guessedLetters, setGuessedLetters)
                    }}
                >
                    {letter.toUpperCase()}
                </button>
            })}
        </section>
    )
}

function handleLetterGuess(letter, guessedLetters, setGuessedLetters) {
    console.log("Guessed letter:", letter)

    if (guessedLetters.includes(letter)) {
        console.log("Letter already guessed:", letter)
        return // Ignore repeat guesses
    }

    // Accept the guess
    setGuessedLetters([...guessedLetters, letter])
}

function NewGameButton({onClick}) {
    return (
        <button className="new-game-button" onClick={onClick}>
            New Game
        </button>
    )
}

export default App
