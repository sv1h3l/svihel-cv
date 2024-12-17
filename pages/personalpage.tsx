import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";

import JTab from "@/components/personalpagecomponents/JTab";
import JGrid from "@/components/personalpagecomponents/JGrid";
import JList from "@/components/personalpagecomponents/JList";
import JButton from "@/components/personalpagecomponents/JButton";

export default function PersonalPage() {
	const [personalPageGeneralData, setPersonalPageGeneralData] = useState<PersonalPageGeneralData | null>(null);
	const [personalPageProjectsData, setPersonalPageProjectsData] = useState<PersonalPageProjectsData | null>(null);

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
		diplomaThesis: ProjectsData;
		bachelorThesis: ProjectsData;
	}

	const [isCzech, setIsCzech] = useState(false);

	useEffect(() => {
		fetch(isCzech ? "/data/personalPageGeneralDataCZ.json" : "/data/personalPageGeneralDataEN.json")
			.then((response) => response.json())
			.then((data) => setPersonalPageGeneralData(data))
			.catch((error) => console.error("Error fetching general data:", error));

		fetch(isCzech ? "/data/personalPageProjectsDataCZ.json" : "/data/personalPageProjectsDataEN.json")
			.then((response) => response.json())
			.then((data) => setPersonalPageProjectsData(data))
			.catch((error) => console.error("Error fetching projects data:", error));
	}, [isCzech]);

	return (
		<>
			<Head>
				<title>{personalPageGeneralData?.pageTitle}</title>
				<link
					rel="icon"
					href="/icons/favicon.ico"
				/>
			</Head>
			<main className="bg-[#3C3D37] min-h-screen px-1 lg:px-2 font-roboto ">
				<div className="flex w-full flex-col pb-1 lg:pb-2 text-gray-200 items-center">
					<div
						className="bg-[#161513] border-t-2 relative border-[#b7a71d] rounded-b-3xl px-3 pt-1 pb-1 sm:px-6 sm:py-5  sm:gap-2 md:gap-4 items-center justify-center
                  max-w-lg flex flex-col sm:flex-row shadow-md">
						<Image
							className="w-24  my-1"
							src={"/images/profile_picture.png"}
							alt="Profile picture"
							width={100}
							height={100}
							priority
						/>

						<div className="flex flex-col items-center sm:pt-1 h-22 sm:mr-1 scale-90 sm:scale-100">
							<h1 className=" font-bold text-4xl sm:px-2 sm:pb-1 text-nowrap">Jakub Švihel</h1>

							<Image
								className="w-52 scale-[1.04]"
								src="/images/line.svg"
								width={215}
								height={0}
								alt="Horizontal line"
							/>

							<h2 className={`font-bold pr-1  ${isCzech ? "text-xl pt-0.5" : "text-lg "}`}>FULL-STACK {isCzech ? "VÝVOJÁŘ" : "DEVELOPER"}</h2>
						</div>

						{
							<JButton
								className="absolute right-0 top-0.5 h-6 w-8 pb-6 rounded-bl-xl"
								onClick={() => setIsCzech(!isCzech)}
								lang={true}>
								{isCzech ? "EN" : "CS"}
							</JButton>
						}
					</div>

					<JTab
						label={isCzech ? "o mně" : "about me"}
						imageSrc="about_me"
						imageAlt="About me icon">
						<div className="px-1 sm:px-16 pt-3 sm:text-justify">
							<p className="inline mr-1 ">{personalPageGeneralData?.aboutMe}</p>
						</div>

						<div className="flex flex-col xs:flex-row mt-5 gap-4 xs:gap-0 xs:px-2 sm:gap-20 lg:gap-10 justify-center items-start sm:items-center ml-1 mb-1">
							<div className="flex flex-col lg:flex-row gap-4 lg:gap-10 w-60 sm:w-auto">
								<div className="flex items-center gap-2">
									<JButton phone={true}>
										<Image
											className="w-24"
											src={`/icons/call.svg`}
											alt="Phone icon"
											width={30}
											height={0}
										/>
									</JButton>
									<span>+420 733 249 479</span>
								</div>

								<div className="flex items-center gap-2">
									<JButton email={true}>
										<Image
											className="w-24"
											src={`/icons/mail.svg`}
											alt="Mail icon"
											width={30}
											height={0}
										/>
									</JButton>
									<span>jakub.svihel@gnj.cz</span>
								</div>
							</div>

							<div className="flex flex-col lg:flex-row gap-4 lg:gap-10 w-60 sm:w-auto">
								<div className="flex items-center gap-2">
									<JButton href={"https://www.linkedin.com/in/svihel-jakub"}>
										<Image
											className="w-24"
											src="/icons/in.svg"
											alt="LinkedIn icon"
											height={0}
											width={28}
										/>
									</JButton>
									<span className="text-nowrap">linkedin.com/in/svihel-jakub</span>
								</div>

								<div className="flex items-center gap-2">
									<JButton href={"https://www.linkedin.com/in/svihel-jakub"}>
										<Image
											className="w-24"
											src="/icons/git.svg"
											alt="GitHub icon"
											width={26}
											height={0}
										/>
									</JButton>
									<span>github.com/sv1h3l</span>
								</div>
							</div>
						</div>
					</JTab>

					<JTab
						label={isCzech ? "zaměstnání" : "employment"}
						imageSrc="employment"
						imageAlt="Employment icon">
						{personalPageGeneralData && <JGrid gridArray={personalPageGeneralData?.employment} />}
					</JTab>

					<JTab
						label={isCzech ? "dovednosti" : "skills"}
						imageSrc="skills"
						imageAlt="Skills icon">
						{personalPageGeneralData && <JGrid gridArray={personalPageGeneralData?.skills} />}
					</JTab>

					<JTab
						label={isCzech ? "vzdělání" : "education"}
						imageSrc="education"
						imageAlt="Education icon">
						{personalPageGeneralData && <JGrid gridArray={personalPageGeneralData?.education} />}
					</JTab>

					<JTab
						label={isCzech ? "certifikáty" : "certificates"}
						imageSrc="certificates"
						imageAlt="Certificates icon">
						{personalPageGeneralData && <JGrid gridArray={personalPageGeneralData?.certificates} />}
					</JTab>

					<Image
						className="pt-3 px-16 lg:pt-4"
						src="/images/line.svg"
						width={750}
						height={0}
						alt="Horizontal line"
					/>

					<JTab
						label={isCzech ? "komerční sféra" : "commercial sphere"}
						imageSrc="employment"
						imageAlt="Employment icon">
						{personalPageProjectsData && (
							<>
								<JList
									header={personalPageProjectsData.companyHella.header}
									label={personalPageProjectsData.companyHella.label}
									company={personalPageProjectsData.companyHella.company}
									job={personalPageProjectsData.companyHella.job}
									firstCard={personalPageProjectsData.companyHella.firstCard}
									isCzech={isCzech}
									values={personalPageProjectsData.companyHella.values}></JList>

								<JList
									header={personalPageProjectsData.projectUnitExplorer.header}
									label={personalPageProjectsData.projectUnitExplorer.label}
									company={personalPageProjectsData.projectUnitExplorer.company}
									firstCard={personalPageProjectsData.projectUnitExplorer.firstCard}
									values={personalPageProjectsData.projectUnitExplorer.values}></JList>

								<JList
									header={personalPageProjectsData.projectProjectServer.header}
									label={personalPageProjectsData.projectProjectServer.label}
									company={personalPageProjectsData.projectProjectServer.company}
									firstCard={personalPageProjectsData.projectProjectServer.firstCard}
									values={personalPageProjectsData.projectProjectServer.values}></JList>

								<JList
									header={personalPageProjectsData.selfEmployment.header}
									label={personalPageProjectsData.selfEmployment.label}
									company={personalPageProjectsData.selfEmployment.company}
									job={personalPageProjectsData.selfEmployment.job}
									firstCard={personalPageProjectsData.selfEmployment.firstCard}
									isCzech={isCzech}
									borderTop={true}
									values={personalPageProjectsData.selfEmployment.values}></JList>

								<JList
									header={personalPageProjectsData.oKrokNapred.header}
									label={personalPageProjectsData.oKrokNapred.label}
									company={personalPageProjectsData.oKrokNapred.company}
									firstCard={personalPageProjectsData.oKrokNapred.firstCard}
									values={personalPageProjectsData.oKrokNapred.values}>
									<div className="mb-5 ml-2 ">
										<JButton
											label={isCzech ? "ODKAZ" : "LINK"}
											href={"https://oncology-x.web.app/"}></JButton>
									</div>

									<Image
										className="rounded-lg mt-4"
										src="/images/o_krok_napred.png"
										width={1000}
										height={0}
										alt="Image of Paziak from game Paziaatus"
									/>
								</JList>
							</>
						)}
					</JTab>

					<JTab
						label={isCzech ? "akademická sféra" : "academic sphere"}
						imageSrc="education"
						imageAlt="Education icon">
						{personalPageProjectsData && (
							<>
								<JList
									header={personalPageProjectsData.diplomaThesis.header}
									label={personalPageProjectsData.diplomaThesis.label}
									company={personalPageProjectsData.diplomaThesis.company}
									firstCard={personalPageProjectsData.diplomaThesis.firstCard}
									values={personalPageProjectsData.diplomaThesis.values}></JList>

								<JList
									header={personalPageProjectsData.bachelorThesis.header}
									label={personalPageProjectsData.bachelorThesis.label}
									company={personalPageProjectsData.bachelorThesis.company}
									firstCard={personalPageProjectsData.bachelorThesis.firstCard}
									values={personalPageProjectsData.bachelorThesis.values}
									borderTop={true}>
									<div className="flex gap-12 mb-5 ml-2 ">
										<JButton
											label={isCzech ? "VIDEO UKÁZKA" : "VIDEO SAMPLE"}
											href={"https://youtu.be/hQASELXYlSs"}></JButton>

										<JButton
											label={isCzech ? "DOKUMENTACE" : "DOCUMENTATION"}
											href={"https://theses.cz/id/z1m772/doc.pdf"}></JButton>
									</div>

									<Image
										className="mb-4 rounded-lg mt-4"
										src="/images/paziak.png"
										width={1000}
										height={0}
										alt="Image of Paziak from game Paziaatus"
									/>
									<Image
										className="mb-4 rounded-lg"
										src="/images/inventory.png"
										width={1000}
										height={0}
										alt="Image of inventory from game Paziaatus"
									/>
									<Image
										className="mb-4 rounded-lg"
										src="/images/migrate.png"
										width={1000}
										height={0}
										alt="Image of migration from game Paziaatus"
									/>
									<Image
										className="rounded-lg"
										src="/images/map.png"
										width={1000}
										height={0}
										alt="Image of map from game Paziaatus"
									/>
								</JList>
							</>
						)}
					</JTab>
				</div>
			</main>
		</>
	);
}
