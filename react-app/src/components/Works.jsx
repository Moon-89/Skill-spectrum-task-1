import { useState } from 'react';
import { IMG, works } from '../data.js';
import Lightbox from './Lightbox.jsx';

export default function Works() {
	// Index of the image open in the lightbox (null = closed)
	const [openImage, setOpenImage] = useState(null);

	return (
		<section id="works" className="s-works">
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
					{works.map((work, index) => (
						<div key={work.title} className="masonry__brick reveal">
							<div className="item-folio">
								<div className="item-folio__thumb">
									<a
										href={IMG + 'portfolio/gallery/' + work.full + '.jpg'}
										onClick={e => {
											e.preventDefault();
											setOpenImage(index);
										}}
									>
										<img src={IMG + 'portfolio/' + work.thumb + '.jpg'} alt={work.title} loading="lazy" />
									</a>
								</div>

								<div className="item-folio__text">
									<h3 className="item-folio__title">{work.title}</h3>
									<p className="item-folio__cat">{work.cat}</p>
								</div>

								<a href="https://www.behance.net/" className="item-folio__project-link" target="_blank" rel="noreferrer">
									<i className="fa-solid fa-link" />
								</a>
							</div>
						</div>
					))}
				</div>
			</div>

			{openImage !== null && (
				<Lightbox index={openImage} setIndex={setOpenImage} onClose={() => setOpenImage(null)} />
			)}
		</section>
	);
}
