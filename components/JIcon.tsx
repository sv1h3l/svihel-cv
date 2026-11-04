interface JIconProps {
	name: 'arrow_outward' | 'call' | 'chevron_left' | 'chevron_right' | 'close' | 'content_copy' | 'description' | 'expand_more' | 'mail' | 'photo_library' | 'play_circle';
	className?: string;
}

export default function JIcon({ name, className = '' }: JIconProps) {
	return <span aria-hidden="true" className={`material-symbols-rounded ${className}`}>{name}</span>;
}
