import React from "react";
import Image from "next/image";
import JButton from "./JButton";

interface GridRow {
	key: string;
	goldValue?: string;
	primaryValue: string;
	secondaryValue?: string;
	tertiaryValue?: string;
}

interface SkillsGridProps {
	gridArray: GridRow[];
}

const JGrid: React.FC<SkillsGridProps> = ({ gridArray }) => {
	return (
		<div
			className="grid gap-x-6 md:gap-y-5 md:pt-3 items-center justify-start  mx-1
        grid-cols-[minmax(min-content,auto)] md:grid-cols-[minmax(min-content,auto),minmax(min-content,auto)]">
			{gridArray.map((gridRow, index) => (
				<React.Fragment key={index}>
					<div className="text-start md:text-end font-light md:font-normal min-w-32 lg:min-w-44 pt-4 md:pt-0  md:justify-end flex items-center gap-x-2">
						<span>{gridRow.key}</span>

						{gridRow.tertiaryValue && (
							<JButton
								disabled={gridRow.tertiaryValue === "disable"}
								href={gridRow.tertiaryValue}
								smaller={true}
								className="my-0.5">
								<Image
									className="w-24 p-1 min-w-7"
									src="/icons/certificates.svg"
									alt="GitHub icon"
									width={26}
									height={0}
								/>
							</JButton>
						)}
					</div>

					<div className="ml-3 ">
						<div>
							{gridRow.goldValue && (
								<div className="inline">
									<span className="text-[#b7a71d] font-medium">{gridRow.goldValue}</span>
									<span> - </span>
								</div>
							)}
							<span className="font-medium">{gridRow.primaryValue}</span>
							{gridRow.secondaryValue && (
								<div>
									<address className="not-italic  text-sm md:text-base text-gray-400">{gridRow.secondaryValue}</address>
								</div>
							)}
						</div>
					</div>
				</React.Fragment>
			))}
		</div>
	);
};

export default JGrid;
