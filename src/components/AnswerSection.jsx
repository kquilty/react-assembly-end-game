function AnswerSection({answer, guessedLetters, isGameLost, isGameWon}) {
    let answerTiles = answer.split('').map((letter, index) => {

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

export default AnswerSection