import type { ReactNode } from 'react';
import { statusBadgeClass } from './statusStyles';

export const neutralBadgeStyle = 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700/60 hover:bg-neutral-800/50';

export default function JBadge({ children, className = neutralBadgeStyle }: { children: ReactNode; className?: string }) {
	return <span className={`${statusBadgeClass} ${className}`}>{children}</span>;
}
