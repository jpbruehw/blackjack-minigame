import { useEffect, useRef, useState } from "react";
import CountUp from "../blocks/TextAnimations/CountUp/CountUp";
import GradientText from "../blocks/TextAnimations/GradientText/GradientText";

export default function PlayerBalance({ balance, result }) {
    const prevBalanceRef = useRef(0);
    const hasMounted = useRef(false);

    const [fromValue, setFromValue] = useState(0);
    const [resultAnimation, setResultAnimation] = useState("")

    const animations = {
        win: "animate-winShake",
        loss: "animate-lossShake",
        push: "animate-pushShake",
    };

    const bgColors = {
    win: "bg-green-200 animate-bgSwoosh",
    loss: "bg-red-200 animate-bgSwoosh",
    push: "bg-blue-200 animate-bgSwoosh",
    default: "bg-white",
    };

    const borderColors = {
        win: "border-4 border-green-900",
        loss: "border-4 border-red-900",
        push: "border-4 border-blue-900",
        default: "border-4 border-slate-500",
    };

    useEffect(() => {
        const prev = prevBalanceRef.current;  

        if (!hasMounted.current) {
            hasMounted.current = true;
            prevBalanceRef.current = balance;
            return;
        } 

        setFromValue(prev);   
        
        prevBalanceRef.current = balance;

    }, [balance]);

    useEffect(() => {
        if (!result) return;

        setResultAnimation(animations[result] || "");

        const timeout = setTimeout(() => setResultAnimation(""), 800);
        return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]);

    return (
        <div
            className={`flex flex-col justify-center items-center rounded-md h-[70px] w-[90%] md:w-[350px] shadow-md
            ${bgColors[result] || bgColors.default} 
            ${borderColors[result] || borderColors.default} 
            ${resultAnimation}`}
        >
            <GradientText
                animationSpeed={4}
               // className="bg-transparent"
            >
                <span className="font-bold text-4xl hover:cursor-default ">
                    <CountUp from={fromValue} to={balance} separator="," />
                </span>
            </GradientText>
        </div>
    );
}