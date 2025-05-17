
const suitImgs = [
    {
        id: 'heart',
        src: './suits/heart.svg',
        desc: 'heart'
    },
    {
        id: 'spade',
        src: './suits/spade.svg',
        desc: 'spade'
    },
    {
        id: 'club',
        src: './suits/club.svg',
        desc: 'club'
    },
    {
        id: 'diamond',
        src: './suits/diamond.svg',
        desc: 'diamond'
    },
]
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
    ranks.map((rank) => ({ suit, rank}))
)

const combinations = suits.flatMap((suit) =>
    ranks.map((rank) => ({ suit, rank}))
)

export {
    imgCombos,
    combinations
}