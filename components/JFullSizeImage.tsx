import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import JButton from './JButton';

interface FullSizeImageProps {
	imagesSrcs: string[];
	setShowImage: (show: boolean) => void;
}

const spring = { type: 'spring' as const, stiffness: 350, damping: 25 };

export default function JFullSizeImage({ imagesSrcs, setShowImage }: FullSizeImageProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const showNextImage = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesSrcs.length);
	};

	const showPrevImage = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesSrcs.length) % imagesSrcs.length);
	};

	useEffect(() => {
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		const originalOverflow = document.body.style.overflow;

		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		return () => {
			document.body.style.overflow = originalOverflow;
			document.body.style.paddingRight = '';
		};
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setShowImage(false);
			} else if (event.key === 'ArrowLeft') {
				setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesSrcs.length) % imagesSrcs.length);
			} else if (event.key === 'ArrowRight') {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesSrcs.length);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [imagesSrcs.length, setShowImage]);

	return createPortal(
		<motion.div
			role="dialog"
			aria-modal="true"
			aria-label="Image gallery"
			className="fixed inset-0 flex items-center justify-center bg-black/85 backdrop-blur-xl z-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}>
			<div className="absolute right-4 top-4 lg:right-8 lg:top-8 z-50">
				<JButton
					className="bg-neutral-900/90 border-neutral-700/80"
					onClick={() => setShowImage(false)}
					title="Close">
					<X
						className="size-4 text-neutral-400 group-hover:text-neutral-200"
						strokeWidth={1.5}
						aria-hidden="true"
					/>
				</JButton>
			</div>

			<motion.div
				className="relative flex justify-center items-center max-h-screen p-4 sm:p-12 w-full"
				initial={{ opacity: 0, scale: 0.98 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={spring}>
				<AnimatePresence
					mode="wait"
					initial={false}>
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, x: 24 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -24 }}
						transition={spring}>
						<Image
							className="w-auto h-auto rounded-2xl object-contain max-h-[82vh] border border-neutral-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
							src={`/images/${imagesSrcs[currentIndex]}.webp`}
							alt={`Full sized image ${currentIndex + 1}`}
							width={1920}
							height={1080}
							priority
						/>
					</motion.div>
				</AnimatePresence>

				{imagesSrcs.length > 1 && (
					<div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 bg-neutral-900/90 backdrop-blur-md border border-neutral-700/70 rounded-full px-5 py-2 flex items-center gap-5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6)]">
						<motion.button
							type="button"
							onClick={showPrevImage}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.9 }}
							transition={spring}
							aria-label="Previous image"
							className="p-1 text-neutral-400 hover:text-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 rounded-full">
							<ChevronLeft
								className="size-4"
								strokeWidth={1.5}
								aria-hidden="true"
							/>
						</motion.button>

						<p className="text-xs font-mono font-medium text-neutral-300 tracking-wider leading-none">
							<span className="text-neutral-200 font-bold">{currentIndex + 1}</span> / {imagesSrcs.length}
						</p>

						<motion.button
							type="button"
							onClick={showNextImage}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.9 }}
							transition={spring}
							aria-label="Next image"
							className="p-1 text-neutral-400 hover:text-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 rounded-full">
							<ChevronRight
								className="size-4"
								strokeWidth={1.5}
								aria-hidden="true"
							/>
						</motion.button>
					</div>
				)}
			</motion.div>
		</motion.div>,
		document.body,
	);
}