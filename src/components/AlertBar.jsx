import { Alert } from "@heroui/alert";
import { useState } from "react";

export default function AlertBar({ color, message, title, setAlertState }){
    const [isVisible, setIsVisible] = useState(true)

    const handleClose = () => {
        setAlertState(null)
        setIsVisible(false)
    }

    return (
        <div className="absolute flex flex-co gap-4">
            {isVisible && (
                <Alert 
                    color={color}
                    description={message}
                    title={title}
                    variant="solid"
                    onClose={() => handleClose()}
                />
            )}
        </div>
    )
}