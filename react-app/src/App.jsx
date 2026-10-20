import { useEffect, useState } from 'react';
import { navLinks } from './data.js';
import { useBodyClass, useReveal, useScrollState } from './hooks.js';
import Preloader from './components/Preloader.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Works from './components/Works.jsx';
import Clients from './components/Clients.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

const sectionIds = navLinks.map(link => link.id);

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const { opaque, showTop, current } = useScrollState(sectionIds);

	useReveal();
	useBodyClass('loaded', loaded);

	useEffect(() => {
		const finish = () => setTimeout(() => setLoaded(true), 300);
		if (document.readyState === 'complete') finish();
		else window.addEventListener('load', finish, { once: true });
		const failsafe = setTimeout(() => setLoaded(true), 3000);
		return () => { window.removeEventListener('load', finish); clearTimeout(failsafe); };
	}, []);

	// Placeholder links (#0) should not jump to the top of the page.
	useEffect(() => {
		const onClick = e => {
			const a = e.target.closest('a[href="#0"]');
			if (a) e.preventDefault();
		};
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, []);

	return (
		<>
			<Preloader done={loaded} />
			<div id="top" />
			<a className="skip-link" href="#main-content">Skip to content</a>
			<Header opaque={opaque} current={current} />
			<main id="main-content" tabIndex={-1}>
				<Hero />
				<About />
				<Services />
				<Works />
				<Clients />
				<Contact />
			</main>
			<Footer showTop={showTop} />
		</>
	);
}
