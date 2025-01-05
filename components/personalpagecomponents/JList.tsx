import React from "react";
import JBorderTop from "./JBorderTop";

interface JListProps {
	header: string;
	label: string;
	company: boolean;
	job?: string;
	firstCard: boolean;
	lastCard?: boolean;
	isCzech?: boolean;
	borderTop?: boolean;
	values: string[];
	children?: React.ReactNode;
}

export default function JList({ header, label, company, job, firstCard, lastCard, isCzech, borderTop, values, children }: JListProps) {
	return (
		<div className={` relative m-1 sm:m-3 lg:m-5  ${firstCard ? "mt-3 lg:mt-3" : ""}`}>
			{borderTop && <JBorderTop />}

			<div className="flex items-center justify-between">
				<div>
					<p className={`${borderTop && "pt-4"} text-sm text-gray-400 z-20 relative`}>{header}</p>
					<h4 className={` ${company ? "text-2xl" : "text-lg"} font-medium z-20 relative`}>{label}</h4>
				</div>

				<div className={`${borderTop && "pt-4"} flex gap-4`}>{children}</div>
			</div>

			{company && (
				<>
					<p className=" mt-3 text-sm text-gray-400">{isCzech ? "Náplň mé pracovní činnosti" : "Description of my job"}</p>
					<h4 className={"text-lg font-medium"}>{job}</h4>
				</>
			)}

			{company ? (
				<ul className=" list-disc list-outside ml-6 space-y-1 li-color mb-4">
					{values.map((value, index) => (
						<li key={index}>{value}</li>
					))}
				</ul>
			) : (
				<div className={`list-disc list-outside ml-2 space-y-1 li-color ${lastCard ? "" : "mb-5"}  sm:text-justify`}>
					{values.map((value, index) => (
						<p
							className="inline mr-1 "
							key={index}>
							{value}
						</p>
					))}
				</div>
			)}
		</div>
	);
}
