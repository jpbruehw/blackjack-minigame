import { Alert } from "@heroui/alert";
import { useState } from "react";

export default function AlertBar({ color, message, title, setAlertState }){
    const [isVisible, setIsVisible] = useState(true)

    const handleClose = () => {
        setAlertState(null)
        setIsVisible(false)
    }

    return (
        <div className="absolute flex flex-col gap-4 w-[50%] sm:w-[90%]">
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