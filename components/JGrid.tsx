import React from 'react';
import { motion, type Variants } from 'framer-motion';
import JIcon from './JIcon';
import JSkillPill from './JSkillPill';
import { statusStyles } from './statusStyles';
import JBadge, { neutralBadgeStyle } from './JBadge';

interface GridRow {
	key: string;
	goldValue?: string;
	doNotSeparate?: string;
	primaryValue: string;
	secondaryValue?: string;
	tertiaryValue?: string;
}

interface SkillsGridProps {
	gridArray: GridRow[];
	revealOnScroll?: boolean;
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
			container: statusStyles.inProgress,
			divider: 'bg-amber-500/20',
			icon: 'text-amber-200/70',
		};
	}

	if (upperKey.includes('DOKONČENÝ') || upperKey.includes('COMPLETED')) {
		return {
			dot: 'bg-emerald-400/60',
			container: statusStyles.completed,
			divider: 'bg-emerald-500/20',
			icon: 'text-emerald-200/70',
		};
	}

	if (upperKey.includes('PLÁNOVANÝ') || upperKey.includes('PLANNED')) {
		return {
			dot: 'bg-indigo-400/60',
			container: statusStyles.planned,
			divider: 'bg-indigo-500/20',
			icon: 'text-indigo-200/70',
		};
	}

	return {
		dot: null,
		container: neutralBadgeStyle,
		divider: 'bg-neutral-700/40',
		icon: 'text-neutral-500',
	};
}

export default function JGrid({ gridArray, revealOnScroll }: SkillsGridProps) {
	const renderBadge = (gridRow: GridRow) => {
		const tone = statusTone(gridRow.key);
		const hasAction = Boolean(gridRow.tertiaryValue && gridRow.tertiaryValue !== 'disable');

		const badge = (
			<JBadge className={tone.container}>
				{tone.dot && (gridRow.key.includes('PROBÍHAJÍCÍ') || gridRow.key.includes('IN PROGRESS')) && (
					<span
						className="status-indicator text-amber-400/60"
						aria-hidden="true"
					/>
				)}
				<span className="translate-y-px">{gridRow.key}</span>
				{hasAction && (
					<>
						<span
							className={`w-px h-3 ${tone.divider}`}
							aria-hidden="true"
						/>
						<JIcon
							name="arrow_outward"
							className={tone.icon}
							badge
						/>
					</>
				)}
			</JBadge>
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
			variants={revealOnScroll ? { hidden: {}, show: {} } : containerVariants}
			initial="hidden"
			animate={revealOnScroll ? 'hidden' : 'show'}
			whileInView={revealOnScroll ? 'show' : undefined}
			viewport={{ once: true, margin: '0px 0px -112px 0px' }}>
			{gridArray.map((gridRow, index) => {
				const isCommaSeparatedList = (gridRow.primaryValue.includes(',') && !gridRow.goldValue) && !gridRow.doNotSeparate;
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
										<JSkillPill
											key={sIdx}
											label={skill}
										/>
									))}
								</div>
							:	<div>
									<div className="flex flex-wrap items-center gap-2">
										{gridRow.goldValue && (
											<span className="inline-flex items-center justify-center rounded-md border border-amber-500/15 bg-amber-500/[0.06] h-6 sm:h-[26px] pl-2.5 pr-1.5 font-mono text-[12px] font-bold leading-none text-amber-200/70">
												{gridRow.goldValue}
											</span>
										)}
										<span className="font-medium text-neutral-100 text-[15px] tracking-tight">{gridRow.primaryValue}</span>
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
