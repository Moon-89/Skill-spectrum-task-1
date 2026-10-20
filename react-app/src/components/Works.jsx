import { useState } from 'react';
import { IMG, works } from '../data.js';
import Lightbox from './Lightbox.jsx';

export default function Works() {
	const [openIndex, setOpenIndex] = useState(null);

	return (
		<section id="works" className="s-works target-section">
			<div className="intro-wrap">
				<div className="gl-wrap">
					<div className="section-header has-sep reveal">
						<h3 className="subhead">Recent Works</h3>
						<h2 className="display-2x light">We love what we do, check out some of our latest works</h2>
					</div>
				</div>
			</div>
			<div className="works-content">
				<div className="masonry">
					{works.map((w, i) => (
						<div key={w.title} className="masonry__brick reveal">
							<div className="item-folio">
								<div className="item-folio__thumb">
									<a
										href={`${IMG}portfolio/gallery/${w.full}.jpg`}
										className="thumb-link"
										title={w.title}
										onClick={e => { e.preventDefault(); setOpenIndex(i); }}
									>
										<img
											src={`${IMG}portfolio/${w.thumb}.jpg`}
											srcSet={`${IMG}portfolio/${w.thumb}.jpg 1x, ${IMG}portfolio/${w.thumb}@2x.jpg 2x`}
											alt={`${w.title} ${w.cat.toLowerCase()} project`}
											loading="lazy"
										/>
									</a>
								</div>
								<div className="item-folio__text">
									<h3 className="item-folio__title">{w.title}</h3>
									<p className="item-folio__cat">{w.cat}</p>
								</div>
								<a
									href="https://www.behance.net/"
									className="item-folio__project-link"
									title="Project link"
									aria-label={`${w.title} project link`}
									target="_blank"
									rel="noopener noreferrer"
								><i className="fa-solid fa-link" /></a>
							</div>
						</div>
					))}
				</div>
			</div>
			<Lightbox index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
		</section>
	);
}
