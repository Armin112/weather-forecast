import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App';
import store from './store'
import "./styles/index.scss"
import 'react-tabs/style/react-tabs.css';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));

