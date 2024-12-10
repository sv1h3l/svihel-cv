import React from "react";
import Image from "next/image";

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
        grid-cols-[minmax(min-content,auto)] md:grid-cols-[minmax(min-content,auto),minmax(min-content,auto)]"
        >
            {gridArray.map((gridRow, index) => (
                <React.Fragment key={index}>
                    <div className="text-start md:text-end font-light md:font-normal min-w-32 lg:min-w-44 pt-4 md:pt-0  md:justify-end flex items-center gap-x-2">


                        <span>{gridRow.key}</span>

                        {gridRow.tertiaryValue ? (
                            <button
                                className={`${gridRow.tertiaryValue === "disable" ? "opacity-50" : "hover:border-t-[#b7a71d]"}
                                py-1 my-0.5 rounded-lg size-7 flex items-center justify-center outline outline-1 outline-[#2b2b27] border-b-2 border-b-[#b7a71d]  border-t-2 border-t-transparent  transition duration-200 ease-in-out`}
                                disabled={gridRow.tertiaryValue === "disable"}
                                onMouseDown={(e) => {
                                    if (e.button === 1) {
                                        window.open(gridRow.tertiaryValue ? gridRow.tertiaryValue : "", "_blank");
                                    } else if (e.button === 0) {
                                        window.location.href = gridRow.tertiaryValue ? gridRow.tertiaryValue : "";
                                    }
                                }}
                            >
                                <Image
                                    className="w-24 p-1 min-w-7"
                                    src="/icons/certificates.svg"
                                    alt="GitHub icon"
                                    width={26}
                                    height={0}
                                />
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                    
                    <div className="ml-3 ">
                    

                        <div>
                            {gridRow.goldValue ? (
                                <div className="inline">
                                    <span className="text-[#b7a71d] font-medium">{gridRow.goldValue}</span>
                                    <span> - </span>
                                </div>
                            ) : (
                                ""
                            )}
                            <span className="font-medium">{gridRow.primaryValue}</span>
                            {gridRow.secondaryValue ? (
                                <div>
                                    <address className="not-italic  text-sm md:text-base text-gray-400">{gridRow.secondaryValue}</address>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default JGrid;
