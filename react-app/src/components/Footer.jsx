import { useState } from 'react';
import { IMG } from '../data.js';

export default function Footer({ showBackToTop }) {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	function handleSubscribe(e) {
		e.preventDefault();
		if (!email.includes('@') || !email.includes('.')) {
			setMessage('Please enter a valid email address.');
			return;
		}
		setMessage('Thank you! You are now subscribed.');
		setEmail('');
	}

	return (
		<>
			<footer>
				<div className="gl-wrap">
					<div className="row footer-main">
						<div className="col-12 col-md-6 footer-desc pe-md-5">
							<a className="footer-logo" href="#top">
								<img src={IMG + 'logo-footer.png'} alt="Glint" />
							</a>
							Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla porttitor accumsan tincidunt. Quaerat voluptas autem necessitatibus vitae aut.
						</div>

						<div className="col-12 col-md-6 footer-subscribe">
							<h4>Get Notified</h4>
							<p>Quia quo qui sed odit. Quaerat voluptas autem necessitatibus vitae aut non alias sed quia. Ut itaque enim optio ut excepturi deserunt iusto porro.</p>

							<form className="subscribe-form" onSubmit={handleSubscribe} noValidate>
								<i className="fa-regular fa-envelope mail-icon" />
								<input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
								<button type="submit" className="gl-btn gl-btn--primary">Subscribe</button>
								<span className="subscribe-message">{message}</span>
							</form>
						</div>
					</div>

					<div className="footer-bottom">
						<div className="copyright">
							<span>© Copyright Glint {new Date().getFullYear()}</span>
							<span>Site Template by <a href="https://colorlib.com/" target="_blank" rel="noreferrer">Colorlib</a></span>
						</div>
					</div>
				</div>
			</footer>

			<div className={showBackToTop ? 'go-top visible' : 'go-top'}>
				<a href="#top" aria-label="Back to top"><i className="fa-solid fa-arrow-up" /></a>
			</div>
		</>
	);
}
