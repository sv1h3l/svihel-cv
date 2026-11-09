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
				tab-surface relative isolate w-full max-w-4xl overflow-hidden rounded-3xl mt-8 sm:mt-10 p-4 pb-8 sm:p-7 sm:pb-[34px] lg:p-8 lg:pb-9
				border border-neutral-800/75
				shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_12px_32px_-20px_rgba(0,0,0,0.8)]
				${lastTab ? 'mb-10 lg:mb-16' : ''}
			`}
			variants={revealOnScroll ? undefined : sectionVariants}
			animate={show ? undefined : "hidden"}>
			<span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

			<motion.header
				variants={contentVariants}
				animate={revealOnScroll ? "hidden" : undefined}
				whileInView={revealOnScroll ? "show" : undefined}
				viewport={{ once: true, margin: "0px 0px -112px 0px" }} className="relative z-10 flex items-center gap-3 leading-none">
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

			<motion.div variants={revealOnScroll ? undefined : contentVariants} className="relative mt-4 mb-5 h-px w-full bg-gradient-to-r from-transparent via-neutral-700/60 via-5% to-transparent sm:mb-5" />

			<motion.div variants={revealOnScroll ? undefined : contentVariants} className="relative z-10 text-neutral-300 leading-relaxed sm:[&>div:first-child]:mt-0">{children}</motion.div>
		</motion.section>
	);
}
