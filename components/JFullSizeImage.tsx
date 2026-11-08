import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import JIcon from './JIcon';
import JButton from './JButton';

interface FullSizeImageProps {
	imagesSrcs: string[];
	setShowImage: (show: boolean) => void;
}

const spring = { type: 'spring' as const, stiffness: 350, damping: 25 };

export default function JFullSizeImage({ imagesSrcs, setShowImage }: FullSizeImageProps) {
	const [{ currentIndex, direction }, setGallery] = useState({ currentIndex: 0, direction: 1 });
	const reducedMotion = useReducedMotion();

	const navigate = (step: number) => {
		setGallery(({ currentIndex: index }) => ({
			currentIndex: (index + step + imagesSrcs.length) % imagesSrcs.length,
			direction: step,
		}));
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
				setGallery(({ currentIndex: index }) => ({ currentIndex: (index - 1 + imagesSrcs.length) % imagesSrcs.length, direction: -1 }));
			} else if (event.key === 'ArrowRight') {
				setGallery(({ currentIndex: index }) => ({ currentIndex: (index + 1) % imagesSrcs.length, direction: 1 }));
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
					onClick={() => setShowImage(false)}
					title="Close">
					<JIcon name="close" />
				</JButton>
			</div>

			<div className="absolute inset-x-0 top-16 bottom-28 overflow-hidden sm:top-20 sm:bottom-32">
				<AnimatePresence initial={false} custom={direction}>
					<motion.div
						key={currentIndex}
						custom={direction}
						variants={{
							enter: (step: number) => ({ x: reducedMotion ? 0 : `${step * 100}%`, opacity: reducedMotion ? 0 : 1 }),
							center: { x: 0, opacity: 1 },
							exit: (step: number) => ({ x: reducedMotion ? 0 : `${step * -100}%`, opacity: reducedMotion ? 0 : 1 }),
						}}
						initial="enter"
						animate="center"
						exit="exit"
						transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeInOut' }}
						className="absolute inset-0 flex items-center justify-center px-4 sm:px-12">
						<Image
							className="h-auto max-h-full w-auto max-w-full rounded-2xl border border-neutral-800 object-contain shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
							src={`/images/${imagesSrcs[currentIndex]}.webp`}
							alt={`Full sized image ${currentIndex + 1}`}
							width={1920}
							height={1080}
							priority
						/>
					</motion.div>
				</AnimatePresence>
			</div>

				{imagesSrcs.length > 1 && (
					<div className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 bg-neutral-900/90 backdrop-blur-md border border-neutral-700/70 rounded-full px-5 py-2 flex items-center gap-5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6)]">
						<motion.button
							type="button"
							onClick={() => navigate(-1)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.9 }}
							transition={spring}
							aria-label="Previous image"
							className="rounded-lg border border-neutral-700/70 bg-gradient-to-b from-[#222222] to-[#151515] p-2 text-neutral-400 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
							<JIcon name="chevron_left" />
						</motion.button>

						<p className="text-xs font-mono font-medium text-neutral-300 tracking-wider leading-none">
							<span className="text-neutral-200 font-bold">{currentIndex + 1}</span> / {imagesSrcs.length}
						</p>

						<motion.button
							type="button"
							onClick={() => navigate(1)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.9 }}
							transition={spring}
							aria-label="Next image"
							className="rounded-lg border border-neutral-700/70 bg-gradient-to-b from-[#222222] to-[#151515] p-2 text-neutral-400 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
							<JIcon name="chevron_right" />
						</motion.button>
					</div>
				)}
		</motion.div>,
		document.body,
	);
}
