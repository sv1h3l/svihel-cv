export const statusStyles = {
	inProgress: 'border-amber-500/15 bg-amber-500/[0.05] text-amber-200/60 hover:border-amber-500/25 hover:bg-amber-500/[0.08]',
	completed: 'border-emerald-500/15 bg-emerald-500/[0.05] text-emerald-200/60 hover:border-emerald-500/25 hover:bg-emerald-500/[0.08]',
	planned: 'border-indigo-500/15 bg-indigo-500/[0.05] text-indigo-200/60 hover:border-indigo-500/25 hover:bg-indigo-500/[0.08]',
} as const;

export const statusBadgeClass = 'inline-flex items-center justify-center gap-2 rounded-lg border h-6 sm:h-[26px] px-3 font-mono text-[11px] font-medium leading-none tracking-wider transition-colors duration-300 ease-out';
