import { Image } from "@heroui/image";
import headerImg from "/header.svg"

const Header = ({ className }) => {
    return (
        <div className={`px-4 py-2 w-[90%] md:w-[300px] ${className}`}>
            <Image 
                isBlurred
                alt="Blackjack Game Header"
                src={headerImg}
            />
        </div>
    )
}

export default Header