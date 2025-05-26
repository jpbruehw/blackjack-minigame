import { Image } from "@heroui/image";

const Header = () => {
    return (
        <div className="">
            <Image 
                isBlurred
                alt="Blackjack Game Header"
                src="/header.svg"
                width={300}
            />
        </div>
    )
}

export default Header