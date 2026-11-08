import { motion } from 'framer-motion';

const silkSpring = { type: 'spring' as const, stiffness: 260, damping: 30 };

export default function JSkillPill({ label }: { label: string }) {
	return (
		<motion.span
			whileHover={{ y: -2 }}
			transition={silkSpring}
			className="inline-flex h-6 cursor-default select-none items-center justify-center rounded-lg border border-neutral-700/70 bg-gradient-to-b from-[#222222] to-[#151515] px-3 text-xs font-medium leading-none text-neutral-300 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.8)] hover:border-neutral-600/60 sm:h-[26px]">
			{label}
		</motion.span>
	);
}
