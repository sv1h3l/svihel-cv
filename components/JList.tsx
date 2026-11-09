import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import JBorderTop from './JBorderTop';
import JBadge from './JBadge';
import JButton from './JButton';
import JIcon from './JIcon';
import JSkillPill from './JSkillPill';
import { statusBadgeClass, statusStyles } from './statusStyles';

interface JListProps {
	header: string;
	label: string;
	description?: string;
	displayDescription?: string;
	technologies?: string[];
	company: boolean;
	job?: string;
	period?: string;
	links?: string[];
	firstCard: boolean;
	lastCard?: boolean;
	showProjectLabel?: boolean;
	isCzech?: boolean;
	borderTop?: boolean;
	values: string[];
	children?: React.ReactNode;
}

export default function JList({ header, label, description, displayDescription, technologies, company, job, period, links, firstCard, lastCard, borderTop, values, children, isCzech, showProjectLabel = true }: JListProps) {
	const reducedMotion = useReducedMotion();
	const spacing = `${firstCard || borderTop ? 'mt-0' : 'mt-8 sm:mt-10'} ${lastCard ? 'mb-2' : 'mb-9'}`;
	const actions = (children || Boolean(links?.length)) && (
		<div className="ml-auto mr-1 flex shrink-0 items-center gap-2 [&_a]:!size-[30px] [&_button]:!size-[30px]">
			{links?.map((link) => (
				<JButton key={link} href={link} title={new URL(link).hostname}>
					<JIcon name="arrow_outward" className="text-neutral-400" />
				</JButton>
			))}
			{children}
		</div>
	);

	return (
		<motion.div
			className={`relative ${spacing}`}
			initial={reducedMotion ? false : { opacity: 0, y: -8 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "0px 0px -112px 0px" }}
			transition={{ duration: 0.55, ease: 'easeOut' }}>
			{borderTop && <JBorderTop />}

			<div className={borderTop ? 'pt-8 sm:pt-10' : ''}>
				<div className="min-w-0 w-full">
					<div className="flex flex-col items-start gap-2.5">
						{(company || showProjectLabel || period) && <div className="flex flex-wrap items-center gap-2">
							{(company || showProjectLabel) && <span className={`uppercase ${statusBadgeClass} ${company ? statusStyles.planned : statusStyles.completed}`}>{company ? header : isCzech ? 'Projekty' : 'Projects'}</span>}
							{period && <JBadge><span className="translate-y-px">{period}</span></JBadge>}
						</div>}
						<div className="flex w-full flex-wrap items-center gap-x-4 gap-y-2">
							<h4 className={`max-w-full leading-tight tracking-tight [overflow-wrap:anywhere] ${company ? 'text-lg sm:text-xl font-semibold text-neutral-100' : 'text-lg sm:text-xl font-medium text-neutral-200'}`}>{label}</h4>
							{actions}
						</div>
					</div>

					{description && <div className="mt-3 max-w-2xl space-y-3 text-sm leading-relaxed text-neutral-400">{description.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}

					{company && job && (
						<div className="mt-8 flex flex-col items-start gap-2.5">
							<span className={`uppercase ${statusBadgeClass} ${statusStyles.inProgress}`}>Role</span>
							<h5 className="text-[1.2rem] sm:text-[1.4rem] font-medium leading-tight tracking-tight text-neutral-200">{job}</h5>
						</div>
					)}
				</div>
			</div>

			<div className="mt-4 pl-4">
				{technologies && technologies.length > 0 && (
					<ul className="mb-4 flex flex-wrap gap-2" aria-label={isCzech ? 'Použité technologie' : 'Technologies used'}>
						{technologies.map((technology) => (
							<li key={technology}><JSkillPill label={technology} /></li>
						))}
					</ul>
				)}
				{displayDescription && <p className="mb-4 text-sm leading-relaxed text-neutral-300/90">{displayDescription}</p>}
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

			</div>
		</motion.div>
	);
}
