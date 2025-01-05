import { useState } from "react";
import Image from "next/image";
import JButton from "./JButton";
import JFullSizeImage from "./JFullSizeImage";

interface JFullSizeImageButtonProps {
	imagesSrcs: string[];
}

export default function JFullSizeImageButton({ imagesSrcs }: JFullSizeImageButtonProps) {
	const [showImage, setShowImage] = useState(false);

	return (
		<>
			<JButton
				setShowImage={setShowImage}
				setShowImageValue={true}
				smaller>
				<Image
					className="w-24"
					src="/icons/pictures.svg"
					alt="Pictures icon"
					height={0}
					width={28}
				/>
			</JButton>

			{showImage && (
				<JFullSizeImage
					imagesSrcs={imagesSrcs}
					setShowImage={setShowImage}></JFullSizeImage>
			)}
		</>
	);
}
