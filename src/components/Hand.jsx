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
            <div className="relative flex h-[200px]">
                {cards.reverse().map((card, index) => (
                    <div
                        key={card.id}
                        className="absolute"
                        style={{
                            left: `${(cards.length - 1 - index) * 50}px`,
                            zIndex: (isDealer && index === 0) ? 1 : index,
                        }}
                    >
                        <BlackjackCard src={card.suit} rank={card.rank} />
                    </div>
                ))}
                {(isDealer && cards.length === 1) && (
                    <div
                        className="absolute"
                        style={{
                            left: `${cards.length * 50}px`,
                            zIndex: 0,
                        }}
                    >
                        <HiddenCard />
                    </div>
                )}
            </div>
        </div>
    );
}