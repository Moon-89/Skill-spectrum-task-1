import { useState } from 'react';
import { IMG } from '../data.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer({ showTop }) {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState({ text: '', error: false });

	const onSubmit = e => {
		e.preventDefault();
		const ok = EMAIL_RE.test(email.trim());
		setMessage(ok
			? { text: 'Thank you! Please check your inbox to confirm your subscription.', error: false }
			: { text: 'Please enter a valid email address.', error: true });
		if (ok) setEmail('');
	};

	return (
		<>
			<footer>
				<div className="gl-wrap">
					<div className="row footer-main">
						<div className="col-12 col-md-6 footer-desc pe-md-5">
							<a className="footer-logo" href="#top" aria-label="Glint - back to top">
								<img src={`${IMG}logo-footer.png`} alt="Glint" />
							</a>
							Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla porttitor accumsan tincidunt. Quaerat voluptas autem necessitatibus vitae aut.
						</div>
						<div className="col-12 col-md-6 footer-subscribe">
							<h4>Get Notified</h4>
							<p>Quia quo qui sed odit. Quaerat voluptas autem necessitatibus vitae aut non alias sed quia. Ut itaque enim optio ut excepturi deserunt iusto porro.</p>
							<form className="subscribe-form" noValidate aria-label="Newsletter subscription" onSubmit={onSubmit}>
								<i className="fa-regular fa-envelope mail-icon" aria-hidden="true" />
								<label htmlFor="mc-email" className="visually-hidden">Email Address</label>
								<input
									type="email"
									id="mc-email"
									placeholder="Email Address"
									value={email}
									onChange={e => setEmail(e.target.value)}
									aria-describedby="mc-message"
								/>
								<button type="submit" className="gl-btn gl-btn--primary">Subscribe</button>
								<span className={`subscribe-message${message.error ? ' error' : ''}`} id="mc-message" aria-live="polite">{message.text}</span>
							</form>
						</div>
					</div>
					<div className="footer-bottom">
						<div className="copyright">
							<span>© Copyright Glint {new Date().getFullYear()}</span>
							<span>Site Template by <a href="https://colorlib.com/" rel="noopener noreferrer" target="_blank">Colorlib</a></span>
						</div>
					</div>
				</div>
			</footer>
			<div className={`go-top${showTop ? ' visible' : ''}`}>
				<a href="#top" title="Back to Top" aria-label="Back to top"><i className="fa-solid fa-arrow-up" /></a>
			</div>
		</>
	);
}
