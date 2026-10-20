import { useEffect, useState } from 'react';

// The website is loaded inside an <iframe>. Changing the iframe's width
// lets us preview the site at desktop, tablet and mobile sizes.
const siteUrl = '/?frame=1';

const devices = [
	{ name: 'desktop', width: '100%' },
	{ name: 'tablet', width: '768px' },
	{ name: 'mobile', width: '375px' },
];

function DeviceIcon({ name }) {
	if (name === 'desktop') {
		return (
			<svg viewBox="0 0 24 24">
				<rect x="2" y="3.5" width="20" height="13" rx="1.2" className="fill" />
				<path d="M9.5 16.5 9 20.5h6l-.5-4 M7 20.5h10" />
			</svg>
		);
	}
	if (name === 'tablet') {
		return (
			<svg viewBox="0 0 24 24">
				<rect x="4.5" y="2" width="15" height="20" rx="2" />
				<path d="M4.5 18h15" />
			</svg>
		);
	}
	return (
		<svg viewBox="0 0 24 24">
			<rect x="7" y="2" width="10" height="20" rx="1.8" />
			<path d="M7 18h10" />
		</svg>
	);
}

export default function PreviewBar() {
	const [device, setDevice] = useState('desktop');
	const [liked, setLiked] = useState(true);

	// The toolbar page itself should not scroll
	useEffect(() => {
		document.body.classList.add('preview-shell');
	}, []);

	const frameWidth = devices.find(d => d.name === device).width;

	return (
		<div className="preview">
			<header className="pv-bar">
				<a className="pv-logo" href="https://colorlib.com/" target="_blank" rel="noreferrer">
					colorlib<span>.</span>
				</a>
				<a className="pv-template" href={siteUrl}>
					<i className="fa-solid fa-plus" /> GLINT
				</a>

				<div className="pv-spacer" />

				<div className="pv-devices">
					{devices.map(d => (
						<button
							key={d.name}
							type="button"
							className={device === d.name ? 'pv-btn pv-device active' : 'pv-btn pv-device'}
							title={d.name}
							onClick={() => setDevice(d.name)}
						>
							<DeviceIcon name={d.name} />
						</button>
					))}
				</div>

				<button type="button" className={liked ? 'pv-btn pv-fav on' : 'pv-btn pv-fav'} onClick={() => setLiked(!liked)}>
					<i className={liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
					{liked && <span className="pv-badge">1</span>}
				</button>

				<a className="pv-btn pv-cart" href="https://colorlib.com/wp/templates/" target="_blank" rel="noreferrer">
					<i className="fa-solid fa-cart-shopping" />
				</a>

				{/* Close = open the website without the toolbar */}
				<a className="pv-btn pv-close" href={siteUrl}>
					<i className="fa-solid fa-xmark" />
				</a>
			</header>

			<div className="pv-stage">
				<iframe className="pv-frame" src={siteUrl} title="Website preview" style={{ width: frameWidth }} />
			</div>
		</div>
	);
}
