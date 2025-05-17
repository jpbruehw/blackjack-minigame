import { v4 as uuidv4 } from 'uuid';
import heart from './suits/heart.svg';
import spade from './suits/spade.svg';
import club from './suits/club.svg';
import diamond from './suits/diamond.svg';
import cardBack from './suits/card-back.svg'

//const suitImgs = [
//    {
//        src: heart,
//        type: 'heart'
//    },
//    {
//        src: spade,
//        type: 'spade'
//    },
//    {
//        src: club,
//        type: 'club'
//    },
//    {
//        src: diamond,
//        type: 'diamond'
//    },
//]

const dealerHidden = cardBack

const suitImgs = [heart, spade, club, diamond]

const suits = ["♠", "♥", "♦", "♣"];
const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
];

const imgCombos = suitImgs.flatMap((suit) =>
    ranks.map((rank) => ({ id: uuidv4(), suit, rank}))
)

const combinations = suits.flatMap((suit) =>
    ranks.map((rank) => ({ suit, rank}))
)

export {
    imgCombos,
    combinations,
    dealerHidden
}