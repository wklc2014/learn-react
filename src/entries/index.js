import '../assets/less/__global.less';
import '../assets/scripts/__global.js';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from "react-router-dom";
import MainLayout from '../layouts/index.js';
// import store from '../models/stores/index.js';

const domRoot = document.getElementById('root');
const App = () => (
    <Router>
        <MainLayout />
    </Router>
)
render(<App />, domRoot);
