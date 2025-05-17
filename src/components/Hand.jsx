import { useEffect, useRef } from "react";
import BlackjackCard from "./BlackjackCard";
import { CountUp } from "countup.js";
import HiddenCard from './HiddenCard'

export default function Hand({ isDealer, cards, title, handValue }) {
    const score = useRef(null);
    const prevValueRef = useRef(null);

    useEffect(() => {
        if (!score.current) return;

        const countUp = new CountUp(score.current, handValue, {
            startVal: prevValueRef.current ?? 0,
            duration: 1,
        });

        if (!countUp.error) {
            countUp.start();
            prevValueRef.current = handValue;
        } else {
            console.error(countUp.error);
        }
    }, [handValue]);

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-2">
                {title}: <span ref={score}>{handValue}</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-1">
                {cards.map((card) => (
                    <BlackjackCard key={card.id} src={card.suit} rank={card.rank} />
                ))}
                {
                    (isDealer && cards.length) == 1 ? <HiddenCard /> : ''
                }
            </div>
        </div>
    );
}