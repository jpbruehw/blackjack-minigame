import { Alert } from "@heroui/alert";
import { useState } from "react";

export default function AlertBar({ color, message, title, setAlertState, className }){
    const [isVisible, setIsVisible] = useState(true)

    const handleClose = () => {
        setIsVisible(false)
        setAlertState(null)
    }

    return (
        <div className={`w-[90%] md:w-[60%] flex flex-col items-center justify-center ${isVisible && "animate-slideIn"} ${className}`}>
            <Alert 
                color={color}
                description={message}
                title={title}
                variant="solid"
                onClose={() => handleClose()}
            />
        </div>
    )
}