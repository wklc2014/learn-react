import '@assets/less/__global.less';
import '@assets/scripts/__global.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { HashRouter as Router } from "react-router-dom";
import MainLayout from '@layouts/index.js';
import configureStore from '@models/index.js';

const domRoot = document.getElementById('root');
const store = configureStore();
const App = () => (
    <Provider store={store}>
        <Router>
            <MainLayout />
        </Router>
    </Provider>
);
render(<App />, domRoot);
