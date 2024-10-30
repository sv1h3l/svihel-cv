import React from "react";

interface JListProps {
    header: string;
    label: string;
    company: boolean;
    job?: string;
    firstCard: boolean;
    isCzech?: boolean;
    values: string[];
    children: React.ReactNode;
}

export default function JList({ header, label, company, job, firstCard, isCzech, values, children }: JListProps) {
    return (
        <div className={`m-1 sm:m-3 lg:m-5  ${firstCard ? "mt-4" : "mt-8"}`}>
            <p className="text-sm text-gray-400">{header}</p>
            <h4 className={` ${company ? "text-2xl" : "text-lg"} font-medium`}>{label}</h4>

            {company ? (
                <>
                    <p className=" mt-4 text-sm text-gray-400">{isCzech ? "Náplň mé pracovní činnosti" : "Description of my job as"}</p>
                    <h4 className={"text-lg font-medium"}>{job}</h4>
                </>
            ) : (
                ""
            )}

            {company ? (
                <ul className=" list-disc list-outside ml-6 sm:ml-8 space-y-1 li-color mb-4">
                    {values.map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
            ) : (
                <div className=" list-disc list-outside ml-2 sm:ml-4 space-y-1 li-color mb-4">
                    {values.map((value, index) => (
                        <p className="inline mr-1" key={index}>{value}</p>
                    ))}
                </div>
            )}

            {children}
        </div>
    );
}
