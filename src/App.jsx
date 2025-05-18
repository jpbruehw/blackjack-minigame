import './App.css'
import { useState, useEffect } from 'react'
import { imgCombos } from './assets/CardDeck'
import BlackjackButton from './components/BlackjackButton'
import Hand from './components/Hand'
import AlertBar from './components/AlertBar'
import BetInput from './components/BetInput'
import PlayerBalance from './components/PlayerBalance'

function App() {
    const [gameDeck, setGameDeck] = useState(imgCombos);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [alertInfo, setAlertInfo] = useState(null);
    const [newGame, setNewGame] = useState(false);
    const [hasPlacedBet, setHasPlacedBet] = useState(false);
    const [playerBalance, setPlayerBalance] = useState(1000);
    const [betAmount, setBetAmount] = useState(0);

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
            handleGameOver({type: "dealer", title: "Bust!", color: "danger", message: "Unlucky! Dealer Wins"})
        }

        console.log(playerValue)
    }

    const dealerTurn = async () => {
        let currentHand = [...dealerHand];
        let currentValueDealer = calculateHandValue(currentHand);

        while (currentValueDealer < 17) {
            const [card] = drawCards(1);
            currentHand = [...currentHand, card];
            setDealerHand(currentHand);
            currentValueDealer = calculateHandValue(currentHand);

            // simulate delay
            await new Promise(resolve => setTimeout(resolve, 800));
        }

        if (currentValueDealer > 21) {
            handleGameOver({ type: "player", title: "Dealer Bust", color: "success", message: "Bust! Player Wins" });
        } else if (currentValueDealer === 21 && dealerHand.length === 2){
            if (playerValue === 21 && playerHand.length === 2){
                handleGameOver({ type: "push", title: "Push", color: "primary", message: "Unlucky! Blackjack tie." });
            } else {
                handleGameOver({ type: "dealer", title: "Blackjack!", color: "danger", message: "Unlucky! Dealer Blackjack." });
            }
        } else if (currentValueDealer === 21 && playerValue < 21) {
            handleGameOver({ type: "dealer", title: "Dealer 21!", color: "danger", message: "Unlucky! Dealer hit 21." });
        } else {
            // Compare to player
           // const playerValue = calculateHandValue(playerHand);
            if (currentValueDealer > playerValue) {
                handleGameOver({ type: "dealer", title: "House Wins", color: "danger", message: "Unlucky! Dealer wins." });
            } else if (currentValueDealer < playerValue) {
                handleGameOver({ type: "player", title: "You win!", color: "success", message: "Player wins!" });
            } else {
                handleGameOver({ type: "push", title: "Push", color: "primary", message: "It's a tie!" });
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
        setAlertInfo(result)
        setNewGame(true)

        if (result.type === "player") {
            // blackjack 3:2 payout
            const isBlackjack = playerHand.length === 2 && playerValue === 21;
            const payout = isBlackjack ? betAmount * 2.5 : betAmount * 2;
            setPlayerBalance(prev => prev + payout);
        } else if (result.type === "push") {
            setPlayerBalance(prev => prev + betAmount);
        }

        setHasPlacedBet(false)
    }

    const resetGame = () => {
        setPlayerHand([]);
        setDealerHand([]);
        setGameOver(false);
        setAlertInfo(null);
        setNewGame(false);
        setGameDeck(imgCombos);
        setBetAmount(0);
    };

    const playerValue = calculateHandValue(playerHand)
    const dealerValue = calculateHandValue(dealerHand)

    useEffect(() => {
        if (playerHand.length === 0 && dealerHand.length === 0) {
                const [playerCard1, playerCard2, dealerCard1] = drawCards(3);
                setPlayerHand([playerCard1, playerCard2]);
                setDealerHand([dealerCard1]);
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasPlacedBet])

    // betting logic
    const placeBet = (amount) => {
        if (amount <= playerBalance && amount > 0) {
            setPlayerBalance(prev => prev - amount);
            setBetAmount(amount);
            setHasPlacedBet(true);
            setNewGame(true);
        }
    };
    return (
        <div className="h-[100vh] w-[100vw]">
            <div className="blackjack-container mx-auto text-white p-4 bg-slate-700 h-[100%] w-[100%]">
                <h1 className="text-4xl text-center mb-4">
                    Black Jack
                </h1>
                <PlayerBalance balance={playerBalance} />
                {alertInfo && (
                    <AlertBar {...alertInfo} setAlertState={setAlertInfo} />
                )}
                {hasPlacedBet && (
                    <div className="flex justify-around">
                        <Hand isDealer={false} cards={playerHand} title={"Your Hand"} handValue={playerValue}/>
                        <Hand isDealer={true} cards={dealerHand} title={"Dealer Hand"} handValue={dealerValue}/>
                    </div>
                )}
                
                <div className="flex justify-center gap-2 mt-4">
                    {hasPlacedBet ? (
                                    <div className="">
                                        <BlackjackButton  styling="primary" text={"Hit"} onClick={dealCardToPlayer} />
                                        <BlackjackButton  styling="danger" text={"Stand"} onClick={setPlayerStand} />
                                    </div>
                                ) : (
                                    newGame &&  <BlackjackButton styling="secondary" text={"Reset"} onClick={resetGame} />
                                )
                    }
                </div>
                {(!hasPlacedBet || gameOver) && <BetInput placeBet={placeBet} playerBalance={playerBalance} />}
            </div>
        </div>
    )
}

export default App
