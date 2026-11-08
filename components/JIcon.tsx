import Image from 'next/image';

const icons = {
	arrow_outward: { file: 'link.svg' },
	call: { file: 'phone.svg' },
	chevron_left: { file: 'arrow.svg', rotation: 'rotate-180' },
	chevron_right: { file: 'arrow.svg' },
	close: { file: 'close.svg' },
	content_copy: { file: 'copy.svg' },
	description: { file: 'document.svg' },
	expand_more: { file: 'arrow.svg', rotation: 'rotate-90' },
	github: { file: 'git.svg' },
	linkedin: { file: 'in.svg' },
	mail: { file: 'mail.svg' },
	photo_library: { file: 'image.svg' },
	play_circle: { file: 'play.svg' },
} satisfies Record<string, { file: string; rotation?: string }>;

interface JIconProps {
	name: keyof typeof icons;
	className?: string;
	badge?: boolean;
}

export default function JIcon({ name, className = '', badge = false }: JIconProps) {
	const icon: { file: string; rotation?: string } = icons[name];
	if (badge) {
		return <span aria-hidden="true" className={`inline-block size-3.5 shrink-0 bg-current ${icon.rotation ?? ''} ${className}`} style={{ mask: `url(/icons/${icon.file}) center / contain no-repeat` }} />;
	}
	return <Image src={`/icons/${icon.file}`} alt="" aria-hidden="true" width={20} height={20} className={`size-5 shrink-0 ${icon.rotation ?? ''} ${className}`} />;
}
