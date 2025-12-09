function KeyboardSection({alphabet, guessedLetters, answer, handleLetterGuess, isGameLost, isGameWon}) {

    return (
        <section className="keyboard-section">
            {alphabet.split('').map(letter => {
                
                let className =  'unguessed-letter' // default
                if (guessedLetters.includes(letter)) {
                    // If they guessed at this one...
                    className = answer.split('').includes(letter) 
                        ? 'guessed-correctly-letter' 
                        : 'guessed-incorrectly-letter'
                }

                const style = {
                    cursor: isGameLost || isGameWon ? 'not-allowed' : 'pointer'
                }

                return <button 
                    key={letter} 
                    className={className}
                    style={style}
                    disabled={isGameLost || isGameWon || guessedLetters.includes(letter)}
                    onClick={() => {
                        handleLetterGuess(letter)
                    }}
                >
                    {letter.toUpperCase()}
                </button>
            })}
        </section>
    )
}

export default KeyboardSection