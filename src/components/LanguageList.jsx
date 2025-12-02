function LanguageList({languages, guessedLetters, answer}) {
    
    const incorrectGuesses = guessedLetters.filter(letter => !answer.split('').includes(letter))

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

export default LanguageList