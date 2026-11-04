import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20,300,0,0&amp;icon_names=arrow_outward,call,chevron_left,chevron_right,close,content_copy,description,expand_more,mail,photo_library,play_circle&amp;display=block" />
			</Head>
			<body className="bg-neutral-950 text-neutral-300 antialiased selection:bg-neutral-800 selection:text-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
