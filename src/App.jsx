import Die from "./components/Die"
import {useState, useRef, useEffect} from "react"
import { nanoid } from "nanoid"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default function App() {
    const [dieObjects, setDieObjects] = useState(() => generateAllNewDice(10))
	const [rollsCount, setRollsCount] = useState(0)
	const dice = dieObjects.map((die)=><Die key={die.id} value={die.number} isHeld={die.isHeld} holdDice={() => handleHoldDie(die.id)}/>)
	// Check if all button are held and if all buttons have the same number to check if the game is won
	let gameWon = dieObjects.every((die)=> (die.isHeld) && (die.value === dieObjects[0].value));
	const { width, height } = useWindowSize()
	const focusOnNewGame = useRef(null)

	useEffect(()=>(
		focusOnNewGame.current.focus()
	),[gameWon])

	if(gameWon) {
        console.log("Game won")
    }

	function handleNewGame() {
		gameWon = false
		setRollsCount(0)
		setDieObjects(generateAllNewDice(10))
	}

	function handleRoll() {
		setDieObjects((prev) => prev.map(prevObj=>(!prevObj.isHeld ?{...prevObj, number: Math.floor(Math.random() * 6) + 1}:prevObj)))
		setRollsCount(prev=>prev+1)
		console.log(`rolls count: ${rollsCount+1}`)
	}

	function generateAllNewDice(size) {
        return Array.from({ length: size }, () => ( 
			{number: Math.floor(Math.random() * 6) + 1,
			isHeld: false,
			id: nanoid()
			}
		));
    }

	function handleHoldDie(key){
		// set the new dieObjects by taking the old array and replacing the one object with same key and return the final array
		console.log(`Die with id ${key} pressed`)
		setDieObjects(prev =>(prev.map(prevObject =>(
			prevObject.id === key ? {
			...prevObject,
			isHeld: !prevObject.isHeld
			} : prevObject
		))))
	}
	
    console.log(dieObjects)

	return (
		<main>
			{gameWon && <Confetti
                width={width}
                height={height}
				gravity={0.4}
            />}
			<div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>

			<h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
			<div className="dice-container">
				{dice}
			</div>

			<h2>Rolls Count: {rollsCount}</h2>

			<button ref={focusOnNewGame} className="roll-button" onClick={!gameWon? handleRoll:handleNewGame}>  
				<span>{gameWon ?"New Game":"Roll"}</span>
			</button>
		</main>
    )
}