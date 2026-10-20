export default function Preloader({ done }) {
	return (
		<div id="preloader" className={done ? 'done' : ''} aria-hidden="true">
			<div className="loader-dots"><span /><span /><span /></div>
		</div>
	);
}
