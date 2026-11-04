import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import JBorderTop from './JBorderTop';
import { statusBadgeClass, statusStyles } from './statusStyles';

interface JListProps {
	header: string;
	label: string;
	description?: string;
	displayDescription?: string;
	technologies?: string[];
	company: boolean;
	job?: string;
	firstCard: boolean;
	lastCard?: boolean;
	showProjectLabel?: boolean;
	isCzech?: boolean;
	borderTop?: boolean;
	values: string[];
	children?: React.ReactNode;
}

export default function JList({ header, label, description, displayDescription, technologies, company, job, firstCard, lastCard, borderTop, values, children, isCzech, showProjectLabel = true }: JListProps) {
	const reducedMotion = useReducedMotion();
	const spacing = `${firstCard ? 'mt-0' : 'mt-8 sm:mt-10'} ${lastCard ? 'mb-2' : 'mb-9'}`;

	return (
		<motion.div
			className={`relative ${spacing}`}
			initial={reducedMotion ? false : { opacity: 0, y: -8 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "0px 0px -48px 0px" }}
			transition={{ duration: 0.55, ease: 'easeOut' }}>
			{borderTop && <JBorderTop />}

			<div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${borderTop ? 'pt-8' : ''}`}>
				<div className={company ? "min-w-0 w-full" : "min-w-0"}>
					<div className="flex flex-col items-start gap-2.5">
						{(company || showProjectLabel) && <span className={`uppercase ${statusBadgeClass} ${company ? statusStyles.planned : statusStyles.completed}`}>{company ? header : isCzech ? 'Projekty' : 'Projects'}</span>}
						<h4 className={`leading-tight tracking-tight ${company ? 'text-lg sm:text-xl font-semibold text-neutral-100' : 'text-lg sm:text-xl font-medium text-neutral-200'}`}>{label}</h4>
					</div>

					{description && <div className="mt-3 max-w-2xl space-y-3 text-sm leading-relaxed text-neutral-400">{description.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}

					{company && job && (
						<div className="mt-8 flex flex-col items-start gap-2.5">
							<span className={`uppercase ${statusBadgeClass} ${statusStyles.inProgress}`}>Role</span>
							<h5 className="text-[1.2rem] sm:text-[1.4rem] font-medium leading-tight tracking-tight text-neutral-200">{job}</h5>
						</div>
					)}
				</div>

				{children && <div className="flex items-center gap-2 self-start sm:self-center">{children}</div>}
			</div>

			<div className="mt-4 pl-4">
				{company ?
					<ul className="space-y-3 text-neutral-300">
						{values.map((value, index) => (
							<li
								key={index}
								className="flex items-start gap-3.5">
								<span
									className="mt-[0.65rem] h-px w-2 shrink-0 bg-neutral-600"
									aria-hidden="true"
								/>
								<span className="text-sm leading-relaxed text-neutral-300/90">{value}</span>
							</li>
						))}
					</ul>
				:	<div className="space-y-3.5 text-sm leading-relaxed text-neutral-300/90">
						{(displayDescription ? [displayDescription] : values).map((value, index) => (
							<p key={index}>{value}</p>
						))}
					</div>
				}
				{technologies && technologies.length > 0 && (
					<ul className="mt-4 flex flex-wrap gap-2" aria-label={isCzech ? 'Použité technologie' : 'Technologies used'}>
						{technologies.map((technology) => (
							<li key={technology} className="rounded-lg border border-neutral-700/70 bg-gradient-to-b from-[#222222] to-[#151515] px-3 py-1 text-xs font-medium text-neutral-300 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.8)]">{technology}</li>
						))}
					</ul>
				)}
			</div>
		</motion.div>
	);
}