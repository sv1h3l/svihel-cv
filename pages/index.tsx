import Head from 'next/head';
import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ArrowUpRight, FileText, Mail, Phone } from 'lucide-react';

import JButton from '@/components/JButton';
import JFullSizeImageButton from '@/components/JFullSizeImageButton';
import JGrid from '@/components/JGrid';
import JList from '@/components/JList';
import JTab from '@/components/JTab';

interface GeneralData {
	key: string;
	goldValue?: string;
	primaryValue: string;
	secondaryValue?: string;
	tertiaryValue?: string;
}

interface PersonalPageGeneralData {
	pageTitle: string;
	aboutMe: string;
	education: GeneralData[];
	employment: GeneralData[];
	certificates: GeneralData[];
	skills: GeneralData[];
}

interface ProjectsData {
	header: string;
	label: string;
	company: boolean;
	job: string;
	firstCard: boolean;
	values: string[];
}

interface PersonalPageProjectsData {
	companyHella: ProjectsData;
	projectUnitExplorer: ProjectsData;
	projectProjectServer: ProjectsData;
	selfEmployment: ProjectsData;
	oKrokNapred: ProjectsData;
	universityPalacky: ProjectsData;
	diplomaThesis: ProjectsData;
	bachelorThesis: ProjectsData;
	gymnasiumNovyJicin: ProjectsData;
	maturitaThesis: ProjectsData;
}

const silkSpring = { type: 'spring' as const, stiffness: 260, damping: 30 };

const heroVariants: Variants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.08, delayChildren: 0.05 },
	},
};

const heroItemVariants: Variants = {
	hidden: { opacity: 0, y: 8 },
	show: { opacity: 1, y: 0, transition: silkSpring },
};

const swapVariants: Variants = {
	initial: { opacity: 0, y: 4 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
	exit: { opacity: 0, y: -4, transition: { duration: 0.18, ease: 'easeOut' } },
};

function LanguageSwap({ languageKey, children }: { languageKey: string; children: ReactNode }) {
	return (
		<AnimatePresence
			mode="wait"
			initial={false}>
			<motion.div
				key={languageKey}
				variants={swapVariants}
				initial="initial"
				animate="animate"
				exit="exit">
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

export default function Index({
	personalPageGeneralDataEN,
	personalPageGeneralDataCZ,
	personalPageProjectsDataEN,
	personalPageProjectsDataCZ,
}: {
	personalPageGeneralDataEN: PersonalPageGeneralData;
	personalPageGeneralDataCZ: PersonalPageGeneralData;
	personalPageProjectsDataEN: PersonalPageProjectsData;
	personalPageProjectsDataCZ: PersonalPageProjectsData;
}) {
	const [isCzech, setIsCzech] = useState(false);

	const personalPageGeneralData = isCzech ? personalPageGeneralDataCZ : personalPageGeneralDataEN;
	const personalPageProjectsData = isCzech ? personalPageProjectsDataCZ : personalPageProjectsDataEN;

	return (
		<>
			<Head>
				<title>Jakub Švihel</title>
				<meta
					name="description"
					content="Portfolio Jakuba Švihla – full-stack vývojář, zkušenosti v komerční i akademické sféře, projekty, dovednosti a certifikáty."
				/>
				<meta
					name="keywords"
					content="Jakub Švihel, full-stack developer, portfolio, React, Next.js, Tailwind, TypeScript, projekty, certifikáty, dovednosti, vzdělání"
				/>
				<meta
					name="author"
					content="Jakub Švihel"
				/>
				<meta
					property="og:title"
					content="Jakub Švihel — Full-Stack Developer"
				/>
				<meta
					property="og:description"
					content="Portfolio Jakuba Švihla – full-stack vývojář, zkušenosti v komerční i akademické sféře, projekty, dovednosti a certifikáty."
				/>
				<meta
					property="og:type"
					content="website"
				/>
				<meta
					property="og:url"
					content="https://svihel-cv.web.app/"
				/>
				<meta
					property="og:image"
					content="https://svihel-cv.web.app/images/profile_picture.webp"
				/>
				<meta
					name="theme-color"
					content="#0a0a0a"
				/>
				<link
					rel="icon"
					href="/icons/favicon.ico"
				/>
				<link
					rel="canonical"
					href="https://svihel-cv.web.app/"
				/>
			</Head>

			<div className="relative min-h-screen  bg-neutral-950 text-neutral-300 overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200">
				<div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-amber-500/[0.04] via-neutral-900/0 to-transparent blur-3xl -z-10" />

				<main className="px-4 sm:px-6 lg:px-8 py-12 sm:py-12 flex flex-col items-center max-w-4xl mx-auto w-full">
					<motion.header
						className="relative isolate xs:max-w-[22rem] sm:max-w-[32rem] md:max-w-[35rem] w-full rounded-3xl p-10 sm:p-8 md:p-10 mb-6 sm:mb-6 bg-gradient-to-b from-neutral-900/80 via-neutral-900/50 to-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700/80 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors duration-700 ease-out overflow-hidden"
						variants={heroVariants}
						initial="hidden"
						animate="show">
						<span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

						<div className="pointer-events-none absolute -top-20 -right-20 size-60 rounded-full bg-amber-500/[0.03] blur-3xl" />

						<motion.div
							variants={heroItemVariants}
							className="absolute top-5 right-5 sm:top-3 sm:right-3 z-20">
							<JButton
								onClick={() => setIsCzech(!isCzech)}
								lang
								className=" rounded-lg font-mono flex text-[11px]  tracking-widest"
								childrenClassName='mt-1'>
								{isCzech ? 'EN' : 'CS'}
							</JButton>
						</motion.div>

						<motion.div
							variants={heroVariants}
							className="flex flex-col sm:flex-row items-center text-center justify-evenly gap-4 md:gap-8">
							<motion.div
								variants={heroItemVariants}
								className="relative flex justify-center flex-shrink-0">
								<div className="relative size-28 sm:size-36 rounded-full overflow-hidden border border-white/[0.06]">
									<Image
										className="object-cover "
										src="/images/cv-pic.png"
										alt="Jakub Švihel"
										fill
										priority
									/>
								</div>
							</motion.div>

							<motion.div
								variants={heroItemVariants}
								className="flex flex-col items-center text-center ">
								<h1 className=" font-bold text-4xl sm:text-[46px] md:text-5xl leading-tight md:leading-none text-neutral-100 tracking-tight ">{personalPageGeneralData.pageTitle}</h1>

								<h2 className="mt-2 sm:mt-2.5 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase leading-none text-neutral-400">FULL-STACK DEVELOPER</h2>

								<div className="mt-2 flex text-[7px] sm:text-[9px] md:text-[10px] items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-400/80">
									<span className="relative inline-flex size-1.5 shrink-0">
										<span
											className="absolute inset-0 rounded-full bg-emerald-400/15 blur-[2px]"
											aria-hidden="true"
										/>
										<motion.span
											className="relative inline-flex size-1.5 rounded-full bg-emerald-400/80"
											animate={{ opacity: [0.35, 1, 0.35] }}
											transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
										/>
									</span>

									<span className=" pt-[0.1rem]">
										<AnimatePresence
											mode="wait"
											initial={false}>
											<motion.span
												key={isCzech ? 'cz' : 'en'}
												variants={swapVariants}
												initial="initial"
												animate="animate"
												exit="exit">
												{isCzech ? 'Otevřen spolupráci' : 'Open to collaboration'}
											</motion.span>
										</AnimatePresence>
									</span>

									<span
										className="select-none pt-[0.1rem]"
										aria-hidden="true">
										|
									</span>

									<span className=" pt-[0.1rem]">CZ / Remote</span>
								</div>
							</motion.div>
						</motion.div>
					</motion.header>

					<JTab
						labelCZ="O mně"
						labelEN="About me"
						index="01"
						show
						isCzech={isCzech}>
						<div className="relative min-h-[110px] sm:min-h-[90px]">
							<AnimatePresence
								mode="wait"
								initial={false}>
								<motion.p
									key={isCzech ? 'cz' : 'en'}
									variants={swapVariants}
									initial="initial"
									animate="animate"
									exit="exit"
									className="leading-relaxed text-sm sm:text-base text-neutral-300/90">
									{personalPageGeneralData.aboutMe}
								</motion.p>
							</AnimatePresence>
						</div>

						<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
							<motion.a
								href="tel:+420733249479"
								whileHover={{ y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={silkSpring}
								className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-neutral-900/60 border border-neutral-800/80 hover:border-white/[0.12] hover:bg-white/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
								<Phone
									className="size-4 shrink-0 text-neutral-500 group-hover:text-neutral-300"
									strokeWidth={1.5}
									aria-hidden="true"
								/>
								<span className="text-xs sm:text-sm font-medium text-neutral-300 group-hover:text-neutral-100">+420 733 249 479</span>
							</motion.a>

							<motion.a
								href="mailto:jakub.svihel@gnj.cz"
								whileHover={{ y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={silkSpring}
								className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-neutral-900/60 border border-neutral-800/80 hover:border-white/[0.12] hover:bg-white/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
								<Mail
									className="size-4 shrink-0 text-neutral-500 group-hover:text-neutral-300"
									strokeWidth={1.5}
									aria-hidden="true"
								/>
								<span className="text-xs sm:text-sm font-medium text-neutral-300 group-hover:text-neutral-100">jakub.svihel@gnj.cz</span>
							</motion.a>

							<motion.a
								href="https://www.linkedin.com/in/svihel-jakub"
								target="_blank"
								rel="noreferrer"
								whileHover={{ y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={silkSpring}
								className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-neutral-900/60 border border-neutral-800/80 hover:border-white/[0.12] hover:bg-white/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
								<svg
									className="size-4 shrink-0 stroke-neutral-500 group-hover:stroke-neutral-300"
									viewBox="0 0 24 24"
									fill="none"
									strokeWidth="1.6"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true">
									<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
									<rect
										width="4"
										height="12"
										x="2"
										y="9"
									/>
									<circle
										cx="4"
										cy="4"
										r="2"
									/>
								</svg>
								<span className="text-xs sm:text-sm font-medium text-neutral-300 group-hover:text-neutral-100 truncate">linkedin.com/in/svihel-jakub</span>
							</motion.a>

							<motion.a
								href="https://github.com/sv1h3l"
								target="_blank"
								rel="noreferrer"
								whileHover={{ y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={silkSpring}
								className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-neutral-900/60 border border-neutral-800/80 hover:border-white/[0.12] hover:bg-white/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
								<svg
									className="size-4 shrink-0 stroke-neutral-500 group-hover:stroke-neutral-300"
									viewBox="0 0 24 24"
									fill="none"
									strokeWidth="1.6"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true">
									<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
									<path d="M9 18c-4.51 2-5-2-7-2" />
								</svg>
								<span className="text-xs sm:text-sm font-medium text-neutral-300 group-hover:text-neutral-100">github.com/sv1h3l</span>
							</motion.a>
						</div>
					</JTab>

					<JTab
						labelCZ="Zaměstnání"
						labelEN="Employment"
						index="02"
						show
						isCzech={isCzech}>
						<LanguageSwap languageKey={isCzech ? 'cz' : 'en'}>
							<JGrid gridArray={personalPageGeneralData.employment} />
						</LanguageSwap>
					</JTab>

					<JTab
						labelCZ="Dovednosti"
						labelEN="Skills"
						index="03"
						show
						isCzech={isCzech}>
						<LanguageSwap languageKey={isCzech ? 'cz' : 'en'}>
							<JGrid gridArray={personalPageGeneralData.skills} />
						</LanguageSwap>
					</JTab>

					<JTab
						labelCZ="Vzdělání"
						labelEN="Education"
						index="04"
						show
						isCzech={isCzech}>
						<LanguageSwap languageKey={isCzech ? 'cz' : 'en'}>
							<JGrid gridArray={personalPageGeneralData.education} />
						</LanguageSwap>
					</JTab>

					<JTab
						labelCZ="Certifikáty"
						labelEN="Certificates"
						index="05"
						show
						isCzech={isCzech}>
						<LanguageSwap languageKey={isCzech ? 'cz' : 'en'}>
							<JGrid gridArray={personalPageGeneralData.certificates} />
						</LanguageSwap>
					</JTab>

					<motion.div
						className="relative my-16 sm:my-20 lg:my-24 w-full max-w-2xl flex items-center justify-center"
						initial={{ opacity: 0, y: 8 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={silkSpring}>
						<div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent" />
						<span className="absolute px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Portfolio</span>
					</motion.div>

					<JTab
						labelCZ="Komerční sféra"
						labelEN="Commercial sphere"
						index="06"
						show
						isCzech={isCzech}>
						{personalPageProjectsData && (
							<>
								<JList
									header={personalPageProjectsData.companyHella.header}
									label={personalPageProjectsData.companyHella.label}
									company={personalPageProjectsData.companyHella.company}
									job={personalPageProjectsData.companyHella.job}
									firstCard={personalPageProjectsData.companyHella.firstCard}
									isCzech={isCzech}
									values={personalPageProjectsData.companyHella.values}
								/>

								<JList
									header={personalPageProjectsData.projectUnitExplorer.header}
									label={personalPageProjectsData.projectUnitExplorer.label}
									company={personalPageProjectsData.projectUnitExplorer.company}
									firstCard={personalPageProjectsData.projectUnitExplorer.firstCard}
									values={personalPageProjectsData.projectUnitExplorer.values}
								/>

								<JList
									header={personalPageProjectsData.projectProjectServer.header}
									label={personalPageProjectsData.projectProjectServer.label}
									company={personalPageProjectsData.projectProjectServer.company}
									firstCard={personalPageProjectsData.projectProjectServer.firstCard}
									values={personalPageProjectsData.projectProjectServer.values}
								/>

								<JList
									header={personalPageProjectsData.selfEmployment.header}
									label={personalPageProjectsData.selfEmployment.label}
									company={personalPageProjectsData.selfEmployment.company}
									job={personalPageProjectsData.selfEmployment.job}
									firstCard={personalPageProjectsData.selfEmployment.firstCard}
									isCzech={isCzech}
									borderTop
									values={personalPageProjectsData.selfEmployment.values}
								/>

								<JList
									header={personalPageProjectsData.oKrokNapred.header}
									label={personalPageProjectsData.oKrokNapred.label}
									company={personalPageProjectsData.oKrokNapred.company}
									firstCard={personalPageProjectsData.oKrokNapred.firstCard}
									values={personalPageProjectsData.oKrokNapred.values}
									lastCard>
									<>
										<JButton
											href="https://oncology-x.web.app/"
											title="Open Project">
											<ArrowUpRight
												className="size-4 text-neutral-500 group-hover:text-neutral-300"
												strokeWidth={1.5}
												aria-hidden="true"
											/>
										</JButton>
										<JFullSizeImageButton imagesSrcs={['o_krok_napred-desktop', 'o_krok_napred-mobile']} />
									</>
								</JList>
							</>
						)}
					</JTab>

					<JTab
						labelCZ="Akademická sféra"
						labelEN="Academic sphere"
						index="07"
						show
						lastTab
						isCzech={isCzech}>
						{personalPageProjectsData && (
							<>
								<JList
									header={personalPageProjectsData.universityPalacky.header}
									label={personalPageProjectsData.universityPalacky.label}
									company={personalPageProjectsData.universityPalacky.company}
									firstCard={personalPageProjectsData.universityPalacky.firstCard}
									values={personalPageProjectsData.universityPalacky.values}
								/>

								<JList
									header={personalPageProjectsData.diplomaThesis.header}
									label={personalPageProjectsData.diplomaThesis.label}
									company={personalPageProjectsData.diplomaThesis.company}
									firstCard={personalPageProjectsData.diplomaThesis.firstCard}
									values={personalPageProjectsData.diplomaThesis.values}>
									<>
										<JButton
											href="https://theses.cz/id/9ub0w1/text.pdf"
											title="PDF Thesis">
											<FileText
												className="size-4 text-neutral-500 group-hover:text-neutral-300"
												strokeWidth={1.5}
												aria-hidden="true"
											/>
										</JButton>
										<JFullSizeImageButton imagesSrcs={['sports', 'diary', 'plan', 'plan-mobile', 'connection-mobile', 'profile-mobile']} />
									</>
								</JList>

								<JList
									header={personalPageProjectsData.bachelorThesis.header}
									label={personalPageProjectsData.bachelorThesis.label}
									company={personalPageProjectsData.bachelorThesis.company}
									firstCard={personalPageProjectsData.bachelorThesis.firstCard}
									values={personalPageProjectsData.bachelorThesis.values}>
									<>
										<JButton
											href="https://theses.cz/id/z1m772/doc.pdf"
											title="PDF Thesis">
											<FileText
												className="size-4 text-neutral-500 group-hover:text-neutral-300"
												strokeWidth={1.5}
												aria-hidden="true"
											/>
										</JButton>

										<JButton
											href="https://youtu.be/hQASELXYlSs"
											title="YouTube Showcase">
											<svg
												className="size-4 fill-neutral-500 group-hover:fill-neutral-300"
												viewBox="0 0 24 24"
												aria-hidden="true">
												<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
											</svg>
										</JButton>

										<JFullSizeImageButton imagesSrcs={['paziak', 'inventory', 'migrate', 'map']} />
									</>
								</JList>

								<JList
									header={personalPageProjectsData.gymnasiumNovyJicin.header}
									label={personalPageProjectsData.gymnasiumNovyJicin.label}
									company={personalPageProjectsData.gymnasiumNovyJicin.company}
									firstCard={personalPageProjectsData.gymnasiumNovyJicin.firstCard}
									values={personalPageProjectsData.gymnasiumNovyJicin.values}
									borderTop
								/>

								<JList
									header={personalPageProjectsData.maturitaThesis.header}
									label={personalPageProjectsData.maturitaThesis.label}
									company={personalPageProjectsData.maturitaThesis.company}
									firstCard={personalPageProjectsData.maturitaThesis.firstCard}
									values={personalPageProjectsData.maturitaThesis.values}
									lastCard
								/>
							</>
						)}
					</JTab>

					<motion.footer
						className="mt-16 sm:mt-24 pt-8 pb-12 w-full max-w-4xl border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500"
						initial={{ opacity: 0, y: 8 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={silkSpring}>
						<div className="flex items-center gap-2">
							<span className="size-1.5 rounded-full bg-neutral-600" />
							<span>Czech Republic • Remote</span>
						</div>
						<p>© {new Date().getFullYear()} Jakub Švihel. Built with Next.js & Tailwind CSS.</p>
					</motion.footer>
				</main>
			</div>
		</>
	);
}

export async function getStaticProps() {
	const generalEN = await import('../public/data/personalPageGeneralDataEN.json').then((m) => m.default);
	const generalCZ = await import('../public/data/personalPageGeneralDataCZ.json').then((m) => m.default);
	const projectsEN = await import('../public/data/personalPageProjectsDataEN.json').then((m) => m.default);
	const projectsCZ = await import('../public/data/personalPageProjectsDataCZ.json').then((m) => m.default);

	return {
		props: {
			personalPageGeneralDataEN: generalEN,
			personalPageGeneralDataCZ: generalCZ,
			personalPageProjectsDataEN: projectsEN,
			personalPageProjectsDataCZ: projectsCZ,
		},
	};
}
