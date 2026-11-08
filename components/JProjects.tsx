import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import JIcon from './JIcon';
import { statusBadgeClass, statusStyles } from './statusStyles';

export default function JProjects({ isCzech, children }: { isCzech: boolean; children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const reducedMotion = useReducedMotion();
	const panelId = useId();

	return (
		<section className="mt-8 pb-8 sm:mt-10 sm:pb-10">
			<button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setIsOpen(!isOpen)} className={`${statusBadgeClass} ${statusStyles.completed} uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 active:scale-[0.97]`}>
				{isCzech ? 'Projekty' : 'Projects'}
				<motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} className="inline-flex">
					<JIcon name="expand_more" badge />
				</motion.span>
			</button>
			<div id={panelId}>
				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.35, ease: 'easeInOut' }} className="overflow-hidden [&>*:last-child]:mb-0">
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
}
