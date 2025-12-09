function AnswerSection({answer, guessedLetters, isGameLost, isGameWon}) {
    let answerTiles = answer.split('').map((letter, index) => {

        const showLetter = guessedLetters.includes(letter) || isGameLost || isGameWon

        let style = {}
        if (isGameWon) {
            style = {backgroundColor: 'green', color: 'white', borderColor: 'darkgreen'}
        } else if (isGameLost) {
            style = {backgroundColor: 'red', color: 'white', borderColor: 'darkred'}
        }
        return (
            <div key={index} className="answer-tile" style={style}>
                {showLetter && letter.toUpperCase()}
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