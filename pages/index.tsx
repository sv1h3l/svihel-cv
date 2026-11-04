import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion, type Variants } from 'framer-motion';
import JIcon from '@/components/JIcon';

import JButton from '@/components/JButton';
import JFullSizeImageButton from '@/components/JFullSizeImageButton';
import JGrid from '@/components/JGrid';
import JList from '@/components/JList';
import JProjects from '@/components/JProjects';
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
	displayDescription?: string;
	technologies?: string[];
	description?: string;
	header: string;
	label: string;
	company: boolean;
	job: string;
	firstCard: boolean;
	values: string[];
}

interface PersonalPageProjectsData {
	companyHella: ProjectsData;
	atreoDigital: ProjectsData;
	projectMonery: ProjectsData;
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

const entranceVariants: Variants = {
	show: { transition: { delayChildren: 0.3, staggerChildren: 0.24 } },
};

const heroVariants: Variants = {
	hidden: { opacity: 0, y: -24 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.42, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.16 },
	},
};

const heroItemVariants: Variants = {
	hidden: { opacity: 0, y: -8 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
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

function ContactLinks({ isCzech }: { isCzech: boolean }) {
	const [notice, setNotice] = useState<{ value: string; message: string } | null>(null);

	useEffect(() => {
		if (!notice) return;
		const timer = window.setTimeout(() => setNotice(null), 1500);
		return () => window.clearTimeout(timer);
	}, [notice]);

	const contacts = [
		{ label: '+420 733 249 479', href: 'tel:+420733249479', value: '+420733249479', icon: <JIcon name="call" className="text-neutral-400" /> },
		{ label: 'sv1h3l.j@gmail.com', href: 'mailto:sv1h3l.j@gmail.com', value: 'sv1h3l.j@gmail.com', icon: <JIcon name="mail" className="text-neutral-400" /> },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/svihel-jakub', value: 'https://www.linkedin.com/in/svihel-jakub', icon: <svg
									className="size-4 shrink-0 stroke-neutral-400"
									viewBox="0 0 24 24"
									fill="none"
									strokeWidth="1.5"
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
								</svg> },
		{ label: 'GitHub', href: 'https://github.com/sv1h3l', value: 'https://github.com/sv1h3l', icon: <svg
									className="size-4 shrink-0 stroke-neutral-400"
									viewBox="0 0 24 24"
									fill="none"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true">
									<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
									<path d="M9 18c-4.51 2-5-2-7-2" />
								</svg> },
	];

	async function copy(value: string) {
		try {
			await navigator.clipboard.writeText(value);
			setNotice({ value, message: isCzech ? 'Zkopírováno' : 'Copied' });
		} catch {
			setNotice({ value, message: isCzech ? 'Chyba kopírování' : 'Copy failed' });
		}
	}

	return (
		<div className="mt-8">
			<div className="mx-auto grid w-max max-w-full grid-cols-2 gap-3">
				{contacts.map((contact) => (
					<motion.div key={contact.label} whileHover={{ y: -2 }} transition={silkSpring} className="relative flex min-w-0 items-center rounded-xl border border-neutral-700/70 bg-gradient-to-b from-[#222222] to-[#151515] shadow-[0_8px_20px_-12px_rgba(0,0,0,0.8)]">
						<a href={contact.href} {...(contact.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex min-w-0 flex-1 items-center gap-2.5 rounded-l-xl py-3 pl-4 pr-3 text-sm font-medium text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
							{contact.icon}
							<span className="relative grid min-w-0 items-center" aria-live="polite">
								<span className="invisible col-start-1 row-start-1 truncate" aria-hidden="true">{contact.label}</span>
								<AnimatePresence mode="wait" initial={false}>
									<motion.span key={notice?.value === contact.value ? notice.message : contact.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="col-start-1 row-start-1 truncate">
										{notice?.value === contact.value ? notice.message : contact.label}
									</motion.span>
								</AnimatePresence>
							</span>
						</a>
						<button type="button" onClick={() => copy(contact.value)} aria-label={isCzech ? `Kopírovat ${contact.label}` : `Copy ${contact.label}`} className="m-1 mr-2 inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.045] text-neutral-400 transition-colors duration-300 ease-out hover:bg-white/[0.08] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
							<JIcon name="content_copy" className="text-neutral-400" />
						</button>

					</motion.div>
				))}
			</div>

		</div>
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
	const reducedMotion = useReducedMotion();

	useEffect(() => {
		document.documentElement.lang = isCzech ? 'cs' : 'en';
	}, [isCzech]);

	const personalPageGeneralData = isCzech ? personalPageGeneralDataCZ : personalPageGeneralDataEN;
	const personalPageProjectsData = isCzech ? personalPageProjectsDataCZ : personalPageProjectsDataEN;

	return (
		<MotionConfig reducedMotion="user">
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

				<motion.main variants={entranceVariants} initial={reducedMotion ? false : "hidden"} animate="show" className="px-4 sm:px-6 lg:px-8 py-12 sm:py-12 flex flex-col items-center max-w-4xl mx-auto w-full">
					<motion.header
						className="relative isolate xs:max-w-[22rem] sm:max-w-[32rem] md:max-w-[35rem] w-full rounded-3xl p-10 sm:p-8 md:p-10 mb-6 sm:mb-6 bg-gradient-to-b from-neutral-900/80 via-neutral-900/50 to-neutral-950/80 border border-neutral-800/80 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors duration-700 ease-out overflow-hidden"
						variants={heroVariants}>
						<span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

						<div className="pointer-events-none absolute -top-20 -right-20 size-60 rounded-full bg-amber-500/[0.03] blur-3xl" />

						<motion.div
							variants={heroItemVariants}
							className="absolute top-5 right-5 sm:top-3 sm:right-3 z-20">
							<JButton
								onClick={() => setIsCzech(!isCzech)}
								lang
								className=" rounded-lg font-mono flex text-[11px]  tracking-widest">
								{isCzech ? 'EN' : 'CS'}
							</JButton>
						</motion.div>

						<div
							className="grid grid-cols-1 sm:grid-cols-[9rem_minmax(0,1fr)] items-center text-center gap-4 md:gap-8">
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
								className="flex flex-col items-center text-center">
								<h1 className=" font-bold text-4xl sm:text-[46px] md:text-5xl leading-none text-neutral-100 tracking-tight ">{personalPageGeneralData.pageTitle}</h1>

								<h2 className="mt-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase leading-none text-neutral-400">
									<AnimatePresence mode="popLayout" initial={false}>
										<motion.span
											key={isCzech ? 'cs' : 'en'}
											className="inline-block whitespace-nowrap"
											initial={{ opacity: 0, clipPath: reducedMotion ? 'inset(0)' : 'inset(0 50%)' }}
											animate={{ opacity: 1, clipPath: 'inset(0)' }}
											exit={{ opacity: 0, clipPath: reducedMotion ? 'inset(0)' : 'inset(0 50%)' }}
											transition={{ duration: 0.35 }}>
											{isCzech ? 'Full-stack vývojář' : 'Full-stack developer'}
										</motion.span>
									</AnimatePresence>
								</h2>

								<motion.div layout transition={{ layout: silkSpring }} className="mt-3 flex text-[7px] sm:text-[9px] md:text-[10px] items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3.5 py-1.5 font-mono text-[10px] leading-none uppercase tracking-widest text-neutral-400/80">
									<span className="status-indicator -top-px text-emerald-400/80" aria-hidden="true" />

									<span className="relative top-px whitespace-nowrap">
										<AnimatePresence mode="popLayout" initial={false}>
											<motion.span
												key={isCzech ? 'cs' : 'en'}
												className="inline-block"
												initial={{ opacity: 0, clipPath: reducedMotion ? 'inset(0)' : 'inset(0 50%)' }}
												animate={{ opacity: 1, clipPath: 'inset(0)' }}
												exit={{ opacity: 0, clipPath: reducedMotion ? 'inset(0)' : 'inset(0 50%)' }}
												transition={{ duration: 0.35 }}>
												{isCzech ? 'Otevřen spolupráci' : 'Open to collaboration'}
											</motion.span>
										</AnimatePresence>
									</span>

									<span
										className="select-none"
										aria-hidden="true">
										|
									</span>

									<span className="relative top-px">CZ / Remote</span>
								</motion.div>
							</motion.div>
						</div>
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

						<ContactLinks isCzech={isCzech} />
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
						revealOnScroll={!reducedMotion}
						show
						isCzech={isCzech}>
						<LanguageSwap languageKey={isCzech ? 'cz' : 'en'}>
							<JGrid gridArray={personalPageGeneralData.education} revealOnScroll={!reducedMotion} />
						</LanguageSwap>
					</JTab>

					<JTab
						labelCZ="Certifikáty"
						labelEN="Certificates"
						index="05"
						revealOnScroll={!reducedMotion}
						show
						isCzech={isCzech}>
						<LanguageSwap languageKey={isCzech ? 'cz' : 'en'}>
							<JGrid gridArray={personalPageGeneralData.certificates} revealOnScroll={!reducedMotion} />
						</LanguageSwap>
					</JTab>

					<motion.div
						className="relative my-16 sm:my-20 lg:my-24 w-full max-w-2xl flex items-center justify-center"
						variants={heroItemVariants}
						animate={reducedMotion ? undefined : "hidden"}
						whileInView="show"
						viewport={{ once: true, margin: "0px 0px -48px 0px" }}>
						<div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent" />
						<span className="absolute px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Portfolio</span>
					</motion.div>

					<JTab
						labelCZ="Komerční sféra"
						labelEN="Commercial sphere"
						index="06"
						revealOnScroll={!reducedMotion}
						show
						isCzech={isCzech}>
						{personalPageProjectsData && (
							<>
								<JList
									header={personalPageProjectsData.companyHella.header}
									label={personalPageProjectsData.companyHella.label}
									description={personalPageProjectsData.companyHella.description}
									company={personalPageProjectsData.companyHella.company}
									job={personalPageProjectsData.companyHella.job}
									firstCard={personalPageProjectsData.companyHella.firstCard}
									isCzech={isCzech}
									values={personalPageProjectsData.companyHella.values}
								/>

								<JProjects isCzech={isCzech}>
								<JList
									header={personalPageProjectsData.projectUnitExplorer.header}
									showProjectLabel={false}
									isCzech={isCzech}
									label={personalPageProjectsData.projectUnitExplorer.label}
									company={personalPageProjectsData.projectUnitExplorer.company}
									firstCard={personalPageProjectsData.projectUnitExplorer.firstCard}
									values={personalPageProjectsData.projectUnitExplorer.values}
									displayDescription={personalPageProjectsData.projectUnitExplorer.displayDescription}
									technologies={personalPageProjectsData.projectUnitExplorer.technologies}
								/>

								<JList
									header={personalPageProjectsData.projectProjectServer.header}
									isCzech={isCzech}
									showProjectLabel={false}
									label={personalPageProjectsData.projectProjectServer.label}
									company={personalPageProjectsData.projectProjectServer.company}
									firstCard={personalPageProjectsData.projectProjectServer.firstCard}
									values={personalPageProjectsData.projectProjectServer.values}
									displayDescription={personalPageProjectsData.projectProjectServer.displayDescription}
									technologies={personalPageProjectsData.projectProjectServer.technologies}
								/>
								</JProjects>

								<JList
									header={personalPageProjectsData.selfEmployment.header}
									label={personalPageProjectsData.selfEmployment.label}
									description={personalPageProjectsData.selfEmployment.description}
									company={personalPageProjectsData.selfEmployment.company}
									job={personalPageProjectsData.selfEmployment.job}
									firstCard={personalPageProjectsData.selfEmployment.firstCard}
									isCzech={isCzech}
									borderTop
									values={personalPageProjectsData.selfEmployment.values}
								/>

								<JProjects isCzech={isCzech}>
								<JList
									header={personalPageProjectsData.oKrokNapred.header}
									showProjectLabel={false}
									isCzech={isCzech}
									label={personalPageProjectsData.oKrokNapred.label}
									company={personalPageProjectsData.oKrokNapred.company}
									firstCard={personalPageProjectsData.oKrokNapred.firstCard}
									values={personalPageProjectsData.oKrokNapred.values}
									displayDescription={personalPageProjectsData.oKrokNapred.displayDescription}
									technologies={personalPageProjectsData.oKrokNapred.technologies}>
									<>
										<JButton
											href="https://oncology-x.web.app/"
											title="Open Project">
											<JIcon name="arrow_outward" className="text-neutral-400" />
										</JButton>
										<JFullSizeImageButton imagesSrcs={['o_krok_napred-desktop', 'o_krok_napred-mobile']} />
									</>
								</JList>
								</JProjects>
								<JList
									header={personalPageProjectsData.atreoDigital.header}
									label={personalPageProjectsData.atreoDigital.label}
									description={personalPageProjectsData.atreoDigital.description}
									job={personalPageProjectsData.atreoDigital.job}
									company={personalPageProjectsData.atreoDigital.company}
									firstCard={personalPageProjectsData.atreoDigital.firstCard}
									values={personalPageProjectsData.atreoDigital.values}
									borderTop
								/>
								<JProjects isCzech={isCzech}>
								<JList
									header={personalPageProjectsData.projectMonery.header}
									showProjectLabel={false}
									label={personalPageProjectsData.projectMonery.label}
									company={personalPageProjectsData.projectMonery.company}
									firstCard={personalPageProjectsData.projectMonery.firstCard}
									values={personalPageProjectsData.projectMonery.values}
									isCzech={isCzech}
									lastCard>
									<JButton href="https://monery.io/" title="Open Monery">
										<JIcon name="arrow_outward" className="text-neutral-400" />
									</JButton>
								</JList>
								</JProjects>
							</>
						)}
					</JTab>

					<JTab
						labelCZ="Akademická sféra"
						labelEN="Academic sphere"
						index="07"
						revealOnScroll={!reducedMotion}
						show
						lastTab
						isCzech={isCzech}>
						{personalPageProjectsData && (
							<>
								<JList
									header={personalPageProjectsData.universityPalacky.header}
									label={personalPageProjectsData.universityPalacky.label}
									description={personalPageProjectsData.universityPalacky.description}
									company={personalPageProjectsData.universityPalacky.company}
									firstCard={personalPageProjectsData.universityPalacky.firstCard}
									values={personalPageProjectsData.universityPalacky.values}
								/>

								<JProjects isCzech={isCzech}>
								<JList
									header={personalPageProjectsData.diplomaThesis.header}
									showProjectLabel={false}
									isCzech={isCzech}
									label={personalPageProjectsData.diplomaThesis.label}
									company={personalPageProjectsData.diplomaThesis.company}
									firstCard={personalPageProjectsData.diplomaThesis.firstCard}
									values={personalPageProjectsData.diplomaThesis.values}
									displayDescription={personalPageProjectsData.diplomaThesis.displayDescription}
									technologies={personalPageProjectsData.diplomaThesis.technologies}>
									<>
										<JButton
											href="https://theses.cz/id/9ub0w1/text.pdf"
											title="PDF Thesis">
											<JIcon name="description" className="text-neutral-400" />
										</JButton>
										<JFullSizeImageButton imagesSrcs={['sports', 'diary', 'plan', 'plan-mobile', 'connection-mobile', 'profile-mobile']} />
									</>
								</JList>

								<JList
									header={personalPageProjectsData.bachelorThesis.header}
									isCzech={isCzech}
									showProjectLabel={false}
									label={personalPageProjectsData.bachelorThesis.label}
									company={personalPageProjectsData.bachelorThesis.company}
									firstCard={personalPageProjectsData.bachelorThesis.firstCard}
									values={personalPageProjectsData.bachelorThesis.values}
									displayDescription={personalPageProjectsData.bachelorThesis.displayDescription}
									technologies={personalPageProjectsData.bachelorThesis.technologies}>
									<>
										<JButton
											href="https://theses.cz/id/z1m772/doc.pdf"
											title="PDF Thesis">
											<JIcon name="description" className="text-neutral-400" />
										</JButton>

										<JButton
											href="https://youtu.be/hQASELXYlSs"
											title="YouTube Showcase">
											<JIcon name="play_circle" className="text-neutral-400" />
										</JButton>

										<JFullSizeImageButton imagesSrcs={['paziak', 'inventory', 'migrate', 'map']} />
									</>
								</JList>
								</JProjects>

								<JList
									header={personalPageProjectsData.gymnasiumNovyJicin.header}
									label={personalPageProjectsData.gymnasiumNovyJicin.label}
									description={personalPageProjectsData.gymnasiumNovyJicin.description}
									company={personalPageProjectsData.gymnasiumNovyJicin.company}
									firstCard={personalPageProjectsData.gymnasiumNovyJicin.firstCard}
									values={personalPageProjectsData.gymnasiumNovyJicin.values}
									borderTop
								/>

								<JProjects isCzech={isCzech}>
								<JList
									header={personalPageProjectsData.maturitaThesis.header}
									showProjectLabel={false}
									isCzech={isCzech}
									label={personalPageProjectsData.maturitaThesis.label}
									company={personalPageProjectsData.maturitaThesis.company}
									firstCard={personalPageProjectsData.maturitaThesis.firstCard}
									values={personalPageProjectsData.maturitaThesis.values}
									lastCard
								/>
								</JProjects>
							</>
						)}
					</JTab>

					<motion.footer
						className="mt-16 sm:mt-24 pt-8 pb-12 w-full max-w-4xl border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500"
						variants={heroItemVariants}
						animate={reducedMotion ? undefined : "hidden"}
						whileInView="show"
						viewport={{ once: true, margin: "0px 0px -48px 0px" }}>
						<div className="flex items-center gap-2">
							<span className="size-1.5 rounded-full bg-neutral-600" />
							<span>Czech Republic • Remote</span>
						</div>
						<p>© {new Date().getFullYear()} Jakub Švihel. Built with Next.js & Tailwind CSS.</p>
					</motion.footer>
				</motion.main>
			</div>
		</MotionConfig>
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
