import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp({
	apiKey: "AIzaSyDWMXUXoyx3oqpPt0Tx1xuFTysvb4EkZx4",
    authDomain: "merp-c0633.firebaseapp.com",
    databaseURL: "https://merp-c0633.firebaseio.com",
    projectId: "merp-c0633",
    storageBucket: "merp-c0633.appspot.com",
    messagingSenderId: "273483822500",
    appId: "1:273483822500:web:dbf79e0b913790bd"
});



ReactDOM.render(
    <App />, document.getElementById('root'));

serviceWorker.unregister();
