import { Input } from "@heroui/input";
import { useState } from "react";
import BlackjackButton from './BlackjackButton';

export default function BetInput({ placeBet, playerBalance }) {
    const [amount, setAmount] = useState("");

    const handleClick = () => {
        const bet = parseInt(amount);
        if (!isNaN(bet)) {
            placeBet(bet);
            setAmount("");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-[90%] md:w-[350px] border-slate-500 border-4 gap-4 rounded-md p-4 bg-white/90 shadow-lg">
            <Input
                label="Enter Bet"
                type="number"
                min={50}
                max={playerBalance}
                variant="underlined"
                value={amount}
                step={50}
                size="lg"
                onChange={(e) => setAmount(e.target.value)}
                classNames={{
                    inputWrapper: "after:bg-slate-600 border-b-slate-300 hover:border-b-slate-400"
                }}
            />
            <BlackjackButton className="border-slate-500 border-1" styling="default" text="Place Bet" onClick={handleClick} />
        </div>
    );
}