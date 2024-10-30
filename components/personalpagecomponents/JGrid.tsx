import React from "react";

interface GridRow {
    key: string;
    goldValue?: string;
    primaryValue: string;
    secondaryValue?: string;
}

interface SkillsGridProps {
    gridArray: GridRow[];
}

const JGrid: React.FC<SkillsGridProps> = ({ gridArray }) => {
    return (
        <div className="grid gap-x-6 md:gap-y-5 md:pt-3 items-center justify-start  mx-1
        grid-cols-[minmax(min-content,auto)] md:grid-cols-[minmax(min-content,auto),minmax(min-content,auto)]">
            {gridArray.map((gridRow, index) => (
                <React.Fragment key={index}>
                    <div className="text-start md:text-end font-light  md:font-normal  min-w-32 lg:min-w-44 pt-4 md:pt-0 ">
                        <span >{gridRow.key}</span>
                    </div>
                    
                    <div className="ml-3">
                        {gridRow.goldValue ? (
                            <div className="inline">
                                <span className="text-[#b7a71d] font-medium">
                                    {gridRow.goldValue}
                                </span>
                                <span> - </span>
                            </div>
                        ) : (
                            ""
                        )}

                        <span className="font-medium">{gridRow.primaryValue}</span>

                        {gridRow.secondaryValue ? (
                            <div>
                                <address className="not-italic  text-sm md:text-base text-gray-400">
                                    {gridRow.secondaryValue}
                                </address>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default JGrid;
