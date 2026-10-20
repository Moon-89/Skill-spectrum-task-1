import { services } from '../data.js';

function ServiceIcon({ paths, handles, circle }) {
	return (
		<svg viewBox="0 0 48 48" aria-hidden="true">
			{circle && <circle cx="24" cy="24" r="21" />}
			{paths.map(d => <path key={d} d={d} />)}
			{handles && <path className="handle" d={handles} />}
		</svg>
	);
}

export default function Services() {
	return (
		<section id="services" className="s-services target-section">
			<div className="gl-wrap">
				<div className="section-header has-sep reveal">
					<h3 className="subhead">What We Do</h3>
					<h2 className="display-2x">We’ve got everything you need to launch and grow your business</h2>
				</div>
				<div className="row services-list">
					{services.map((s, i) => (
						<div key={s.title} className={`col-12 col-lg-6 service-item ${i % 2 ? 'even' : 'odd'} reveal`}>
							<div className="service-icon"><ServiceIcon {...s} /></div>
							<div className="service-text">
								<h3>{s.title}</h3>
								<p>{s.text}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
