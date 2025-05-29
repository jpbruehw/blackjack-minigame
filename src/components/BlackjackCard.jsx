import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";

export default function BlackjackCard({src, rank}) {
    return (
        <Card className="w-[100px] md:w-[150px] border-1">
            <CardHeader className="pb-0 pt-2 px-4 flex justify-end">
                <h4 className="font-bold text-large text-[#49326b]">{rank}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="playing card"
                    className="object-cover rounded-xl bg-transparent"
                    src={src}
                   // width={200}
                />
            </CardBody>
            <CardFooter className="pb-2 pt-2 px-4 flex justify-start">
                <h4 className="font-bold text-large text-[#49326b]">{rank}</h4>
            </CardFooter>
        </Card>
    )
}
