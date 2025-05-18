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
        <div className="flex flex-col justify-center items-center gap-2 w-full">
            <Input
                label="Enter Bet"
                type="number"
                min={50}
                max={playerBalance}
                variant="underlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-[150px] mb-2"
            />
            <BlackjackButton styling="default" text="Place Bet" onClick={handleClick} />
        </div>
    );
}

