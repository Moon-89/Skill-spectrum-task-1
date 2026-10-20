import { useEffect, useRef, useState } from 'react';
import { IMG, navLinks } from '../data.js';
import { useBodyClass } from '../hooks.js';
import SocialList from './SocialList.jsx';

export default function Header({ opaque, current }) {
	const [open, setOpen] = useState(false);
	const toggleRef = useRef(null);
	const closeRef = useRef(null);

	useBodyClass('menu-open', open);

	useEffect(() => {
		if (!open) return;
		const timer = setTimeout(() => closeRef.current?.focus(), 300);
		const onKey = e => {
			if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
		};
		document.addEventListener('keydown', onKey);
		return () => { clearTimeout(timer); document.removeEventListener('keydown', onKey); };
	}, [open]);

	return (
		<>
			<header className="s-header">
				<div className="header-logo">
					<a href="#top" aria-label="Glint - Go to homepage">
						<img src={`${IMG}logo.png`} alt="Glint logo" width="238" height="78" />
					</a>
				</div>
				<nav className="header-nav" id="header-nav" aria-label="Main navigation" aria-hidden={!open}>
					<button
						ref={closeRef}
						type="button"
						className="header-nav__close"
						aria-label="Close navigation menu"
						onClick={() => { setOpen(false); toggleRef.current?.focus(); }}
					><span /></button>
					<div className="header-nav__content">
						<h3>Navigation</h3>
						<ul className="header-nav__list">
							{navLinks.map(link => (
								<li key={link.id} className={current === link.id ? 'current' : ''}>
									<a href={`#${link.id}`} onClick={() => setOpen(false)}>{link.label}</a>
								</li>
							))}
						</ul>
						<p>Perspiciatis hic praesentium nesciunt. Et neque a dolorum <a href="#0">voluptatem</a> porro iusto sequi veritatis libero enim. Iusto id suscipit veritatis neque reprehenderit.</p>
						<SocialList className="header-nav__social" />
					</div>
				</nav>
				<button
					ref={toggleRef}
					type="button"
					className={`menu-toggle${opaque ? ' opaque' : ''}`}
					aria-controls="header-nav"
					aria-expanded={open}
					aria-label="Menu"
					onClick={() => setOpen(o => !o)}
				>
					<span className="menu-text">Menu</span>
					<span className="menu-icon" />
				</button>
				{/* Inside the header so it shares the nav's stacking context and stays beneath it */}
				<div className="nav-shade" onClick={() => setOpen(false)} />
			</header>
		</>
	);
}
