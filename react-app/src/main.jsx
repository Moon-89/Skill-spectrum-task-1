import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';
import App from './App.jsx';
import PreviewBar from './components/PreviewBar.jsx';

// "/?frame=1" shows only the website (this is what loads inside the preview iframe).
// "/" shows the preview toolbar with the website underneath.
const showSiteOnly = window.location.search.includes('frame');

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{showSiteOnly ? <App /> : <PreviewBar />}
	</React.StrictMode>
);
