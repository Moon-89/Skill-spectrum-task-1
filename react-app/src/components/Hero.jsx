import { socials } from '../data.js';

export default function Hero() {
	return (
		<section id="home" className="s-home target-section">
			<div className="overlay" />
			<div className="shadow-overlay" />
			<div className="home-content">
				<div className="gl-wrap">
					<div className="home-content__main">
						<h3>Welcome to Glint</h3>
						<h1>We are a creative group <br />of people who design <br />influential brands and <br />digital experiences.</h1>
						<div className="home-content__buttons">
							<a href="#contact" className="gl-btn">Start a Project</a>
							<a href="#about" className="gl-btn">More About Us</a>
						</div>
					</div>
				</div>
				<div className="home-content__scroll">
					<a href="#about" className="scroll-link"><i className="fa-solid fa-arrow-down" />Scroll Down</a>
				</div>
				<div className="home-content__line" />
			</div>
			<ul className="home-social">
				{socials.map(s => (
					<li key={s.name}>
						<a href="#0" aria-label={s.name}>
							<i className={`fa-brands ${s.heroIcon}`} aria-hidden="true" />
							<span aria-hidden="true">{s.name}</span>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
