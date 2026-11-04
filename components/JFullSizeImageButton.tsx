import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Images } from 'lucide-react';
import JButton from './JButton';
import JFullSizeImage from './JFullSizeImage';

interface JFullSizeImageButtonProps {
	imagesSrcs: string[];
}

export default function JFullSizeImageButton({ imagesSrcs }: JFullSizeImageButtonProps) {
	const [showImage, setShowImage] = useState(false);

	return (
		<>
			<JButton
				onClick={() => setShowImage(true)}
				title="Open gallery">
				<Images
					className="size-4 text-neutral-400 group-hover:text-neutral-200"
					strokeWidth={1.5}
					aria-hidden="true"
				/>
			</JButton>

			<AnimatePresence>
				{showImage && (
					<JFullSizeImage
						imagesSrcs={imagesSrcs}
						setShowImage={setShowImage}
					/>
				)}
			</AnimatePresence>
		</>
	);
}