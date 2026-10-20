import { useRef, useState } from 'react';
import SocialList from './SocialList.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules = {
	name: { test: v => v.trim().length >= 2, message: 'Please enter your name (at least 2 characters).' },
	email: { test: v => EMAIL_RE.test(v.trim()), message: 'Please enter a valid email address.' },
	message: { test: v => v.trim().length >= 10, message: 'Please write a message (at least 10 characters).' },
};

const fields = [
	{ name: 'name', label: 'Your Name', type: 'text', autoComplete: 'name' },
	{ name: 'email', label: 'Your Email', type: 'email', autoComplete: 'email' },
	{ name: 'subject', label: 'Subject', type: 'text' },
	{ name: 'message', label: 'Your Message', textarea: true },
];

const empty = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
	const [values, setValues] = useState(empty);
	const [errors, setErrors] = useState({});
	const [status, setStatus] = useState('idle'); // idle | sending | sent
	const formRef = useRef(null);

	const check = (name, value) => (rules[name] && !rules[name].test(value) ? rules[name].message : null);

	const onChange = e => {
		const { name, value } = e.target;
		setValues(v => ({ ...v, [name]: value }));
		if (errors[name]) setErrors(err => ({ ...err, [name]: check(name, value) }));
	};

	const onBlur = e => {
		const { name, value } = e.target;
		if (value) setErrors(err => ({ ...err, [name]: check(name, value) }));
	};

	const onSubmit = e => {
		e.preventDefault();
		const next = Object.fromEntries(Object.keys(rules).map(k => [k, check(k, values[k])]));
		setErrors(next);
		const firstInvalid = Object.keys(next).find(k => next[k]);
		if (firstInvalid) { formRef.current.elements[firstInvalid].focus(); return; }
		setStatus('sending');
		setTimeout(() => { setStatus('sent'); setValues(empty); }, 1400);
	};

	return (
		<section id="contact" className="s-contact target-section">
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
						{status !== 'sent' ? (
							<form ref={formRef} className={`contact-form${status === 'sending' ? ' sending' : ''}`} noValidate onSubmit={onSubmit}>
								{fields.map(f => {
									const id = `contact-${f.name}`;
									const props = {
										id, name: f.name, placeholder: f.label, value: values[f.name],
										onChange, onBlur, autoComplete: f.autoComplete,
										'aria-invalid': errors[f.name] ? true : undefined,
									};
									return (
										<div key={f.name} className={`form-field${errors[f.name] ? ' invalid' : ''}`}>
											<label htmlFor={id} className="visually-hidden">{f.label}</label>
											{f.textarea ? <textarea rows="10" {...props} /> : <input type={f.type} {...props} />}
											{errors[f.name] && <span className="err">{errors[f.name]}</span>}
										</div>
									);
								})}
								<button type="submit" className="gl-btn gl-btn--primary">Submit</button>
								<div className="submit-loader" aria-hidden="true">
									<div className="text-loader">Sending...</div>
									<div className="loader-dots justify-content-center mt-2"><span /><span /><span /></div>
								</div>
							</form>
						) : (
							<div className="contact-status show" role="status">Your message was sent, thank you!</div>
						)}
					</div>
					<div className="contact-secondary">
						<div className="contact-info">
							<h3>Contact Info</h3>
							<div className="cinfo">
								<h5>Where to Find Us</h5>
								<p>123 Market Street<br />San Francisco, CA<br />94105 US</p>
							</div>
							<div className="cinfo">
								<h5>Email Us At</h5>
								<p><a href="mailto:contact@example.com">contact@example.com</a><br /><a href="mailto:info@example.com">info@example.com</a></p>
							</div>
							<div className="cinfo">
								<h5>Call Us At</h5>
								<p>Phone: +1 (415) 555-0132<br />Mobile: +1 (415) 555-0147<br />Fax: +1 (415) 555-0199</p>
							</div>
							<SocialList className="contact-social" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
