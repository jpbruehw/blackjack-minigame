import './App.css'
import { useState, useEffect } from 'react'
import { imgCombos } from './assets/CardDeck'
import BlackjackButton from './components/BlackjackButton'
import Hand from './components/Hand'
import AlertBar from './components/AlertBar'
import BetInput from './components/BetInput'
import PlayerBalance from './components/PlayerBalance'
import MouseTrail from './components/MouseTrail'
import Header from './components/Header'

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
    const [dealerThinking, setDealerThinking] = useState(false);
    const [gameResult, setGameResult] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

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
        let card;
        let attempts = 0;
        const maxAttempts = 10; // prevent infinite loop in edge cases

        while (attempts < maxAttempts) {
            [card] = drawCards(1);
            const alreadyInHand = playerHand.some(c => c.id === card.id);
            // end loop if unique card found
            if (!alreadyInHand) break;
            attempts++;
        }

        if (!card || attempts >= maxAttempts) {
            console.error("Failed to draw a unique card after multiple attempts.");
            return;
        }

        const newHand = [...playerHand, card];
        setPlayerHand(newHand);

        const playerValue = calculateHandValue(newHand);

        if (playerValue > 21) {
            handleGameOver({
                type: "dealer",
                title: "Bust!",
                color: "danger",
                message: "Unlucky! Dealer Wins."
            });
        }
    };

    const dealerTurn = async () => {

        setDealerThinking(true);

        let currentHand = [...dealerHand];
        let currentValueDealer = calculateHandValue(currentHand);

        // dealer draws until reaching at least 17
        while (currentValueDealer < 17) {
            let card;
            let attempts = 0;
            const maxAttempts = 10;

            while (attempts < maxAttempts) {
                [card] = drawCards(1);
                const alreadyInHand = currentHand.some(c => c.id === card.id);
                if (!alreadyInHand) break;
                attempts++;
            }

            if (!card || attempts >= maxAttempts) {
                console.error("Failed to draw a unique card for dealer after multiple attempts.");
                break;
            }

            currentHand = [...currentHand, card];
            setDealerHand(currentHand);
            currentValueDealer = calculateHandValue(currentHand);

            await new Promise(resolve => setTimeout(resolve, 800));
        }

        const playerHasBlackjack = playerValue === 21 && playerHand.length === 2;
        const dealerHasBlackjack = currentValueDealer === 21 && currentHand.length === 2;

        if (dealerHasBlackjack) {
            if (playerHasBlackjack) {
                handleGameOver({ type: "push", title: "Push", color: "primary", message: "Both have Blackjack. It's a tie!" });
            } else {
                handleGameOver({ type: "dealer", title: "Blackjack!", color: "danger", message: "Dealer has Blackjack. You lose." });
            }
        } else if (playerHasBlackjack) {
            handleGameOver({ type: "player", title: "Blackjack!", color: "success", message: "Congratulations! You win with Blackjack!" });
        } else if (currentValueDealer > 21) {
            handleGameOver({ type: "player", title: "Dealer Bust", color: "success", message: "Bust! You win." });
        } else {
            // regular comparison
            if (currentValueDealer > playerValue) {
                handleGameOver({ type: "dealer", title: "House Wins", color: "danger", message: "Unlucky! Dealer wins." });
            } else if (currentValueDealer < playerValue) {
                handleGameOver({ type: "player", title: "You win!", color: "success", message: "You win!" });
            } else {
                handleGameOver({ type: "push", title: "Push", color: "primary", message: "It's a tie!" });
            }
        }

        setDealerThinking(false);
    };

    const setPlayerStand = () => {
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
        const currentPlayerValue = calculateHandValue(playerHand);
        const isBlackjack = playerHand.length === 2 && currentPlayerValue === 21;

        if (result.type === "player") {
            const payout = isBlackjack ? betAmount * 2.5 : betAmount * 2;
            setPlayerBalance(prev => prev + payout);
        } else if (result.type === "push") {
            setPlayerBalance(prev => prev + betAmount);
        }

        if (result.type === 'player') setGameResult('win');
        else if (result.type === 'dealer') setGameResult('loss');
        else if (result.type === 'push') setGameResult('push');

        setGameOver(true);
        setAlertInfo(result);
        setHasPlacedBet(false);
    };

    const resetGame = () => {
        setPlayerHand([]);
        setDealerHand([]);
        setGameOver(false);
        setAlertInfo(null);
        setNewGame(false);
        setGameDeck(imgCombos);
        setBetAmount(0);
        setGameResult(null)
    };

    const playerValue = calculateHandValue(playerHand)
    const dealerValue = calculateHandValue(dealerHand)

    useEffect(() => {
        if (playerHand.length === 0 && dealerHand.length === 0) {
            const [playerCard1, playerCard2, dealerCard1] = drawCards(3);
            const initialPlayerHand = [playerCard1, playerCard2];
            const initialDealerHand = [dealerCard1];

            setPlayerHand(initialPlayerHand);
            setDealerHand(initialDealerHand);

            const playerValue = calculateHandValue(initialPlayerHand);
            const dealerUpcard = dealerCard1;
            const dealerRank = dealerUpcard.rank;
            const isFaceCard = ["10", "J", "Q", "K"].includes(dealerRank);
            const isAce = dealerRank === "A";

            // natural blackjack and dealer does NOT have a threatening upcard
            if (playerValue === 21 && !isFaceCard && !isAce) {
                handleGameOver({
                    type: "player",
                    title: "Blackjack!",
                    color: "success",
                    message: "Congratulations! You win with Blackjack!"
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasPlacedBet]);

    // betting logic
    const placeBet = (amount) => {
        if (amount <= playerBalance && amount > 0) {
            setPlayerBalance(prev => prev - amount);
            setBetAmount(amount);
            setHasPlacedBet(true);
            setNewGame(true);
        }
    };

    useEffect(() => {
        const updateSize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
            <div className="relative w-screen h-screen flex items-center justify-center py-[3vh] bg-gradient-to-br from-slate-900 to-slate-800">
                <MouseTrail />
                {/* Central game container */}
                <div id="game-container" className={`blackjack-container transform-gpu flex flex-col justify-center items-center ${(isSmallScreen && !hasPlacedBet && !newGame) ? "animate-shrinkHeight md:animate-none md:h-full" : "animate-expandHeight md:animate-none"} overflow-y-auto lg:overflow-y-hidden overflow-x-hidden w-[90%] max-h-[900px] max-w-5xl md:h-[100%] 2xl:h-[85%] xxl:max-h-[60%] bg-slate-600/70 rounded-2xl shadow-2xl md:p-6 p-2 gap-2 border-slate-600`}>
                    {/* Alert bar */} 
                    {(alertInfo && !isSmallScreen) (
                        <AlertBar {...alertInfo} setAlertState={setAlertInfo} className={isSmallScreen ? "mt-[50px]" : "mt-0"}/>
                    )}

                    <Header className={`${!newGame ? "animate-slideDown -mt-[40px] mb-4" : "animate-slideUp mt-0"} ${isSmallScreen}`} />

                    {/* Balance */}
                    <div className={`flex flex-col items-center justify-center w-full ${hasPlacedBet ? "animate-slideUp" : !gameOver ? "animate-slideDown" : ""}`}>
                        <PlayerBalance balance={playerBalance} result={gameResult} />
                    </div>

                    {/* Hands */}
                    {(hasPlacedBet || gameOver) && (
                        <div className="w-full flex flex-col-reverse items-start justify-center md:flex-row md:justify-center md:gap-8 xl:justify-around md:items-center mt-2 md:mt-0 md:w-full xl:max-w-[60%] animate-fadeIn">
                            <Hand
                                isDealer={false}
                                cards={playerHand}
                                title={"Your Hand"}
                                handValue={playerValue}
                            />
                            <Hand
                                isDealer={true}
                                cards={dealerHand}
                                title={"Dealer Hand"}
                                handValue={dealerValue}
                            />
                        </div>
                    )}

                   {/* Action Buttons */}
                    <div className="w-full flex items-center justify-center">
                        {hasPlacedBet && !gameOver ? (
                            <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-8 md:mt-4 md:gap-12 w-full">
                                <BlackjackButton
                                    isDisabled={dealerThinking}
                                    styling="primary"
                                    text="Hit"
                                    onClick={dealCardToPlayer}
                                    size={isSmallScreen ? "lg" : "md"}
                                    className={isSmallScreen ? "w-[40%]" : "w-[150px]"}
                                />
                                <BlackjackButton
                                    isDisabled={dealerThinking}
                                    styling="danger"
                                    text="Stand"
                                    onClick={setPlayerStand}
                                    size={isSmallScreen ? "lg" : "md"}
                                    className={isSmallScreen ? "w-[40%]" : "w-[150px]"}
                                />
                            </div>
                        ) : (
                            (newGame && gameOver) && (
                                <BlackjackButton
                                    styling="secondary"
                                    text="New Round"
                                    onClick={resetGame}
                                    size="lg"
                                    className={isSmallScreen ? "w-[90%] mt-6 mb-4" : "w-[200px]"}
                                />
                            )
                        )}
                    </div>

                    {/* Betting Input */}
                    {!hasPlacedBet && !gameOver && (
                        <div className="w-full flex justify-center mt-[4vh] animate-slideUp">
                            <BetInput placeBet={placeBet} playerBalance={playerBalance} />
                        </div>
                    )}
                </div>
            </div>
    );   
}

export default App
