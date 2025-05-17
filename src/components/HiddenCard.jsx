import { Card, CardBody } from "@heroui/card";
import { dealerHidden } from "../assets/CardDeck";

export default function HiddenCard() {
    return (
        <Card className="w-[150px]">
            <CardBody className="p-0">
                <img
                    alt="playing card"
                    src={dealerHidden}
                    className="w-full h-full object-cover"
                />
            </CardBody>
        </Card>
    );
}
