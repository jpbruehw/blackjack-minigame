import { Button } from "@heroui/button";

export default function BlackjackButton({text, onClick, styling, isDisabled = false, className = "", size = "md"}){
    return (
            <Button className={className} onPress={onClick} color={styling} variant="shadow" size={size} disabled={isDisabled} >
                {text}
            </Button>
    )
}