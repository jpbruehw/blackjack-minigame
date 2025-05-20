import { useEffect, useRef, useState } from "react";
import CountUp from "../blocks/TextAnimations/CountUp/CountUp";
import GradientText from "../blocks/TextAnimations/GradientText/GradientText";

export default function PlayerBalance({ balance }) {
    const prevBalanceRef = useRef(0);
    const hasMounted = useRef(false);

    const [fromValue, setFromValue] = useState(0);
    const [animateWin, setAnimateWin] = useState(false);
    
  useEffect(() => {
    const prev = prevBalanceRef.current;

    // Skip on first mount
    if (!hasMounted.current) {
      hasMounted.current = true;
      prevBalanceRef.current = balance;
      return;
    }

    // Update countup range
    setFromValue(prev);

    // Trigger animation only if balance increased
    if (balance > prev) {
      setAnimateWin(true);
      const timeout = setTimeout(() => setAnimateWin(false), 800);
      return () => clearTimeout(timeout);
    }

    // Save new balance for future comparison
    prevBalanceRef.current = balance;
  }, [balance]);

    return (
        <div
            className={`flex flex-col justify-center items-center bg-white rounded-md h-[50px] transition-all duration-300 border-4 shadow-md ${
                animateWin ? "border-green-900 bg-green-500  animate-wiggle" : "border-transparent"
            }`}
        >
            <GradientText
                animationSpeed={4}
                className=""
              //showBorder={true}
            >
                <span className="px-12 font-bold text-4xl">
                    <CountUp from={fromValue} to={balance} separator="," />
                </span>
            </GradientText>
        </div>
    );
}
