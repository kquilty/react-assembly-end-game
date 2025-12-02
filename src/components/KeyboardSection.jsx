function KeyboardSection({alphabet, guessedLetters, answer, handleLetterGuess}) {

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