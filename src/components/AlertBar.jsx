import { Alert } from "@heroui/alert";
import { useState } from "react";

export default function AlertBar({ type, message, title }){
    const [isVisible, setIsVisible] = useState(true)

    return (
        <div className="absolute flex flex-co gap-4">
            {isVisible && (
                <Alert 
                    color={type}
                    description={message}
                    title={title}
                    variant="faded"
                    onClose={() => setIsVisible(false)}
                />
            )}
        </div>
    )
}