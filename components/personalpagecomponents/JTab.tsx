import React from "react";
import Image from "next/image";

interface TabProps {
    label: string;
    imageSrc: string;
    imageAlt: string;
    children: React.ReactNode;
}

export default function JTab({ label, imageSrc, imageAlt, children }: TabProps) {
    return (
        <div
            className="bg-[#161513] border-t-2 border-[#b7a71d] rounded-3xl mt-3  max-w-5xl w-full
            p-3 lg:p-4 lg:mt-4"
        >
            <div className="flex items-center ">
                <Image
                    className="mr-2 w-7"
                    src={`/icons/${imageSrc}.svg`}
                    alt={imageAlt}
                    width={30}
                    height={30}
                />

                <h3 className="font-bold text-gray-200 text-2xl ">
                    {label.toUpperCase()}
                </h3>
            </div>

            {children}
        </div>
    );
}
