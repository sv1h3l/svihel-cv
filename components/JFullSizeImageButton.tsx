import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import JIcon from './JIcon';
import JButton from './JButton';

const JFullSizeImage = dynamic(() => import('./JFullSizeImage'));

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
				<JIcon name="photo_library" />
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
