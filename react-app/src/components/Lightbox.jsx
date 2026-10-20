import { useEffect, useRef, useState } from 'react';
import { IMG, workCaption, works } from '../data.js';

export default function Lightbox({ index, onChange, onClose }) {
	const open = index !== null;
	const [shown, setShown] = useState(0);
	const [imgReady, setImgReady] = useState(false);
	const closeRef = useRef(null);
	const lastFocus = useRef(null);
	const touchX = useRef(null);

	const go = step => onChange((index + step + works.length) % works.length);

	// Remember the last opened item so the image doesn't vanish while fading out.
	useEffect(() => {
		if (open) { setShown(index); setImgReady(false); }
	}, [open, index]);

	useEffect(() => {
		if (!open) return;
		lastFocus.current = document.activeElement;
		document.body.style.overflow = 'hidden';
		closeRef.current?.focus();
		return () => {
			document.body.style.overflow = '';
			lastFocus.current?.focus();
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = e => {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowRight') go(1);
			if (e.key === 'ArrowLeft') go(-1);
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	});

	const work = works[shown];

	return (
		<div
			className={`lightbox${open ? ' open' : ''}`}
			role="dialog"
			aria-modal="true"
			aria-label="Project image preview"
			aria-hidden={!open}
			onClick={e => { if (e.target === e.currentTarget || e.target.tagName === 'FIGURE') onClose(); }}
			onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
			onTouchEnd={e => {
				if (touchX.current === null) return;
				const dx = e.changedTouches[0].clientX - touchX.current;
				if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
				touchX.current = null;
			}}
		>
			<span className="lb-count">{shown + 1} / {works.length}</span>
			<button ref={closeRef} type="button" className="lb-close" aria-label="Close" onClick={onClose}><i className="fa-solid fa-xmark" /></button>
			<button type="button" className="lb-prev" aria-label="Previous image" onClick={() => go(-1)}><i className="fa-solid fa-chevron-left" /></button>
			<button type="button" className="lb-next" aria-label="Next image" onClick={() => go(1)}><i className="fa-solid fa-chevron-right" /></button>
			<figure>
				{open && (
					<img
						src={`${IMG}portfolio/gallery/${work.full}.jpg`}
						alt={work.title}
						style={{ opacity: imgReady ? 1 : 0 }}
						onLoad={() => setImgReady(true)}
					/>
				)}
				<figcaption><strong>{work.title}</strong>{work.cat} — {workCaption}</figcaption>
			</figure>
		</div>
	);
}
