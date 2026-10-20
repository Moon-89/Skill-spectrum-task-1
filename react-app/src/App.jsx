import { useEffect, useState } from 'react';
import Preloader from './components/Preloader.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Works from './components/Works.jsx';
import Clients from './components/Clients.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

const sections = ['home', 'about', 'services', 'works', 'clients', 'contact'];

export default function App() {
	const [loaded, setLoaded] = useState(false);
	const [scrollY, setScrollY] = useState(0);
	const [currentSection, setCurrentSection] = useState('home');

	// Hide the preloader shortly after the page opens
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoaded(true);
			document.body.classList.add('loaded'); // starts the hero text animation
		}, 800);
		return () => clearTimeout(timer);
	}, []);

	// Remember how far the user has scrolled and which section is on screen
	useEffect(() => {
		function handleScroll() {
			setScrollY(window.scrollY);

			let current = 'home';
			sections.forEach(id => {
				const section = document.getElementById(id);
				if (section && window.scrollY >= section.offsetTop - window.innerHeight / 3) {
					current = id;
				}
			});
			setCurrentSection(current);
		}

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Fade elements with the "reveal" class in when they scroll into view
	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });

		document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
		return () => observer.disconnect();
	}, []);

	// The menu button turns black once we scroll past the hero
	const pastHero = scrollY > window.innerHeight - 70;

	return (
		<>
			<Preloader done={loaded} />
			<div id="top" />
			<Header darkButton={pastHero} currentSection={currentSection} />
			<main>
				<Hero />
				<About />
				<Services />
				<Works />
				<Clients />
				<Contact />
			</main>
			<Footer showBackToTop={scrollY > 600} />
		</>
	);
}
