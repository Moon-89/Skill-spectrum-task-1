import { useEffect, useState } from 'react';
import { IMG, navLinks } from '../data.js';
import SocialList from './SocialList.jsx';

export default function Header({ darkButton, currentSection }) {
	const [menuOpen, setMenuOpen] = useState(false);

	// Add a class to <body> while the menu is open (used by the CSS)
	useEffect(() => {
		document.body.classList.toggle('menu-open', menuOpen);
	}, [menuOpen]);

	function closeMenu() {
		setMenuOpen(false);
	}

	return (
		<header className="s-header">
			<div className="header-logo">
				<a href="#top">
					<img src={IMG + 'logo.png'} alt="Glint logo" width="238" height="78" />
				</a>
			</div>

			<nav className="header-nav">
				<button type="button" className="header-nav__close" aria-label="Close menu" onClick={closeMenu}>
					<span />
				</button>

				<div className="header-nav__content">
					<h3>Navigation</h3>
					<ul className="header-nav__list">
						{navLinks.map(link => (
							<li key={link.id} className={currentSection === link.id ? 'current' : ''}>
								<a href={'#' + link.id} onClick={closeMenu}>{link.label}</a>
							</li>
						))}
					</ul>
					<p>Perspiciatis hic praesentium nesciunt. Et neque a dolorum <a href="#0">voluptatem</a> porro iusto sequi veritatis libero enim. Iusto id suscipit veritatis neque reprehenderit.</p>
					<SocialList className="header-nav__social" />
				</div>
			</nav>

			<button
				type="button"
				className={darkButton ? 'menu-toggle opaque' : 'menu-toggle'}
				aria-label="Menu"
				onClick={() => setMenuOpen(!menuOpen)}
			>
				<span className="menu-text">Menu</span>
				<span className="menu-icon" />
			</button>

			{/* Dark background behind the menu. Clicking it closes the menu. */}
			<div className="nav-shade" onClick={closeMenu} />
		</header>
	);
}
