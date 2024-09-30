import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

type ButtonProps = {
    iconSrc: string; // cesta k ikoně
    label: string; // text tlačítka
    url: string; // URL, na kterou bude uživatel přesměrován
    triggerKey?: string; // Písmeno, které vyvolá otevření URL (volitelný parametr)
};

const Button: FC<ButtonProps> = ({ iconSrc, label, url, triggerKey }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(url); // použijeme router.push pro navigaci
    };

    const handleAuxClick = (event: React.MouseEvent) => {
        if (event.button === 1) {
            // Kontrola, zda bylo kliknuto kolečkem myši
            window.open(url, "_blank"); // Otevření odkazu v nové záložce
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (triggerKey && event.key === triggerKey) {
                // Kontrola, zda je triggerKey definovaný
                event.preventDefault(); // Zamezíme výchozímu chování klávesy
                router.push(url); // Otevření URL při stisknutí klávesy
            }
        };

        // Registrace posluchače události
        window.addEventListener("keydown", handleKeyDown);

        // Čistíme posluchače při unmountování komponenty
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [router, url, triggerKey]);

    return (
        <button
            className="font-bold size-fit"
            onClick={handleClick}
            onAuxClick={handleAuxClick} // Přidání posluchače události pro kliknutí kolečkem myši
        >
            <div className="bg-white flex p-3 outline outline-1 outline-gray-600 rounded-lg gap-4 transition-all duration-75 ease-in-out hover:outline-2 hover:border-gray-800 hover:scale-110 hover:translate-x-3 box-border">
                <Image src={iconSrc} alt="icon" width={24} height={24} />
                <span>{label}</span>
            </div>
        </button>
    );
};

export default Button;
