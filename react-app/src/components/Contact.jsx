import { useState } from 'react';
import SocialList from './SocialList.jsx';

export default function Contact() {
	const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
	const [errors, setErrors] = useState({});
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);

	// Update the field that was typed in
	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function validate() {
		const newErrors = {};
		if (form.name.trim().length < 2) newErrors.name = 'Please enter your name.';
		if (!form.email.includes('@') || !form.email.includes('.')) newErrors.email = 'Please enter a valid email.';
		if (form.message.trim().length < 10) newErrors.message = 'Message should be at least 10 characters.';
		return newErrors;
	}

	function handleSubmit(e) {
		e.preventDefault();
		const newErrors = validate();
		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) return; // stop if there are errors

		// No real server here, so we just pretend to send it
		setSending(true);
		setTimeout(() => {
			setSending(false);
			setSent(true);
		}, 1500);
	}

	return (
		<section id="contact" className="s-contact">
			<div className="overlay" />
			<div className="contact__line" />

			<div className="gl-wrap">
				<div className="section-header reveal">
					<h3 className="subhead">Contact Us</h3>
					<h2 className="display-2x light">Reach out for a new project or just say hello</h2>
				</div>

				<div className="contact-content reveal">
					<div className="contact-primary">
						<h3>Send Us A Message</h3>

						{sent ? (
							<div className="contact-status show">Your message was sent, thank you!</div>
						) : (
							<form className={sending ? 'contact-form sending' : 'contact-form'} onSubmit={handleSubmit} noValidate>
								<div className={errors.name ? 'form-field invalid' : 'form-field'}>
									<input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} />
									{errors.name && <span className="err">{errors.name}</span>}
								</div>

								<div className={errors.email ? 'form-field invalid' : 'form-field'}>
									<input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} />
									{errors.email && <span className="err">{errors.email}</span>}
								</div>

								<div className="form-field">
									<input name="subject" type="text" placeholder="Subject" value={form.subject} onChange={handleChange} />
								</div>

								<div className={errors.message ? 'form-field invalid' : 'form-field'}>
									<textarea name="message" placeholder="Your Message" rows="10" value={form.message} onChange={handleChange} />
									{errors.message && <span className="err">{errors.message}</span>}
								</div>

								<button type="submit" className="gl-btn gl-btn--primary">Submit</button>

								<div className="submit-loader">
									<div className="text-loader">Sending...</div>
								</div>
							</form>
						)}
					</div>

					<div className="contact-secondary">
						<h3>Contact Info</h3>

						<div className="cinfo">
							<h5>Where to Find Us</h5>
							<p>123 Market Street<br />San Francisco, CA<br />94105 US</p>
						</div>

						<div className="cinfo">
							<h5>Email Us At</h5>
							<p>contact@example.com<br />info@example.com</p>
						</div>

						<div className="cinfo">
							<h5>Call Us At</h5>
							<p>Phone: +1 (415) 555-0132<br />Mobile: +1 (415) 555-0147<br />Fax: +1 (415) 555-0199</p>
						</div>

						<SocialList className="contact-social" />
					</div>
				</div>
			</div>
		</section>
	);
}
