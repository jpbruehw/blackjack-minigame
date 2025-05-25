import { Button } from "@heroui/button";

export default function BlackjackButton({text, onClick, styling, isDisabled = false, className = ""}){
    return (
            <Button className={className} onPress={onClick} color={styling} variant="shadow" disabled={isDisabled} >
                {text}
            </Button>
    )
}