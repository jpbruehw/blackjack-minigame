import { useEffect, useRef, useState } from "react";
import CountUp from "../blocks/TextAnimations/CountUp/CountUp";
import GradientText from "../blocks/TextAnimations/GradientText/GradientText";

export default function PlayerBalance({ balance, result }) {
    const prevBalanceRef = useRef(0);
    const hasMounted = useRef(false);

    const [fromValue, setFromValue] = useState(0);
    const [resultAnimation, setResultAnimation] = useState("")
    
    useEffect(() => {
        const prev = prevBalanceRef.current;  

        if (!hasMounted.current) {
            hasMounted.current = true;
            prevBalanceRef.current = balance;
            return;
        } 

        setFromValue(prev);   
        
        prevBalanceRef.current = balance;

        // if (balance > prev) {
        //     setAnimateWin(true);
        //     const timeout = setTimeout(() => setAnimateWin(false), 800);
        //     return () => clearTimeout(timeout);
        // } else if (prev < balance){
        //     setAnimateLoss(true)
        //     const timeout = setTimeout(() => setAnimateLoss(false), 800);
        //     return () => clearTimeout(timeout);
        // } else {
        //     setAnimatePush(true)
        //     const timeout = setTimeout(() => setAnimatePush(false), 800);
        //     return () => clearTimeout(timeout);
        // }

    }, [balance]);

    useEffect(() => {
        if (!result) return;

        let animation = "";
        if (result === "win") animation = "border-green-900 bg-green-500 animate-winShake";
        else if (result === "loss") animation = "border-red-900 bg-red-500 animate-lossShake";
        else if (result === "push") animation = "border-yellow-900 bg-yellow-500 animate-pushShake";

        setResultAnimation(animation);
        const timeout = setTimeout(() => setResultAnimation("border-transparent"), 800);
        return () => clearTimeout(timeout);
    }, [result]);

    return (
        <div
            className={`flex flex-col justify-center items-center bg-white rounded-md h-[50px] transition-all duration-300 border-4 shadow-md ${resultAnimation}`}
        >
            <GradientText
                animationSpeed={4}
            >
                <span className="px-12 font-bold text-4xl">
                    <CountUp from={fromValue} to={balance} separator="," />
                </span>
            </GradientText>
        </div>
    );
}