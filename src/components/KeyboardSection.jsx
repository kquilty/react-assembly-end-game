function KeyboardSection({alphabet, guessedLetters, answer, setGuessedLetters}) {

    return (
        <section className="keyboard-section">
            {alphabet.split('').map(letter => {
                
                let style =  'unguessed-letter' // default
                if (guessedLetters.includes(letter)) {
                    // If they guessed at this one...
                    style = answer.split('').includes(letter) 
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

export default KeyboardSection