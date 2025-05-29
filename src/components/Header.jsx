import { Image } from "@heroui/image";

const Header = () => {
    return (
        <div className="md:w-[300px] w-[80%]">
            <Image 
                isBlurred
                alt="Blackjack Game Header"
                src="/header.svg"
                //width={200}
            />
        </div>
    )
}

export default Header