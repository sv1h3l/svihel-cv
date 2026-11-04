import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface GridRow {
	key: string;
	goldValue?: string;
	primaryValue: string;
	secondaryValue?: string;
	tertiaryValue?: string;
}

interface SkillsGridProps {
	gridArray: GridRow[];
}

const silkSpring = { type: 'spring' as const, stiffness: 260, damping: 30 };

const containerVariants: Variants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.08, delayChildren: 0.05 },
	},
};

const rowVariants: Variants = {
	hidden: { opacity: 0, y: 8 },
	show: {
		opacity: 1,
		y: 0,
		transition: silkSpring,
	},
};

function statusTone(key: string) {
	const upperKey = key.toUpperCase();

	if (upperKey.includes('PROBÍHAJÍCÍ') || upperKey.includes('IN PROGRESS')) {
		return {
			dot: 'bg-amber-400/60',
			container: 'border-amber-500/15 bg-amber-500/[0.05] text-amber-200/60 hover:border-amber-500/25 hover:bg-amber-500/[0.08]',
			divider: 'bg-amber-500/20',
			icon: 'text-amber-200/70',
		};
	}

	if (upperKey.includes('DOKONČENÝ') || upperKey.includes('COMPLETED')) {
		return {
			dot: 'bg-emerald-400/60',
			container: 'border-emerald-500/15 bg-emerald-500/[0.05] text-emerald-200/60 hover:border-emerald-500/25 hover:bg-emerald-500/[0.08]',
			divider: 'bg-emerald-500/20',
			icon: 'text-emerald-200/70',
		};
	}

	if (upperKey.includes('PLÁNOVANÝ') || upperKey.includes('PLANNED')) {
		return {
			dot: 'bg-indigo-400/60',
			container: 'border-indigo-500/15 bg-indigo-500/[0.05] text-indigo-200/60 hover:border-indigo-500/25 hover:bg-indigo-500/[0.08]',
			divider: 'bg-indigo-500/20',
			icon: 'text-indigo-200/70',
		};
	}

	return {
		dot: null,
		container: 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700/60 hover:bg-neutral-800/50',
		divider: 'bg-neutral-700/40',
		icon: 'text-neutral-500',
	};
}

export default function JGrid({ gridArray }: SkillsGridProps) {
	const renderBadge = (gridRow: GridRow) => {
		const tone = statusTone(gridRow.key);
		const hasAction = Boolean(gridRow.tertiaryValue && gridRow.tertiaryValue !== 'disable');

		const badge = (
			<span
				className={`inline-flex items-center justify-center gap-2 rounded-lg border h-6 sm:h-[26px] px-3 pt-[0.5px] font-mono text-[11px] font-medium leading-none tracking-wider transition-colors duration-300 ease-out ${tone.container}`}>
				{tone.dot && (gridRow.key.includes('PROBÍHAJÍCÍ') || gridRow.key.includes('IN PROGRESS')) && <span className={`size-1.5 rounded-full ${tone.dot}`} />}
				{gridRow.key}
				{hasAction && (
					<>
						<span
							className={`w-px h-3 ${tone.divider}`}
							aria-hidden="true"
						/>
						<svg
							className={`size-4 ${tone.icon}`}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true">
							<path d="M7 17 17 7" />
							<path d="M7 7h10v10" />
						</svg>
					</>
				)}
			</span>
		);

		if (!hasAction) {
			return badge;
		}

		return (
			<a
				href={gridRow.tertiaryValue}
				target="_blank"
				rel="noopener noreferrer"
				title={gridRow.primaryValue}
				className="cursor-pointer rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
				{badge}
			</a>
		);
	};

	return (
		<motion.div
			className="flex flex-col gap-y-8 md:gap-y-6"
			variants={containerVariants}
			initial="hidden"
			animate="show">
			{gridArray.map((gridRow, index) => {
				const isCommaSeparatedList = gridRow.primaryValue.includes(',') && !gridRow.goldValue;
				const skillsList = isCommaSeparatedList ? gridRow.primaryValue.split(',').map((s) => s.trim()) : [];

				return (
					<motion.div
						key={index}
						variants={rowVariants}
						className="grid grid-cols-1 md:grid-cols-[minmax(140px,auto)_1fr] items-center gap-x-8 gap-y-3">
						<div className="flex items-center gap-x-2.5 text-start md:justify-end md:text-end">{renderBadge(gridRow)}</div>

						<div className="ml-4 md:ml-0">
							{isCommaSeparatedList ?
								<div className="flex flex-wrap gap-2 ">
									{skillsList.map((skill, sIdx) => (
										<motion.span
											key={sIdx}
											whileHover={{ y: -1 }}
											transition={silkSpring}
											className="inline-flex cursor-default select-none items-center justify-center rounded-lg border border-neutral-700/40 bg-gradient-to-b from-neutral-800/60 to-neutral-900/60 h-6 sm:h-[26px] px-3 pt-[0.5px] text-xs font-medium leading-none text-neutral-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.4)] hover:border-neutral-600/60 hover:text-neutral-200">
											{skill}
										</motion.span>
									))}
								</div>
							:	<div>
									<div className="flex flex-wrap items-center gap-2">
										{gridRow.goldValue && (
											<span className="inline-flex items-center justify-center rounded-md border border-amber-500/15 bg-amber-500/[0.06] h-6 sm:h-[26px] pl-2.5 pr-1.5 pt-[1.5px] font-mono text-[12px] font-bold leading-none text-amber-200/70">
												{gridRow.goldValue}
											</span>
										)}
										<span className="font-medium text-neutral-100 text-sm tracking-tight">{gridRow.primaryValue}</span>
									</div>
									{gridRow.secondaryValue && <address className="not-italic text-xs sm:text-sm text-neutral-400/80 mt-1 leading-relaxed">{gridRow.secondaryValue}</address>}
								</div>
							}
						</div>
					</motion.div>
				);
			})}
		</motion.div>
	);
}
