import { Image } from "@heroui/image";

const Header = () => {
    return (
        <div className="px-4 py-2 w-full md:w-[300px]">
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