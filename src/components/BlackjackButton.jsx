import { Button } from "@heroui/button";

export default function BlackjackButton({text, onClick, styling}){
    return (
            <Button onPress={onClick} color={styling} variant="shadow">
                {text}
            </Button>
    )
}