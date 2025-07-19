export default function Die(props) {
    const actifStyles ={
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }

    return (
    <button 
    style={actifStyles}
    onClick={props.holdDice}
    aria-pressed={props.isHeld}
    aria-label={`Die with value ${props.value},${props.isHeld ? "held" : "not held"}`}
    className="die">
        <span>{props.value}</span>
    </button>
    )
}