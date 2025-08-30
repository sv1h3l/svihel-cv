import React from "react";
import Image from "next/image";

interface TabProps {
    labelCZ: string;
    labelEN: string;
    imageSrc: string;
    imageAlt: string;
    children: React.ReactNode;
    show: boolean;
    isCzech: boolean;
    lastTab?: boolean;
}

export default function JTab({ labelCZ,labelEN, imageSrc, imageAlt, children, show, isCzech, lastTab }: TabProps) {
    return (
        <div
            className={`bg-[#191919] shadow-lg shadow-[#10101080] border-t-2 border-[#b7a71d] rounded-3xl mt-5  max-w-5xl w-full
            p-3 lg:p-4 lg:mt-6
            transition-all duration-700
            ${show ? "opacity-100" : "opacity-0"}
            ${lastTab && "mb-5"}`}
        >
            <div className="flex items-center ">
                <Image
                    className="mr-2 w-7"
                    src={`/icons/${imageSrc}.webp`}
                    alt={imageAlt}
                    width={30}
                    height={30}
                />

                <div className="relative grid">
                    <h3 className={`font-bold text-nowrap text-gray-200 text-2xl  transition-all duration-500 col-start-1 row-start-1 ${isCzech ? "opacity-100" : "opacity-0 absolute"}`}>{labelCZ.toUpperCase()}</h3>
                    <h3 className={`font-bold text-nowrap text-gray-200 text-2xl  transition-all duration-500 col-start-1 row-start-1 ${isCzech ? "opacity-0 absolute" : "opacity-100"}`}>{labelEN.toUpperCase()}</h3>
                </div>
            </div>

            {children}
        </div>
    );
}
