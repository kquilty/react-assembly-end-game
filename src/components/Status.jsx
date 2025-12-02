function Status({isGameLost, isGameWon}) {
    const statusText = isGameWon ? "You Won!" : isGameLost ? "You Lost!" : "In Progress"
    return (
        <section className="status-section">
            Status: {statusText}
        </section>
    )
}

export default Status