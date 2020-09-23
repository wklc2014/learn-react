import '@assets/less/__global.less';
import '@assets/scripts/__global.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { HashRouter as Router } from "react-router-dom";
import MainLayout from '@layouts/index.js';
import mirror from '@models/index.js';

const App = () => (
    <Provider store={mirror.store}>
        <Router>
            <MainLayout />
        </Router>
    </Provider>
);

render(<App />, document.getElementById('root'));
