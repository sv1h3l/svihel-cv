import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface JButtonProps {
	href?: string;
	lang?: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
	className?: string;
	childrenClassName?: string;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	title?: string;
}

const silkSpring = { type: 'spring' as const, stiffness: 260, damping: 30 };

const interactionVariants: Variants = {
	rest: { y: 0, scale: 1 },
	hover: { y: -1, scale: 1 },
	tap: { y: 0, scale: 0.97 },
};

const contentVariants: Variants = {
	rest: { opacity: 0.85 },
	hover: { opacity: 1 },
	tap: { opacity: 1 },
};

const JButton: React.FC<JButtonProps> = ({ href, lang, disabled, children, className, onClick, title, childrenClassName }) => {
	const baseClassName = `
		group relative isolate overflow-hidden flex items-center justify-center leading-none font-medium
		backdrop-blur-xl border border-white/[0.08]
		shadow-[0_2px_6px_-2px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)]
		focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40
		${lang ? 'bg-amber-500/[0.06] text-amber-200/80 hover:border-amber-500/30 hover:bg-amber-500/[0.09] hover:text-amber-100' : 'bg-neutral-900/[0.55] text-neutral-200 hover:border-white/[0.14] hover:bg-white/[0.03] hover:text-white'}
		${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
		size-8 sm:size-[34px] rounded-lg p-1.5
		${className || ''}
	`;

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		onClick?.(e);
	};

	const interactionProps = {
		className: baseClassName,
		initial: 'rest' as const,
		animate: 'rest' as const,
		variants: interactionVariants,
		transition: silkSpring,
		whileHover: disabled ? undefined : 'hover',
		whileTap: disabled ? undefined : 'tap',
		title,
	};

	const content = (
		<>
			<span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

			<span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />

			<motion.span
				className={`relative z-10 flex  items-center justify-center w-full h-full leading-none ${childrenClassName}`}
				variants={contentVariants}>
				{children}
			</motion.span>
		</>
	);

	if (href && !disabled) {
		return (
			<motion.a
				{...interactionProps}
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				onClick={onClick}>
				{content}
			</motion.a>
		);
	}

	return (
		<motion.button
			{...interactionProps}
			type="button"
			disabled={disabled}
			onClick={handleClick}>
			{content}
		</motion.button>
	);
};

export default JButton;
