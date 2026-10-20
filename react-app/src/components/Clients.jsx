import { useEffect, useRef, useState } from 'react';
import { IMG, clients, testimonials } from '../data.js';

const MARQUEE_SECONDS = 20;

function ClientMarquee() {
	const trackRef = useRef(null);
	const drag = useRef(null);

	const currentShift = () => new DOMMatrixReadOnly(getComputedStyle(trackRef.current).transform).m41;

	const onPointerDown = e => {
		const track = trackRef.current;
		drag.current = { x: e.clientX, offset: currentShift() };
		track.style.animation = 'none';
		track.style.transform = `translateX(${drag.current.offset}px)`;
		track.classList.add('dragging');
		track.setPointerCapture(e.pointerId);
	};
	const onPointerMove = e => {
		if (!drag.current) return;
		const track = trackRef.current;
		const half = track.scrollWidth / 2;
		const x = ((drag.current.offset + e.clientX - drag.current.x) % half - half) % half;
		track.style.transform = `translateX(${x}px)`;
	};
	const endDrag = () => {
		if (!drag.current) return;
		const track = trackRef.current;
		const progress = -currentShift() / (track.scrollWidth / 2);
		track.style.transform = '';
		track.style.animation = '';
		track.style.animationDelay = `${-progress * MARQUEE_SECONDS}s`;
		track.classList.remove('dragging');
		drag.current = null;
	};

	const logos = [...clients.map(name => ({ name, hidden: false })), ...clients.map(name => ({ name, hidden: true }))];

	return (
		<div className="clients-outer">
			<div
				ref={trackRef}
				className="clients"
				role="marquee"
				aria-label="Client logos"
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={endDrag}
				onPointerCancel={endDrag}
				onClick={e => e.preventDefault()}
			>
				{logos.map(({ name, hidden }, i) => (
					<a
						key={i}
						href="#0"
						className="clients__slide"
						aria-label={hidden ? undefined : name}
						aria-hidden={hidden || undefined}
						tabIndex={hidden ? -1 : undefined}
					>
						<img src={`${IMG}clients/${name}.svg`} alt={hidden ? '' : name} draggable="false" />
					</a>
				))}
			</div>
		</div>
	);
}

function Testimonials() {
	const [active, setActive] = useState(0);
	const [paused, setPaused] = useState(false);
	const touchX = useRef(null);
	const count = testimonials.length;

	const show = i => setActive((i + count) % count);

	// Autoplay restarts whenever the slide changes, so manual navigation resets the timer.
	useEffect(() => {
		if (paused) return;
		const timer = setTimeout(() => setActive(a => (a + 1) % count), 6000);
		return () => clearTimeout(timer);
	}, [active, paused, count]);

	return (
		<div
			className="testimonials"
			role="region"
			aria-label="Client testimonials"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
		>
			<button type="button" className="testimonials__nav testimonials__nav--prev" aria-label="Previous testimonial" onClick={() => show(active - 1)}>
				<i className="fa-solid fa-arrow-left-long" />
			</button>
			<button type="button" className="testimonials__nav testimonials__nav--next" aria-label="Next testimonial" onClick={() => show(active + 1)}>
				<i className="fa-solid fa-arrow-right-long" />
			</button>
			<div
				className="testimonials__slides"
				aria-live="polite"
				onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
				onTouchEnd={e => {
					if (touchX.current === null) return;
					const dx = e.changedTouches[0].clientX - touchX.current;
					if (Math.abs(dx) > 40) show(active + (dx < 0 ? 1 : -1));
					touchX.current = null;
				}}
			>
				{testimonials.map((t, i) => (
					<div key={t.name} className={`testimonials__slide${i === active ? ' is-active' : ''}`}>
						<p>{t.text}</p>
						<img src={`${IMG}avatars/${t.avatar}`} alt={t.name} className="testimonials__avatar" loading="lazy" width="84" height="84" />
						<span className="testimonials__name">{t.name}</span>
						<span className="testimonials__pos">{t.pos}</span>
					</div>
				))}
			</div>
			<div className="testimonials__dots" role="group" aria-label="Choose a testimonial">
				{testimonials.map((t, i) => (
					<button
						key={t.name}
						type="button"
						className={`testimonials__dot${i === active ? ' is-active' : ''}`}
						aria-label={`Show testimonial ${i + 1}`}
						aria-current={i === active || undefined}
						onClick={() => show(i)}
					/>
				))}
			</div>
		</div>
	);
}

export default function Clients() {
	return (
		<section id="clients" className="s-clients target-section">
			<div className="gl-wrap">
				<div className="section-header reveal">
					<h3 className="subhead">Our Clients</h3>
					<h2 className="display-2x">Glint has been honored to partner up with these clients</h2>
				</div>
			</div>
			<div className="gl-wrap reveal">
				<ClientMarquee />
			</div>
			<div className="gl-wrap reveal">
				<div className="clients-testimonials">
					<Testimonials />
				</div>
			</div>
		</section>
	);
}
