import './App.css'
import { useState } from 'react'
import { combinations } from './assets/CardDeck'

function App() {
    // TODO: make create game state
    const [gameDeck, setGameDeck] = useState(combinations)
    const [playerHand, setPlayerHand] = useState([])
    const [dealerHand, setDealerHand] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [result, setResult] = useState({type: "", message: ""})
    const [newGame, setNewGame] = useState(false)

    const getRandomCard =  () => {
        const randIdx = Math.floor(Math.random() * gameDeck.length)
        const card = gameDeck[randIdx]

        const newDeck = gameDeck.filter((_, idx) => idx !== randIdx)
        setGameDeck(newDeck)

        return card
    }

    const dealCardToPlayer = () => {
        const newHand = [...playerHand, getRandomCard()]
        setPlayerHand(newHand)
        const playerValue = calculateHandValue(newHand)

        if(playerValue > 21){
            handleGameOver({type: "dealer", message: "Bust! Dealer Wins"})
        } else if (playerValue === 21){
            handleGameOver({type: "player", message: "Congrats! You win."})
        }
        console.log(playerValue)
    }

    const setPlayerStand = () => {
        setGameOver(true)
        const newHand = [...dealerHand, getRandomCard()]
        setDealerHand(newHand)
        const dealerValue = calculateHandValue(newHand)
        if(dealerValue > 21){
            handleGameOver({type: "player", message: "Bust! Player Wins"})
        } else if (dealerValue === 21){
            //game 0over
        }
        console.log(dealerValue)
    }

    const calculateHandValue = (hand) => {
        let value = 0
        let aceCount = 0
        hand.forEach((card) => {
            if(card.rank === 'J' || card.rank === 'Q' || card.rank === 'K'){
                value += 10
            } else if (card.rank === 'A'){
                aceCount += 1
                value += 11
            } else {
                value += parseInt(card.rank)
            }
        });
        while(value > 21 && aceCount){
            value -= 10
            aceCount -= 1
        }

        return value
    }

    const handleGameOver = (result) => {
        setGameOver(true)
        setResult(result)
        setNewGame(true)
    }

    const resetGame = () => {
        
    }

    return (
        <div className="h-screen w-screen">
            <div className="blackjack-container mx-auto text-white p-4 bg-slate-700 h-[100%] w-[100%]">
                <h1 className="text-4xl text-center mb-4">
                    Black Jack
                </h1>
                {gameOver && (
                    <div className={`text-white ${result.type === 'player' ? "bg-green-700" : "bg-red-700"} font-bold rounded-md text-center mt-4 py-2`}>
                        <h2 className="text-2xl">{result.message}</h2>
                    </div>
                )}
                {!newGame ? (
                        <>
                            <button className="" onClick={dealCardToPlayer}>Hit</button>
                            <button className="" onClick={setPlayerStand}>Stand</button>
                        </>
                    ) : (
                        <button onClick={resetGame}>Reset</button>
                    )
                }
            </div>
        </div>
    )
}

export default App
