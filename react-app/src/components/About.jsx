import { useEffect, useRef, useState } from 'react';
import { stats } from '../data.js';

// Counts from 0 up to `end` once `start` becomes true
function Counter({ end, start }) {
	const [number, setNumber] = useState(0);

	useEffect(() => {
		if (!start) return;

		const steps = 60;          // how many times the number changes
		const stepSize = end / steps;
		let count = 0;

		const timer = setInterval(() => {
			count++;
			setNumber(Math.round(stepSize * count));
			if (count === steps) clearInterval(timer);
		}, 40);

		return () => clearInterval(timer);
	}, [start, end]);

	return <div className="stats__count">{number}</div>;
}

export default function About() {
	const statsRef = useRef(null);
	const [startCounting, setStartCounting] = useState(false);

	// Start the counters when the stats row appears on screen
	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setStartCounting(true);
				observer.disconnect();
			}
		}, { threshold: 0.4 });

		observer.observe(statsRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<section id="about" className="s-about">
			<div className="gl-wrap">
				<div className="section-header has-sep reveal">
					<h3 className="subhead subhead--dark">Hello There</h3>
					<h2 className="display-1x">We Are Glint</h2>
				</div>

				<div className="about-desc reveal">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>

				<div className="row stats reveal" ref={statsRef}>
					{stats.map(stat => (
						<div key={stat.label} className="col-12 col-md-6 col-lg-3 stats__col">
							<Counter end={stat.count} start={startCounting} />
							<h5>{stat.label}</h5>
						</div>
					))}
				</div>
			</div>
			<div className="about__line" />
		</section>
	);
}
