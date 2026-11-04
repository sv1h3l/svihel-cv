import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

// Načtení fontu Inter (optimalizováno Next.js)
const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={`${inter.className} font-sans`}>
			<Component {...pageProps} />
		</main>
	);
}
