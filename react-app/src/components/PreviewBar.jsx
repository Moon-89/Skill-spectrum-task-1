import { useEffect, useState } from 'react';

// Outline device icons on a 24×24 grid.
const DesktopIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<rect x="2" y="3.5" width="20" height="13" rx="1.2" className="fill" />
		<path d="M9.5 16.5 9 20.5h6l-.5-4 M7 20.5h10" />
	</svg>
);
const TabletIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<rect x="4.5" y="2" width="15" height="20" rx="2" />
		<path d="M4.5 18h15" />
		<circle cx="12" cy="20" r=".6" className="fill" />
	</svg>
);
const MobileIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<rect x="7" y="2" width="10" height="20" rx="1.8" />
		<path d="M7 18h10" />
		<circle cx="12" cy="20" r=".6" className="fill" />
	</svg>
);

const devices = [
	{ id: 'desktop', label: 'Desktop preview', Icon: DesktopIcon, width: '100%' },
	{ id: 'tablet', label: 'Tablet preview', Icon: TabletIcon, width: '768px' },
	{ id: 'mobile', label: 'Mobile preview', Icon: MobileIcon, width: '375px' },
];

const FAV_KEY = 'glint-preview-favorite';

function readFavorite() {
	try { return localStorage.getItem(FAV_KEY) !== '0'; } catch { return true; }
}

export default function PreviewBar() {
	const [device, setDevice] = useState('desktop');
	const [favorite, setFavorite] = useState(readFavorite);
	const frameSrc = `${window.location.pathname}?frame=1${window.location.hash}`;

	useEffect(() => {
		try { localStorage.setItem(FAV_KEY, favorite ? '1' : '0'); } catch { /* storage unavailable */ }
	}, [favorite]);

	useEffect(() => {
		document.body.classList.add('preview-shell');
		return () => document.body.classList.remove('preview-shell');
	}, []);

	const width = devices.find(d => d.id === device).width;

	return (
		<div className="preview">
			<header className="pv-bar" aria-label="Template preview toolbar">
				<a className="pv-logo" href="https://colorlib.com/" target="_blank" rel="noopener noreferrer" aria-label="Colorlib home">
					colorlib<span>.</span>
				</a>
				<a className="pv-template" href={frameSrc} title="Open Glint without the toolbar">
					<i className="fa-solid fa-plus" aria-hidden="true" /> GLINT
				</a>
				<div className="pv-spacer" />
				<div className="pv-devices" role="group" aria-label="Preview size">
					{devices.map(d => (
						<button
							key={d.id}
							type="button"
							className={`pv-btn pv-device${device === d.id ? ' active' : ''}`}
							aria-label={d.label}
							aria-pressed={device === d.id}
							title={d.label}
							onClick={() => setDevice(d.id)}
						><d.Icon /></button>
					))}
				</div>
				<button
					type="button"
					className={`pv-btn pv-fav${favorite ? ' on' : ''}`}
					aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
					aria-pressed={favorite}
					title={favorite ? 'Remove from favorites' : 'Add to favorites'}
					onClick={() => setFavorite(f => !f)}
				>
					<i className={`${favorite ? 'fa-solid' : 'fa-regular'} fa-heart`} aria-hidden="true" />
					{favorite && <span className="pv-badge">1</span>}
				</button>
				<a className="pv-btn pv-cart" href="https://colorlib.com/wp/templates/" target="_blank" rel="noopener noreferrer" aria-label="Browse more templates" title="Browse more templates">
					<i className="fa-solid fa-cart-shopping" aria-hidden="true" />
				</a>
				<a className="pv-btn pv-close" href={frameSrc} aria-label="Close preview toolbar" title="Close preview toolbar">
					<i className="fa-solid fa-xmark" aria-hidden="true" />
				</a>
			</header>
			<div className="pv-stage">
				<iframe
					className={`pv-frame pv-frame--${device}`}
					src={frameSrc}
					title="Glint template preview"
					style={{ width }}
				/>
			</div>
		</div>
	);
}
