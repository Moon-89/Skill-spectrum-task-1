import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';
import App from './App.jsx';
import PreviewBar from './components/PreviewBar.jsx';

// The top-level page shows the preview toolbar with the site in an iframe (?frame=1),
// so the device buttons resize a real viewport and the site's media queries apply.
const inFrame = new URLSearchParams(window.location.search).has('frame');

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{inFrame ? <App /> : <PreviewBar />}
	</React.StrictMode>
);
