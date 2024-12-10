import React from "react";

interface JButtonProps {
    label?: string;
    href?: string;
    phone?: boolean;
    email?: boolean;
    opacity?: boolean;
    lang?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const JButton: React.FC<JButtonProps> = ({ 
    label, 
    href, 
    phone, 
    email, 
    opacity, 
    lang,
    disabled, 
    children, 
    className, 
    onClick 
}) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
            return;
        }

        if (phone) {
            window.location.href = "tel:+420733249479";
        } else if (email) {
            window.location.href = "mailto:jakub.svihel@gnj.cz";
        } else if (e.button === 1) {
            window.open(`${href}`, "_blank");
        } else if (e.button === 0) {
            window.location.href = `${href}`;
        }
    };

    return (
        <button
            className={`outline outline-1 outline-[#2b2b27] border-b-2 border-b-[#b7a71d] border-t-2 border-t-transparent
                    hover:border-t-[#b7a71d] transition duration-200 ease-in-out
                    ${opacity ? "opacity-50" : ""} ${label ? "text-sm font-bold px-3 py-1" : "size-8 px-1 "} ${lang ? "text-sm font-bold " : "rounded-lg"}
                    ${className || ""}`}
            disabled={disabled}
            onMouseDown={handleClick}
        >
            {label ? label : children}
        </button>
    );
};

export default JButton;
