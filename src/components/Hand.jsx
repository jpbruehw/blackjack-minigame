import BlackjackCard from "./BlackjackCard";

export default function Hand({ cards, title, handValue }) {
  return (
    <div className="p-4">
        <h2 className="text-2xl mb-2">
            {title}: {handValue}
        </h2>
        <div className="flex flex-col sm:flex-row gap-1">
            {
                cards.map((card) => (<BlackjackCard key={card.id} src={card.suit} rank={card.rank} />))
            }
        </div>
    </div>
  )
}
