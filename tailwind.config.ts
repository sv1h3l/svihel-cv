import type { Config } from 'tailwindcss';

// Profi "seniorní" trik: Vygenerujeme 24-mřížku dynamicky místo psaní 48 řádků kódu
const grid24 = Array.from({ length: 24 }, (_, i) => i + 1).reduce(
	(acc, curr) => {
		acc[`${curr}/24`] = `${(curr / 24) * 100}%`;
		return acc;
	},
	{} as Record<string, string>,
);

const config: Config = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			screens: {
				xs: '360px',
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			// Tvé dřívější custom mezery (h-22, pt-1.5)
			spacing: {
				'22': '5.5rem',
			},
			// Tvé dřívější custom okraje (border-t-12, border-l-12)
			borderWidth: {
				'12': '12px',
			},
			// Tvé dřívější custom minimální šířky (min-w-xs atd.)
			minWidth: {
				xs: '20rem',
				sm: '24rem',
				md: '28rem',
				lg: '32rem',
				xl: '36rem',
				'2xl': '42rem',
				'3xl': '48rem',
				'4xl': '56rem',
				'5xl': '64rem',
				'6xl': '72rem',
				'7xl': '80rem',
			},
			// Vložení vygenerované 24-mřížky pro šířku i výšku (+ specifikum 1/8)
			width: {
				...grid24,
				'1/8': '12.5%',
			},
			height: {
				...grid24,
			},
		},
	},
	plugins: [],
};

export default config;
