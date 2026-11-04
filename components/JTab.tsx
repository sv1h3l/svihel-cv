import React from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

interface TabProps {
	labelCZ: string;
	labelEN: string;
	imageSrc?: string;
	imageAlt?: string;
	index?: string;
	children: React.ReactNode;
	show: boolean;
	isCzech: boolean;
	lastTab?: boolean;
	revealOnScroll?: boolean;
}

const silkSpring = { type: 'spring' as const, stiffness: 260, damping: 30 };

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: -8 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.42, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.16 },
	},
};

const contentVariants: Variants = {
	hidden: { opacity: 0, y: -8 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const headingVariants: Variants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: { duration: 0.2, ease: 'easeOut' },
	},
	exit: { opacity: 0, transition: { duration: 0.18, ease: 'easeOut' } },
};

export default function JTab({ labelCZ, labelEN, index, children, show, isCzech, lastTab, revealOnScroll }: TabProps) {
	return (
		<motion.section
			className={`
				relative isolate w-full max-w-4xl overflow-hidden rounded-3xl mt-6 sm:mt-8 p-4 sm:p-7 lg:p-8
				bg-gradient-to-b from-[#161515]/[0.85] via-[#101010]/[0.75] to-[#0c0c0c]/[0.85]
				border border-neutral-800/75
				shadow-[0_4px_24px_-8px_rgba(0,0,0,0.55)]
				backdrop-blur-xl transition-colors duration-700 ease-out
				${lastTab ? 'mb-10 lg:mb-16' : ''}
			`}
			variants={revealOnScroll ? undefined : sectionVariants}
			animate={show ? undefined : "hidden"}>
			<span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

			<div className="pointer-events-none absolute -top-24 -right-24 size-60 rounded-full bg-amber-500/[0.03] blur-3xl" />

			<div className="pointer-events-none absolute -bottom-24 -left-24 size-48 rounded-full bg-white/[0.02] blur-2xl" />

			<motion.header
				variants={contentVariants}
				animate={revealOnScroll ? "hidden" : undefined}
				whileInView={revealOnScroll ? "show" : undefined}
				viewport={{ once: true, margin: "0px 0px -48px 0px" }} className="relative z-10 flex items-center gap-3 leading-none">
				{index && (
					<>
						<span className="font-mono text-[11px] font-medium leading-none tracking-[0.25em] text-neutral-500 tabular-nums">{index}</span>
						<span
							className="h-5 w-px bg-neutral-700/60"
							aria-hidden="true"
						/>
					</>
				)}

				<AnimatePresence
					mode="wait"
					initial={false}>
					<motion.h3
						key={isCzech ? 'cz' : 'en'}
						variants={headingVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						className="text-lg sm:text-xl font-semibold leading-none tracking-tight text-neutral-100 ml-0.5">
						{isCzech ? labelCZ : labelEN}
					</motion.h3>
				</AnimatePresence>
			</motion.header>

			<motion.div variants={revealOnScroll ? undefined : contentVariants} className="relative my-5 h-px w-full bg-gradient-to-r from-transparent via-neutral-700/60 via-5% to-transparent" />

			<motion.div variants={revealOnScroll ? undefined : contentVariants} className="relative z-10 text-neutral-300 leading-relaxed">{children}</motion.div>
		</motion.section>
	);
}