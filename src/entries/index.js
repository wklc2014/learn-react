import '../assets/less/__global.less';
import '../assets/scripts/__global.js';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import MainLayout from '@layouts/index.js';
import mirror from '@components/mirror/index.js';
import userModel from '@/components/mirror/example/user.js';
import carModel from '@/components/mirror/example/car.js';
import mirrorLoading from '@components/mirror/mirror-loading.js';

mirror.model(userModel);
mirror.model(carModel);
const store = mirror.init({ loading: {} });

console.log('mirror>>>', mirror);

const App = () => (
    <Provider store={store}>
        <Router>
            <MainLayout />
        </Router>
    </Provider>
);

render(<App />, document.getElementById('root'));
