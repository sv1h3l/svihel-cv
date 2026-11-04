import React from 'react';
import { motion, type Variants } from 'framer-motion';
import JBorderTop from './JBorderTop';

interface JListProps {
	header: string;
	label: string;
	company: boolean;
	job?: string;
	firstCard: boolean;
	lastCard?: boolean;
	isCzech?: boolean;
	borderTop?: boolean;
	values: string[];
	children?: React.ReactNode;
}

const silkSpring = { type: 'spring' as const, stiffness: 260, damping: 30 };

const containerVariants: Variants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.08, delayChildren: 0.05 },
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 8 },
	show: {
		opacity: 1,
		y: 0,
		transition: silkSpring,
	},
};

export default function JList({ header, label, company, job, firstCard, lastCard, borderTop, values, children }: JListProps) {
	const spacing = `${firstCard ? 'mt-0' : 'mt-8 sm:mt-10'} ${lastCard ? 'mb-2' : 'mb-9'}`;

	return (
		<motion.div
			className={`relative ${spacing}`}
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.15 }}>
			{borderTop && <JBorderTop />}

			<motion.div
				variants={itemVariants}
				className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${borderTop ? 'pt-8' : ''}`}>
				<div className="min-w-0">
					<div
						className={`mb-2.5 inline-flex items-center justify-center rounded-md border h-6 sm:h-[26px] px-3 pt-[0.5px] font-mono text-[10px] uppercase leading-none tracking-widest ${
							company ?
								'border-neutral-700/50 bg-neutral-800/60 text-neutral-200/90'
							:	'border-white/[0.08] bg-neutral-900/40 text-neutral-400/80'
						}`}>
						{header}
					</div>

					<h4 className="text-xl sm:text-2xl font-semibold leading-tight tracking-tight text-neutral-100">{label}</h4>

					{company && job && (
						<div className="mt-2.5">
							<span className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] h-6 sm:h-[26px] px-3 pt-[0.5px] font-mono text-[11px] leading-none tracking-wide text-amber-200/80">{job}</span>
						</div>
					)}
				</div>

				{children && <div className="flex items-center gap-2 self-start sm:self-center">{children}</div>}
			</motion.div>

			<motion.div
				variants={itemVariants}
				className="mt-4">
				{company ?
					<ul className="space-y-3 text-neutral-300">
						{values.map((value, index) => (
							<li
								key={index}
								className="flex items-start gap-3.5">
								<span
									className="mt-[0.35rem] inline-block shrink-0 select-none text-sm leading-none text-neutral-600"
									aria-hidden="true">
									—
								</span>
								<span className="text-sm leading-relaxed text-neutral-300/90">{value}</span>
							</li>
						))}
					</ul>
				:	<div className="space-y-3.5 text-sm leading-relaxed text-neutral-300/90">
						{values.map((value, index) => (
							<p key={index}>{value}</p>
						))}
					</div>
				}
			</motion.div>
		</motion.div>
	);
}