import React from "react";
import JBorderTop from "./JBorderTop";

interface JListProps {
	header: string;
	label: string;
	company: boolean;
	job?: string;
	firstCard: boolean;
	isCzech?: boolean;
	borderTop?: boolean;
	values: string[];
	children?: React.ReactNode;
}

export default function JList({ header, label, company, job, firstCard, isCzech, borderTop, values, children }: JListProps) {
	return (
		<div className={` ${borderTop && "pt-2"} relative m-1 sm:m-3 lg:m-5  ${firstCard ? "mt-4" : "mt-8"}`}>
			{borderTop && <JBorderTop />}

			<p className={`${borderTop && "pt-5"} text-sm text-gray-400 z-20 relative`}>{header}</p>
			<h4 className={` ${company ? "text-2xl" : "text-lg"} font-medium z-20 relative`}>{label}</h4>

			{company && (
				<>
					<p className=" mt-4 text-sm text-gray-400">{isCzech ? "Náplň mé pracovní činnosti" : "Description of my job"}</p>
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
				<div className=" list-disc list-outside ml-2 space-y-1 li-color mb-4 sm:text-justify">
					{values.map((value, index) => (
						<p
							className="inline mr-1 "
							key={index}>
							{value}
						</p>
					))}
				</div>
			)}

			{children}
		</div>
	);
}
