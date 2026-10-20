import { useEffect, useState } from 'react';
import { IMG, clients, testimonials } from '../data.js';

function Testimonials() {
	const [active, setActive] = useState(0);

	function next() {
		setActive((active + 1) % testimonials.length);
	}

	function previous() {
		setActive((active - 1 + testimonials.length) % testimonials.length);
	}

	// Move to the next testimonial every 6 seconds
	useEffect(() => {
		const timer = setTimeout(next, 6000);
		return () => clearTimeout(timer);
	}, [active]);

	return (
		<div className="testimonials">
			<button type="button" className="testimonials__nav testimonials__nav--prev" aria-label="Previous" onClick={previous}>
				<i className="fa-solid fa-arrow-left-long" />
			</button>
			<button type="button" className="testimonials__nav testimonials__nav--next" aria-label="Next" onClick={next}>
				<i className="fa-solid fa-arrow-right-long" />
			</button>

			<div className="testimonials__slides">
				{testimonials.map((item, i) => (
					<div key={item.name} className={i === active ? 'testimonials__slide is-active' : 'testimonials__slide'}>
						<p>{item.text}</p>
						<img src={IMG + 'avatars/' + item.avatar} alt={item.name} className="testimonials__avatar" />
						<span className="testimonials__name">{item.name}</span>
						<span className="testimonials__pos">{item.pos}</span>
					</div>
				))}
			</div>

			<div className="testimonials__dots">
				{testimonials.map((item, i) => (
					<button
						key={item.name}
						type="button"
						className={i === active ? 'testimonials__dot is-active' : 'testimonials__dot'}
						aria-label={'Show testimonial ' + (i + 1)}
						onClick={() => setActive(i)}
					/>
				))}
			</div>
		</div>
	);
}

export default function Clients() {
	// The logo list is shown twice so the scrolling animation loops without a gap
	const logos = [...clients, ...clients];

	return (
		<section id="clients" className="s-clients">
			<div className="gl-wrap">
				<div className="section-header reveal">
					<h3 className="subhead">Our Clients</h3>
					<h2 className="display-2x">Glint has been honored to partner up with these clients</h2>
				</div>

				<div className="clients-outer reveal">
					<div className="clients">
						{logos.map((name, i) => (
							<a key={i} href="#0" className="clients__slide">
								<img src={IMG + 'clients/' + name + '.svg'} alt={name} />
							</a>
						))}
					</div>
				</div>

				<div className="clients-testimonials reveal">
					<Testimonials />
				</div>
			</div>
		</section>
	);
}
