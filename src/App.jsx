import './App.css'
import { useState, useEffect } from 'react'
import { imgCombos } from './assets/CardDeck'
import BlackjackButton from './components/BlackjackButton'
import Hand from './components/Hand'
import AlertBar from './components/AlertBar'

function App() {
    const [gameDeck, setGameDeck] = useState(imgCombos)
    const [playerHand, setPlayerHand] = useState([])
    const [dealerHand, setDealerHand] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [result, setResult] = useState({type: "", message: ""})
    const [newGame, setNewGame] = useState(false)
    const [playerBalance, setPlayerBalance] = useState(1000)
    const [bet, placeBet] = useState(0)

    const drawCards = (count) => {
        const deckCopy = [...gameDeck];
        const drawn = [];

        for (let i = 0; i < count; i++) {
            const randIdx = Math.floor(Math.random() * deckCopy.length);
            drawn.push(deckCopy[randIdx]);
            deckCopy.splice(randIdx, 1);
        }

        setGameDeck(deckCopy);
        return drawn;
    };

    const dealCardToPlayer = () => {
        const [card] = drawCards(1);
        const newHand = [...playerHand, card];
        setPlayerHand(newHand);
        
        const playerValue = calculateHandValue(newHand)

        if(playerValue > 21){
            handleGameOver({type: "dealer", message: "Bust! Dealer Wins"})
        } else if (playerValue === 21){
            handleGameOver({type: "player", message: "Congrats! You win."})
        }
        console.log(playerValue)
    }

    const dealerTurn = async () => {
        let currentHand = [...dealerHand];
        let currentValue = calculateHandValue(currentHand);

        while (currentValue < 17) {
            const [card] = drawCards(1);
            currentHand = [...currentHand, card];
            setDealerHand(currentHand);
            currentValue = calculateHandValue(currentHand);

            // simulate delay
            await new Promise(resolve => setTimeout(resolve, 800));
        }

        if (currentValue > 21) {
            handleGameOver({ type: "player", message: "Bust! Player Wins" });
        } else if (currentValue === 21 && dealerHand.length === 2){
            if (playerHand === 21 && playerHand.length === 2){
                handleGameOver({ type: "push", message: "Unlucky! Blackjack tie." });
            } else {
                handleGameOver({ type: "dealer", message: "Unlucky! Dealer Blackjak." });
            }
        } else if (currentValue === 21) {
            handleGameOver({ type: "dealer", message: "Dealer hits 21!" });
        } else {
            // Compare to player
            const playerValue = calculateHandValue(playerHand);
            if (currentValue > playerValue) {
                handleGameOver({ type: "dealer", message: "Dealer wins!" });
            } else if (currentValue < playerValue) {
                handleGameOver({ type: "player", message: "Player wins!" });
            } else {
                handleGameOver({ type: "push", message: "It's a tie!" });
            }
        }
    }

    const setPlayerStand = () => {
        setGameOver(true)
        dealerTurn();
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
        setPlayerHand([])
        setDealerHand([])
        setGameOver(false)
        setResult({type: "", message: ""})
        setNewGame(false)
        setGameDeck(imgCombos)
    }

    const playerValue = calculateHandValue(playerHand)
    const dealerValue = calculateHandValue(dealerHand)

    useEffect(() => {
        if (playerHand.length === 0 && dealerHand.length === 0) {
                const [playerCard1, playerCard2, dealerCard1] = drawCards(3);
                setPlayerHand([playerCard1, playerCard2]);
                setDealerHand([dealerCard1]);
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newGame])

    // betting logic
    const placeBet = (amount) => {
        if (amount <= playerBalance && amount > 0) {
            setPlayerBalance(prev => prev - amount);
            setBetAmount(amount);
           // setNewGame(true);
        } else {
            alert("Invalid bet amount");
        }
    };
    return (
        <div className="h-[100vh] w-[100vw]">
            <div className="blackjack-container mx-auto text-white p-4 bg-slate-700 h-[100%] w-[100%]">
                <h1 className="text-4xl text-center mb-4">
                    Black Jack
                </h1>
                {gameOver && (
                    <div className={`text-white ${result.type === 'player' ? "bg-green-700" : "bg-red-700"} font-bold rounded-md text-center mt-4 py-2`}>
                        <h2 className="text-2xl">{result.message}</h2>
                    </div>
                )}
                <div className="flex justify-center gap-2 mt-4">
                    {!newGame ? (
                                    <>
                                        <BlackjackButton  styling="primary" text={"Hit"} onClick={dealCardToPlayer} />
                                        <BlackjackButton  styling="danger" text={"Stand"} onClick={setPlayerStand} />
                                    </>
                                ) : (
                                    <BlackjackButton styling="secondary" text={"Reset"} onClick={resetGame} />
                                )
                    }
                </div>
                <div className="flex justify-around">
                    <Hand isDealer={false} cards={playerHand} title={"Your Hand"} handValue={playerValue}/>
                    <Hand isDealer={true} cards={dealerHand} title={"Dealer Hand"} handValue={dealerValue}/>
                </div>
            </div>
        </div>
    )
}

export default App
