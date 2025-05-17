import './App.css'
import { useState } from 'react'
import { combinations } from './assets/CardDeck'

function App() {
    // TODO: make create game state
    const [gameDeck, setGameDeck] = useState(combinations)

    const getRandomCard =  () => {
        const randIdx = Math.floor(Math.random() * gameDeck.length)
        const card = gameDeck[randIdx]
    }
    
    return (
        <div className="h-screen w-screen">
            <div className="blackjack-container mx-auto text-white p-4 bg-slate-700 h-[100%] w-[100%]">
                <h1 className="text-4xl text-center mb-4">
                    Blackjack
                </h1>
            </div>
        </div>
    )
}

export default App
