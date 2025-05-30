import { Alert } from "@heroui/alert";
import { useState } from "react";

export default function AlertBar({ color, message, title, setAlertState }){
    const [isVisible, setIsVisible] = useState(true)

    const handleClose = () => {
        setAlertState(null)
        setIsVisible(false)
    }

    return (
        <div className={`w-full mb-2 md:w-[60%] md:mb-0 flex flex-col items-center justify-center h-[50px] ${isVisible && "animate-slideIn"}`}>
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