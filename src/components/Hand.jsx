import { useEffect, useRef, useState } from "react";
import BlackjackCard from "./BlackjackCard";
import { CountUp } from "countup.js";
import HiddenCard from './HiddenCard'

export default function Hand({ isDealer, cards, title, handValue }) {
    const score = useRef(null);
    const prevValueRef = useRef(null);
    const [isMediumUp, setIsMediumUp] = useState(false);

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

    useEffect(() => {
        // detect if screen is md or larger
        const handleResize = () => {
            setIsMediumUp(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const displayCards = [...cards].reverse()

    return (
        <div className="p-4 mb-[150px] md:mb-4">
            <h2 className="text-2xl mb-2 text-white">
                {title}: <span ref={score}>{handValue}</span>
            </h2>

            <div className="relative md:h-[200px] md:min-w-[200px] flex">
                {displayCards.map((card, index) => {
                    // Default stack to right
                    const stackRight = isDealer || !isMediumUp;
                    const offset = (displayCards.length - 1 - index) * 50;

                    return (
                        <div
                            key={card.id}
                            className="absolute animate-slideIn"
                            style={{
                                left: stackRight ? `${offset}px` : "auto",
                                right: !stackRight ? `${offset}px` : "auto",
                                //zIndex: (isDealer && index === 0) ? 1 : index,
                                zIndex: (() => {
                                                if (isDealer && index === 0){
                                                    return 1
                                                } else if (!stackRight) {
                                                  // reverse zIndex so first card is on top
                                                    return displayCards.length - 1 - index;
                                                } else {
                                                    return index;
                                                }
                                            })(),
                            }}
                        >
                            <BlackjackCard src={card.suit} rank={card.rank} />
                        </div>
                    );
                })}

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