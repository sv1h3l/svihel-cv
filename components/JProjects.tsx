import { useId, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import JIcon from './JIcon';
import { statusBadgeClass, statusStyles } from './statusStyles';

export default function JProjects({ isCzech, children }: { isCzech: boolean; children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const reducedMotion = useReducedMotion();
	const panelId = useId();

	return (
		<section className="mt-8 pb-8 last:pb-0 sm:mt-10 sm:pb-10 sm:last:pb-0">
			<button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setIsOpen(!isOpen)} className={`${statusBadgeClass} ${statusStyles.completed} uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 active:scale-[0.97]`}>
				{isCzech ? 'Projekty' : 'Projects'}
				<motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} className="inline-flex">
					<JIcon name="expand_more" badge />
				</motion.span>
			</button>
			<motion.div
				id={panelId}
				aria-hidden={!isOpen}
				initial={false}
				animate={isOpen ? { display: 'block', height: 'auto', opacity: 1 } : { height: 0, opacity: 0, transitionEnd: { display: 'none' } }}
				transition={{ duration: reducedMotion ? 0 : 0.35, ease: 'easeInOut' }}
				className="overflow-hidden [&>*:last-child]:mb-0">
				{children}
			</motion.div>
		</section>
	);
}
