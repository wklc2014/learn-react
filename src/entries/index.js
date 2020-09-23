import '@assets/less/__global.less';
import '@assets/scripts/__global.js';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { HashRouter as Router } from "react-router-dom";
import MainLayout from '@layouts/index.js';
import mirror from '@components/mirror/index.js';
import userModel from '@/components/mirror/example/user.js';
import carModel from '@/components/mirror/example/car.js';
// import loadingPlugin from '@/components/mirror/plugins/loading.js';

mirror.model(userModel);
mirror.model(carModel);
// mirror.install(loadingPlugin, {});
const store = mirror.init();

 // log middleware for development
    if (process.env.NODE_ENV !== 'production') {
        const { createLogger } = require('redux-logger');
        const logMiddleware = createLogger({ collapsed: true });
        middlewares.push(logMiddleware);
    }

console.log('mirror>>>', mirror);

const App = () => (
    <Provider store={store}>
        <Router>
            <MainLayout />
        </Router>
    </Provider>
);

render(<App />, document.getElementById('root'));
