import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import JButton from "@/components/JButton";
import JFullSizeImageButton from "@/components/JFullSizeImageButton";
import JGrid from "@/components/JGrid";
import JList from "@/components/JList";
import JTab from "@/components/JTab";

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

    const [showHeader, setShowHeader] = useState(false);
    const [showAboutMe, setShowAboutMe] = useState(false);
    const [showEmployment, setShowEmployment] = useState(false);
    const [showSkills, setShowSkills] = useState(false);
    const [showEducation, setShowEducation] = useState(false);
    const [showCertificates, setCertificates] = useState(false);
    const [showEmploymentSphere, setShowEmploymentSphere] = useState(false);
    const [showEducationSphere, setShowEducationSphere] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowHeader(true), 1);
        setTimeout(() => setShowAboutMe(true), 700);
        setTimeout(() => setShowEmployment(true), 850);
        setTimeout(() => setShowSkills(true), 1000);
        setTimeout(() => setShowEducation(true), 1150);
        setTimeout(() => setCertificates(true), 1300);
        setTimeout(() => setShowEmploymentSphere(true), 1450);
        setTimeout(() => setShowEducationSphere(true), 1600);
    }, []);

    return (
        <>
            <Head>
                <title>{personalPageGeneralData?.pageTitle}</title>
                <meta
                    name="theme-color"
                    content="#000000"
                />
                <link
                    rel="icon"
                    href="/icons/favicon.ico"
                />
            </Head>
            <main className="bg-[#3C3D37] px-1 lg:px-2 font-roboto ">
                <div className="flex w-full flex-col pb-1 lg:pb-2 text-gray-200 items-center">
                    <div
                        className={`
                                bg-[#191919] border-t-2 relative border-[#b7a71d] rounded-b-3xl px-3 pt-1 pb-1 sm:px-6 sm:py-5  
                                sm:gap-2 md:gap-4 items-center justify-center max-w-lg flex flex-col sm:flex-row shadow-lg shadow-[#10101080]
                                transition-all duration-700
                                ${showHeader ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-24"}
                            `}
                    >
                        <Image
                            className="w-24  my-1"
                            src={"/images/profile_picture.webp"}
                            alt="Profile picture"
                            width={100}
                            height={100}
                        />

                        <div className="flex flex-col items-center sm:pt-1 h-22 sm:mr-1 scale-90 sm:scale-100">
                            <h1 className=" font-bold text-4xl sm:px-2 sm:pb-1 text-nowrap">Jakub Švihel</h1>

                            <Image
                                className="w-52 scale-[1.04]"
                                src="/images/line.webp"
                                width={215}
                                height={0}
                                alt="Horizontal line"
                            />

                            <div className="relative grid pr-[0.2rem]">
                                <h2 className={`text-[1.24rem] pt-0.5 font-bold  text-nowrap  text-gray-200 transition-all duration-500 col-start-1 row-start-1 ${isCzech ? "opacity-100" : "opacity-0 "}`}>FULL-STACK VÝVOJÁŘ</h2>
                                <h2 className={`text-[1.125rem] font-bold  text-nowrap  text-gray-200 transition-all duration-500 col-start-1 row-start-1 ${isCzech ? "opacity-0 " : "opacity-100"}`}>FULL-STACK DEVELOPER</h2>
                            </div>
                        </div>

                        {
                            <JButton
                                className="absolute right-[0.08rem] top-0.5 h-6 w-8 pb-6 rounded-bl-xl"
                                onClick={() => setIsCzech(!isCzech)}
                                lang={true}
                            >
                                {isCzech ? "EN" : "CS"}
                            </JButton>
                        }
                    </div>
                    <JTab
                        labelCZ={"o mně"}
                        labelEN={"about me"}
                        imageSrc="about_me"
                        imageAlt="About me icon"
                        show={showAboutMe}
                        isCzech={isCzech}
                    >
                        <div className="px-1 sm:px-16 pt-3 sm:text-justify relative">
                            <div className="relative grid">
                                <p className={`transition-all duration-500 col-start-1 row-start-1 ${isCzech ? "opacity-100" : "opacity-0 absolute"}`}>{personalPageGeneralDataCZ?.aboutMe}</p>
                                <p className={`transition-all duration-500 col-start-1 row-start-1 ${isCzech ? "opacity-0 absolute" : "opacity-100"}`}>{personalPageGeneralDataEN?.aboutMe}</p>
                            </div>
                        </div>

                        <div className="flex flex-col xs:flex-row mt-4 gap-4 xs:gap-0 xs:px-2 sm:gap-20 lg:gap-10 justify-center items-start sm:items-center ml-1 mb-1">
                            <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 w-60 sm:w-auto">
                                <div className="flex items-center gap-2">
                                    <JButton phone={true}>
                                        <Image
                                            className="w-5"
                                            src={`/icons/phone.webp`}
                                            alt="Phone icon"
                                            width={0}
                                            height={28}
                                        />
                                    </JButton>
                                    <span>+420 733 249 479</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <JButton email={true}>
                                        <Image
                                            className="w-5"
                                            src={`/icons/mail.webp`}
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
                                            src="/icons/in.webp"
                                            alt="LinkedIn icon"
                                            height={0}
                                            width={28}
                                        />
                                    </JButton>
                                    <span className="text-nowrap">linkedin.com/in/svihel-jakub</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <JButton href={"https://github.com/sv1h3l"}>
                                        <Image
                                            className="w-24"
                                            src="/icons/git.webp"
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
                        labelCZ={"zaměstnání"}
                        labelEN={"employment"}
                        imageSrc="employment"
                        imageAlt="Employment icon"
                        show={showEmployment}
                        isCzech={isCzech}
                    >
                        {personalPageGeneralData && <JGrid gridArray={personalPageGeneralData?.employment} />}
                    </JTab>
                    <JTab
                        labelCZ={"dovednosti"}
                        labelEN={"skills"}
                        imageSrc="skills"
                        imageAlt="Skills icon"
                        show={showSkills}
                        isCzech={isCzech}
                    >
                        {personalPageGeneralData && <JGrid gridArray={personalPageGeneralData?.skills} />}
                    </JTab>
                    <JTab
                        labelCZ={"vzdělání"}
                        labelEN={"education"}
                        imageSrc="education"
                        imageAlt="Education icon"
                        show={showEducation}
                        isCzech={isCzech}
                    >
                        {personalPageGeneralData && <JGrid gridArray={personalPageGeneralData?.education} />}
                    </JTab>
                    <JTab
                        labelCZ={"certifikáty"}
                        labelEN={"certificates"}
                        imageSrc="certificates"
                        imageAlt="Certificates icon"
                        show={showCertificates}
                        isCzech={isCzech}
                    >
                        {personalPageGeneralData && <JGrid gridArray={personalPageGeneralData?.certificates} />}
                    </JTab>
                    <Image
                        className={`pt-3 px-16 lg:pt-4
                                transition-all duration-700
                                ${showCertificates ? "opacity-100" : "opacity-0"}
                            `}
                        src="/images/line.webp"
                        width={750}
                        height={0}
                        alt="Horizontal line"
                    />
                    <JTab
                        labelCZ={"komerční sféra"}
                        labelEN={"commercial sphere"}
                        imageSrc="employment"
                        imageAlt="Employment icon"
                        show={showEmploymentSphere}
                        isCzech={isCzech}
                    >
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
                                ></JList>

                                <JList
                                    header={personalPageProjectsData.projectUnitExplorer.header}
                                    label={personalPageProjectsData.projectUnitExplorer.label}
                                    company={personalPageProjectsData.projectUnitExplorer.company}
                                    firstCard={personalPageProjectsData.projectUnitExplorer.firstCard}
                                    values={personalPageProjectsData.projectUnitExplorer.values}
                                ></JList>

                                <JList
                                    header={personalPageProjectsData.projectProjectServer.header}
                                    label={personalPageProjectsData.projectProjectServer.label}
                                    company={personalPageProjectsData.projectProjectServer.company}
                                    firstCard={personalPageProjectsData.projectProjectServer.firstCard}
                                    values={personalPageProjectsData.projectProjectServer.values}
                                ></JList>

                                <JList
                                    header={personalPageProjectsData.selfEmployment.header}
                                    label={personalPageProjectsData.selfEmployment.label}
                                    company={personalPageProjectsData.selfEmployment.company}
                                    job={personalPageProjectsData.selfEmployment.job}
                                    firstCard={personalPageProjectsData.selfEmployment.firstCard}
                                    isCzech={isCzech}
                                    borderTop
                                    values={personalPageProjectsData.selfEmployment.values}
                                ></JList>

                                <JList
                                    header={personalPageProjectsData.oKrokNapred.header}
                                    label={personalPageProjectsData.oKrokNapred.label}
                                    company={personalPageProjectsData.oKrokNapred.company}
                                    firstCard={personalPageProjectsData.oKrokNapred.firstCard}
                                    values={personalPageProjectsData.oKrokNapred.values}
                                    lastCard
                                >
                                    <>
                                        <JButton
                                            href={"https://oncology-x.web.app/"}
                                            smaller
                                        >
                                            <Image
                                                className="w-24"
                                                src="/icons/link.webp"
                                                alt="Link icon"
                                                height={0}
                                                width={28}
                                            />
                                        </JButton>

                                        <JFullSizeImageButton imagesSrcs={["o_krok_napred-desktop", "o_krok_napred-mobile"]} />
                                    </>
                                </JList>
                            </>
                        )}
                    </JTab>
                    <JTab
                        labelCZ={"akademická sféra"}
                        labelEN={"academic sphere"}
                        imageSrc="education"
                        imageAlt="Education icon"
                        show={showEducationSphere}
                        isCzech={isCzech}
                    >
                        {personalPageProjectsData && (
                            <>
                                <JList
                                    header={personalPageProjectsData.diplomaThesis.header}
                                    label={personalPageProjectsData.diplomaThesis.label}
                                    company={personalPageProjectsData.diplomaThesis.company}
                                    firstCard={personalPageProjectsData.diplomaThesis.firstCard}
                                    values={personalPageProjectsData.diplomaThesis.values}
                                >
                                    <>
                                        <JButton
                                            href={"https://theses.cz/id/9ub0w1/text.pdf"}
                                            smaller
                                        >
                                            <Image
                                                className="w-24"
                                                src="/icons/certificates.webp"
                                                alt="Link icon"
                                                height={0}
                                                width={28}
                                            />
                                        </JButton>

                                        <JFullSizeImageButton
                                            imagesSrcs={["sports", "diary", "plan", "plan-mobile", "connection-mobile", "profile-mobile"]} // Pole více obrázků
                                        />
                                    </>
                                </JList>

                                <JList
                                    header={personalPageProjectsData.bachelorThesis.header}
                                    label={personalPageProjectsData.bachelorThesis.label}
                                    company={personalPageProjectsData.bachelorThesis.company}
                                    firstCard={personalPageProjectsData.bachelorThesis.firstCard}
                                    values={personalPageProjectsData.bachelorThesis.values}
                                    borderTop
                                    lastCard
                                >
                                    <>
                                        <JButton
                                            href={"https://theses.cz/id/z1m772/doc.pdf"}
                                            smaller
                                        >
                                            <Image
                                                className="w-24"
                                                src="/icons/certificates.webp"
                                                alt="Link icon"
                                                height={0}
                                                width={28}
                                            />
                                        </JButton>

                                        <JButton
                                            href={"https://youtu.be/hQASELXYlSs"}
                                            smaller
                                        >
                                            <Image
                                                className="w-24"
                                                src="/icons/youtube.webp"
                                                alt="Youtube icon"
                                                height={0}
                                                width={28}
                                            />
                                        </JButton>

                                        <JFullSizeImageButton
                                            imagesSrcs={["paziak", "inventory", "migrate", "map"]} // Pole více obrázků
                                        />
                                    </>
                                </JList>
                            </>
                        )}
                    </JTab>
                </div>
            </main>
        </>
    );
}

export async function getStaticProps() {
    const generalEN = await import("../public/data/personalPageGeneralDataEN.json").then((m) => m.default);
    const generalCZ = await import("../public/data/personalPageGeneralDataCZ.json").then((m) => m.default);
    const projectsEN = await import("../public/data/personalPageProjectsDataEN.json").then((m) => m.default);
    const projectsCZ = await import("../public/data/personalPageProjectsDataCZ.json").then((m) => m.default);

    return {
        props: {
            personalPageGeneralDataEN: generalEN,
            personalPageGeneralDataCZ: generalCZ,
            personalPageProjectsDataEN: projectsEN,
            personalPageProjectsDataCZ: projectsCZ,
        },
    };
}
