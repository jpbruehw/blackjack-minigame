import { Card, CardBody } from "@heroui/card";
import { dealerHidden } from "../assets/CardDeck";

export default function HiddenCard() {
    return (
        <Card className="w-[100px] h-[170px] md:w-[150px] md:h-[221px]">
            <CardBody className="p-1 md:p-0">
                <img
                    alt="playing card"
                    src={dealerHidden}
                    className="w-full h-full object-cover"
                />
            </CardBody>
        </Card>
    );
}
