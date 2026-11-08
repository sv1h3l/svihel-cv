import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="bg-neutral-950 text-neutral-300 antialiased selection:bg-neutral-800 selection:text-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
