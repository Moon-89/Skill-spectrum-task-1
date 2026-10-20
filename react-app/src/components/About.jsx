import { useEffect, useRef, useState } from 'react';
import { stats } from '../data.js';

function useCountUp(end, run, duration = 2500) {
	const [value, setValue] = useState(0);
	useEffect(() => {
		if (!run) return;
		let frame;
		const start = performance.now();
		const tick = now => {
			const p = Math.min((now - start) / duration, 1);
			setValue(Math.round(end * (1 - Math.pow(1 - p, 3))));
			if (p < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [end, run, duration]);
	return value;
}

function Stat({ count, label, run }) {
	const value = useCountUp(count, run);
	return (
		<div className="col-12 col-md-6 col-lg-3 stats__col">
			<div className="stats__count">{value}</div>
			<h5>{label}</h5>
		</div>
	);
}

export default function About() {
	const statsRef = useRef(null);
	const [run, setRun] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			if (entries.some(e => e.isIntersecting)) { setRun(true); observer.disconnect(); }
		}, { threshold: 0.4 });
		observer.observe(statsRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<section id="about" className="s-about target-section">
			<div className="gl-wrap">
				<div className="section-header has-sep reveal">
					<h3 className="subhead subhead--dark">Hello There</h3>
					<h2 className="display-1x">We Are Glint</h2>
				</div>
				<div className="about-desc reveal">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</div>
				<div className="row stats reveal" ref={statsRef}>
					{stats.map(s => <Stat key={s.label} {...s} run={run} />)}
				</div>
			</div>
			<div className="about__line" />
		</section>
	);
}
