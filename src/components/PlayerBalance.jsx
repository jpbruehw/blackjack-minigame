import { useEffect, useRef } from "react";
import { CountUp } from "countup.js";
import {Card, CardBody } from "@heroui/card";

export default function PlayerBalance({ balance }) {
    const currBalance = useRef(null)
    const prevBalanceRef = useRef(null)

    useEffect(() => {
        if (!currBalance.current) return;

        const countUp = new CountUp(currBalance.current, balance, {
            startVal: prevBalanceRef.current ?? 0,
            duration: 2,
        });

        if (!countUp.error) {
            countUp.start();
            prevBalanceRef.current = balance
        } else {
            console.error(countUp.error)
        }
    }, [balance])

    return (
        <Card>
            <CardBody>
                Playable Balance: {balance}
            </CardBody>
        </Card>
    )
}
