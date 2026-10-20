import { socials } from '../data.js';

export default function SocialList({ className }) {
	return (
		<ul className={className} aria-label="Social media links">
			{socials.map(s => (
				<li key={s.name}>
					<a href="#0" aria-label={s.name}><i className={`fa-brands ${s.icon}`} aria-hidden="true" /></a>
				</li>
			))}
		</ul>
	);
}
