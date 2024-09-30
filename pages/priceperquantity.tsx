import { useState } from "react";
import Image from "next/image";
import trashIcon from "../public/icons/icon-trash.svg";

export default function PricePerQuantity() {
    const [label, setLabel] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [activeButton, setActiveButton] = useState<string>("totalButton");
    const [records, setRecords] = useState<
        Array<{
            label: string;
            price: string;
            type: string;
            highlight: boolean;
        }>
    >([]);

    function showResult(total: number) {
        const resultDiv = document.getElementById("result");

        if (resultDiv) {
            const h2 = document.createElement("h2");
            h2.className = "text-2xl font-bold text-center";

            if (quantity === 0 || unitPrice === 0) {
                h2.textContent = "Hodnoty nesmí být nulové";
                h2.className = "text-2xl font-bold text-center text-red-500";
            } else if (activeButton === "totalButton") {
                h2.textContent = `Celková cena: ${total.toFixed(1)} Kč`;
            } else {
                h2.textContent = `Cena dávky: ${total.toFixed(1)} Kč`;
            }
            resultDiv.innerHTML = "";
            resultDiv.appendChild(h2);
        }
    }

    function calculateTotal(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const total = quantity * unitPrice;

        if (label && total > 0) {
            setRecords((prevRecords) => [
                {
                    label,
                    price: `${total.toFixed(1)}`,
                    type: "Celková cena",
                    highlight: false,
                },
                ...prevRecords,
            ]);
        }

        showResult(total);
    }

    const calculateUnit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const total = unitPrice / quantity;

        if (label && total > 0) {
            setRecords((prevRecords) => [
                {
                    label,
                    price: `${total.toFixed(1)}`,
                    type: "Cena dávky",
                    highlight: false,
                },
                ...prevRecords,
            ]);
        }

        showResult(total);
    };

    function calculatePrice() {
        return (
            <form
                onSubmit={
                    activeButton === "totalButton"
                        ? calculateTotal
                        : calculateUnit
                }
                className="space-y-4"
            >
                <div>
                    <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700"
                    >
                        {activeButton === "totalButton"
                            ? "Počet dávek"
                            : "Celkové množství"}
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md appearance-none"
                        min="0"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="unitPrice"
                        className="block text-sm font-medium text-gray-700"
                    >
                        {activeButton === "totalButton"
                            ? "Cena dávky"
                            : "Celková cena"}
                    </label>
                    <input
                        type="number"
                        id="unitPrice"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(Number(e.target.value))}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md appearance-none"
                        min="0"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="label"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Název
                    </label>
                    <input
                        id="label"
                        value={label}
                        onChange={(e) => setLabel(String(e.target.value))}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md appearance-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Vypočítat
                </button>
            </form>
        );
    }

    const handleTotalClick = () => {
        setActiveButton("totalButton");

        const resultDiv = document.getElementById("result");
        if (resultDiv) {
            resultDiv.innerHTML = "";
        }
    };

    const handleUnitClick = () => {
        setActiveButton("unitButton");

        const resultDiv = document.getElementById("result");
        if (resultDiv) {
            resultDiv.innerHTML = "";
        }
    };

    const handleDeleteRecord = (index: number) => {
        setRecords((prevRecords) => {
            const updatedRecords = prevRecords.filter(
                (_, recordIndex) => recordIndex !== index
            );

            // Pokud byl záznam, který se mazal, zvýrazněn
            if (prevRecords[index].highlight) {
                // Nastaví highlight na true pro následující záznam, pokud existuje
                const nextIndex =
                    index < updatedRecords.length ? index : index - 1;
                if (updatedRecords[nextIndex]) {
                    updatedRecords[nextIndex].highlight = true;
                }
            }

            return updatedRecords;
        });
    };

    return (
        <div className="bg-gray-100 w-full min-h-screen">
            <div className="absolute flex items-center xl:justify-center  min-h-screen w-full">
                <div className="bg-white rounded-lg shadow-lg p-6  lg:w-1/2 xl:w-1/4">
                    <div className="flex justify-center items-center mx-6 my-4 gap-1">
                        <div
                            className={`${
                                activeButton === "totalButton"
                                    ? "bg-green-500 scale-110 z-10"
                                    : "bg-gray-400 scale-95 z-0"
                            } size-full flex items-center justify-center p-1 outline outline-1 outline-gray-500 rounded`}
                        >
                            <button
                                id="totalButton"
                                onClick={handleTotalClick}
                                className="size-full"
                            >
                                <span className="text-nowrap">
                                    {"Výpočet celkové ceny"}
                                </span>
                            </button>
                        </div>

                        <div
                            className={`${
                                activeButton === "unitButton"
                                    ? "bg-green-500 scale-110 z-10"
                                    : "bg-gray-400 scale-95 z-0"
                            } size-full flex items-center justify-center p-1 outline outline-1 outline-gray-500 rounded`}
                        >
                            <button
                                id="unitButton"
                                onClick={handleUnitClick}
                                className="size-full"
                            >
                                <span className="text-nowrap">
                                    {"Výpočet ceny dávky"}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="px-3 pt-1">{calculatePrice()}</div>

                    <div id="result" className="pt-6 min-h-[60px]"></div>
                </div>
            </div>

            <div className="flex ml-auto lg:w-1/2 xl:w-1/4 min-h-screen max-h-screen">
                <div className="bg-white rounded-lg shadow-lg w-full p-6 min-h-screen max-h-screen flex flex-col z-10">
                    <h2 className="text-xl font-bold mb-4">Záznamy</h2>
                    <ul className="space-y-2 overflow-y-auto flex-grow">
                        {records.map((record, index) => (
                            <li
                                id={`recordLi${index}`}
                                className={`py-2 flex justify-between items-center ${
                                    record.highlight
                                        ? "border-t border-t-gray-300"
                                        : ""
                                }`}
                                key={index}
                            >
                                <div>
                                    <span className="font-bold pr-2">
                                        {record.label}
                                    </span>
                                    <span className="pr-2">{`${record.price} Kč`}</span>
                                    <span className="font-light">{`(${record.type})`}</span>
                                </div>

                                <button
                                    onClick={() => handleDeleteRecord(index)}
                                    className="ml-4 text-red-500 hover:text-red-700"
                                >
                                    <Image
                                        src={trashIcon}
                                        alt="Smazat"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => {
                            setRecords((prevRecords) => {
                                if (prevRecords.length === 0)
                                    return prevRecords;

                                const updatedRecords = [...prevRecords];

                                updatedRecords[0] = {
                                    ...updatedRecords[0],
                                    highlight: true,
                                };

                                return updatedRecords;
                            });
                        }}
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4"
                    >
                        Přidat dělící čáru
                    </button>

                    <button
                        onClick={() => {
                            setRecords([]);
                        }}
                        className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 mt-4"
                    >
                        Smazat záznamy
                    </button>
                </div>
            </div>
        </div>
    );
}
