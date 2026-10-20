import { useEffect, useState } from 'react';

// Adds `.is-visible` to every `.reveal` element the first time it scrolls into view.
export function useReveal() {
	useEffect(() => {
		const observer = new IntersectionObserver(entries => entries.forEach(entry => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		}), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
		document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
		return () => observer.disconnect();
	}, []);
}

// Tracks scroll position: header opacity, go-top visibility and the section in view.
export function useScrollState(sectionIds) {
	const [state, setState] = useState({ opaque: false, showTop: false, current: sectionIds[0] });
	useEffect(() => {
		const onScroll = () => {
			const y = window.scrollY;
			const hero = document.getElementById('home');
			let current = sectionIds[0];
			sectionIds.forEach(id => {
				const el = document.getElementById(id);
				if (el && y >= el.offsetTop - window.innerHeight / 3) current = id;
			});
			setState({ opaque: hero ? y > hero.offsetHeight - 70 : false, showTop: y > 600, current });
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	}, [sectionIds]);
	return state;
}

// Toggles a class on <body> while `active` is true.
export function useBodyClass(className, active) {
	useEffect(() => {
		document.body.classList.toggle(className, active);
		return () => document.body.classList.remove(className);
	}, [className, active]);
}
