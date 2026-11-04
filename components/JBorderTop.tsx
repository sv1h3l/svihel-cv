import { motion } from 'framer-motion';

const silkSpring = { type: 'spring' as const, stiffness: 260, damping: 30 };

export default function JBorderTop() {
	return (
		<motion.div
			className="pointer-events-none absolute left-0 right-0 -top-px origin-center select-none"
			initial={{ opacity: 0, scaleX: 0 }}
			animate={{ opacity: 1, scaleX: 1 }}
			transition={silkSpring}>
			<div className="relative h-px w-full bg-gradient-to-r from-transparent via-neutral-700/60 via-5% to-transparent" />
		</motion.div>
	);
}