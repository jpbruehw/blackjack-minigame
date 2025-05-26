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
    // const [showHands, setShowHands] = useState(false);
    // const [handAnimationClass, setHandAnimationClass] = useState("");


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
        } else if (playerValue === 21 && playerHand.length === 2 && dealerHand)

        console.log(playerValue)
    }

    const dealerTurn = async () => {

        setDealerThinking(true);

        let currentHand = [...dealerHand];
        let currentValueDealer = calculateHandValue(currentHand);

        // dealer draws until reaching at least 17
        while (currentValueDealer < 17) {
            const [card] = drawCards(1);
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
            handleGameOver({ type: "player", title: "Blackjack!", color: "success", message: "Blackjack! You win." });
        } else if (currentValueDealer > 21) {
            handleGameOver({ type: "player", title: "Dealer Bust", color: "success", message: "Bust! Player Wins" });
        } else {
            // regular comparison
            if (currentValueDealer > playerValue) {
                handleGameOver({ type: "dealer", title: "House Wins", color: "danger", message: "Unlucky! Dealer wins." });
            } else if (currentValueDealer < playerValue) {
                handleGameOver({ type: "player", title: "You win!", color: "success", message: "Player wins!" });
            } else {
                handleGameOver({ type: "push", title: "Push", color: "primary", message: "It's a tie!" });
            }
        }

        setDealerThinking(false);
    };

  // useEffect(() => {
  //   if (hasPlacedBet || gameOver) {
  //     setShowHands(true);
  //     setHandAnimationClass("fadeIn"); // your CSS class
  //   } else {
  //     setHandAnimationClass("fadeOut");

  //     const timeout = setTimeout(() => {
  //       setShowHands(false); // unmount after animation
  //     }, 1500); // must match animation duration

  //     return () => clearTimeout(timeout);
  //   }
  // }, [hasPlacedBet, gameOver]);

    
    const setPlayerStand = () => {
       // setGameOver(true)
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
        console.log("RES TYPE 0: ", result.type)
        console.log("RES TYPE: ", gameResult)
        setGameOver(true);
        setAlertInfo(result);
        setHasPlacedBet(false);

        //const timeout = setTimeout(() => setGameResult(null), 800);
        //return () => clearTimeout(timeout);
        //setGameResult(null)
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

            // Natural blackjack and dealer does NOT have a threatening upcard
            if (playerValue === 21 && !isFaceCard && !isAce) {
                console.log("I GOT HERE")
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
    return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Central game container */}
      <MouseTrail />
      <div id="game-container" className="blackjack-container w-[40%] max-w-5xl h-[80%] bg-slate-600/70 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col items-center p-6 gap-4 border border-slate-600">
        {/* Title 
        
        adjust stylng
        */}
          <Header />

        {/* Alert bar */}
        {alertInfo && (
          <div className="w-full flex flex-col items-center justify-center h-[30px] mt-[15px]">
            <AlertBar {...alertInfo} setAlertState={setAlertInfo} />
          </div>
        )}
        {/* Balance */}
        <div className={`flex flex-col items-center justify-center mt-[50px] ${hasPlacedBet ? "animate-slideUp" : !gameOver ? "animate-slideDown" : ""}`}>
          <PlayerBalance balance={playerBalance} result={gameResult} />
        </div>

        {/* Hands */}
        {(hasPlacedBet || gameOver) && (
          <div className="w-full flex flex-col-reverse lg:flex-row justify-between items-center mt-4 animate-fadeIn">
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
        <div className="flex justify-center gap-3 mt-4">
          {hasPlacedBet && !gameOver ? (
            <>
              <BlackjackButton
                isDisabled={dealerThinking}
                styling="primary"
                text="Hit"
                onClick={dealCardToPlayer}
              />
              <BlackjackButton
                isDisabled={dealerThinking}
                styling="danger"
                text="Stand"
                onClick={setPlayerStand}
              />
            </>
          ) : (
            newGame &&
            gameOver && (
              <BlackjackButton
                styling="secondary"
                text="New Round"
                onClick={resetGame}
              />
            )
          )}
        </div>

        {/* Betting Input */}
        {!hasPlacedBet && !gameOver && (
          <div className="w-full flex justify-center mt-[5vh] animate-slideUp">
            <BetInput placeBet={placeBet} playerBalance={playerBalance} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App
