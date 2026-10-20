import { useEffect } from 'react';
import { IMG, workCaption, works } from '../data.js';

export default function Lightbox({ index, setIndex, onClose }) {
	const work = works[index];

	function next() {
		setIndex((index + 1) % works.length);
	}

	function previous() {
		setIndex((index - 1 + works.length) % works.length);
	}

	// Keyboard: Esc closes, arrow keys change the image
	useEffect(() => {
		function handleKey(e) {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') previous();
		}

		document.addEventListener('keydown', handleKey);
		document.body.style.overflow = 'hidden'; // stop the page scrolling behind

		return () => {
			document.removeEventListener('keydown', handleKey);
			document.body.style.overflow = '';
		};
	});

	return (
		<div className="lightbox open" onClick={onClose}>
			<span className="lb-count">{index + 1} / {works.length}</span>

			<button type="button" className="lb-close" aria-label="Close" onClick={onClose}>
				<i className="fa-solid fa-xmark" />
			</button>
			<button type="button" className="lb-prev" aria-label="Previous" onClick={e => { e.stopPropagation(); previous(); }}>
				<i className="fa-solid fa-chevron-left" />
			</button>
			<button type="button" className="lb-next" aria-label="Next" onClick={e => { e.stopPropagation(); next(); }}>
				<i className="fa-solid fa-chevron-right" />
			</button>

			{/* stopPropagation so clicking the image itself doesn't close the lightbox */}
			<figure onClick={e => e.stopPropagation()}>
				<img src={IMG + 'portfolio/gallery/' + work.full + '.jpg'} alt={work.title} />
				<figcaption>
					<strong>{work.title}</strong>
					{work.cat} — {workCaption}
				</figcaption>
			</figure>
		</div>
	);
}
