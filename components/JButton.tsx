import React from "react";

interface JButtonProps {
	label?: string;
	href?: string;
	phone?: boolean;
	email?: boolean;
	lang?: boolean;
	disabled?: boolean;
	smaller?: boolean;
	children?: React.ReactNode;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	setShowImage?: (show: boolean) => void;
	setShowImageValue?: boolean;
}

const JButton: React.FC<JButtonProps> = ({ label, href, phone, email, lang, disabled, smaller, children, className, onClick, setShowImage , setShowImageValue = false}) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (onClick) {
			onClick(e);
			return;
		}

		if (phone) {
			window.location.href = "tel:+420733249479";
		} else if (email) {
			window.location.href = "mailto:jakub.svihel@gnj.cz";
		} else if (setShowImage) {
			setShowImage(setShowImageValue);
		} else if (e.button === 1) {
			window.open(`${href}`, "_blank");
		} else if (e.button === 0) {
			window.location.href = `${href}`;
		}
	};
	return (
		<button
			className={`outline outline-1 outline-[#2b2b27] border-b-2 border-b-[#b7a71d] border-t-2 border-t-transparent bg-[#232323]
                    ${disabled ? "opacity-50" : "hover:border-t-[#b7a71d] transition duration-200 ease-in-out "}
                    ${label ? "text-sm font-bold px-3 py-1" : `${smaller ? "size-7" : "size-8"}  px-1 `}
                    ${lang ? "text-sm font-bold " : "rounded-lg flex items-center justify-center"}
                    ${className || ""}`}
			disabled={disabled}
			onMouseDown={handleClick}>
			{label ? label : children}
		</button>
	);
};

export default JButton;
