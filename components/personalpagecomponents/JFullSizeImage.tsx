import Image from "next/image";
import { useEffect, useState } from "react";
import JButton from "./JButton";

interface FullSizeImageProps {
	imagesSrcs: string[]; // Pole obrázků
	setShowImage: (show: boolean) => void;
}

export default function JFullSizeImage({ imagesSrcs, setShowImage }: FullSizeImageProps) {
	// Stav pro aktuální obrázek
	const [currentIndex, setCurrentIndex] = useState(0);

	// Funkce pro změnu obrázku
	const showNextImage = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesSrcs.length); // Zobrazí další obrázek, pokud je poslední, vrátí se na první
	};

	const showPrevImage = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesSrcs.length) % imagesSrcs.length); // Zobrazí předchozí obrázek, pokud je první, přejde na poslední
	};

	/** Funkce pro skrytí scrollbaru a neposouvání obsahu pozadí. */
	useEffect(() => {
		// Uložení aktuální šířky scrollbaru
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		// Zakáže scrollování a přidá padding pro kompenzaci šířky scrollbaru
		document.body.style.overflow = "hidden";
		document.body.style.marginRight = `${scrollbarWidth}px`;
		document.body.style.backgroundColor = "#3C3D37";

		// Obnoví původní stav při skrytí komponenty
		return () => {
			document.body.style.overflow = "auto";
			document.body.style.marginRight = "0";
			document.body.style.backgroundColor = "#fff";
		};
	}, []);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-30 ">
			<div className="bg-[#161513] shadow-md border-t-2 border-[#b7a71d] rounded-3xl flex justify-center items-center mx-1 ">
				<div className="relative p-2 pt-9 lg:pt-11 lg:p-6  ">
					<Image
						className="max-h-85vh w-auto h-auto rounded-2xl"
						src={`/images/${imagesSrcs[currentIndex]}.png`} // Zobrazení aktuálního obrázku podle indexu
						alt={"Full sized image."}
						width={1}
						height={1}
					/>

					<div className="absolute right-5 lg:right-9 top-1 lg:top-2">
						<JButton
							className="bg-[#161513]"
							setShowImage={setShowImage}
							setShowImageValue={false}
							smaller>
							<Image
								src={`/icons/close.svg`}
								alt={"Close button"}
								width={30}
								height={30}
							/>
						</JButton>
					</div>

					{/* Tlačítka pro přepínání obrázků */}
					{imagesSrcs.length > 1 && (
						<div
							className="bg-[#161513] shadow-md rounded-lg
										
										absolute left-1/2 transform -translate-x-1/2 top-1 lg:top-2
										flex justify-center ">
							<JButton	
								className="bg-[#161513]"
								setShowImage={setShowImage}
								setShowImageValue={false}
								onClick={showPrevImage}
								smaller>
								<Image
									className="rotate-180 scale-125"
									src={`/icons/arrow.svg`}
									alt={"Next button"}
									width={30}
									height={30}
								/>
							</JButton>

							<p className="w-20 text-center pt-0.5">
								{currentIndex + 1} / {imagesSrcs.length}
							</p>

							<JButton
								className="bg-[#161513]"
								setShowImage={setShowImage}
								setShowImageValue={false}
								onClick={showNextImage}
								smaller>
								<Image
									className=" scale-125"
									src={`/icons/arrow.svg`}
									alt={"Previous button"}
									width={30}
									height={30}
								/>
							</JButton>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
