import '../assets/less/index.less';
import '../assets/scripts/index.js';
import React from 'react';
import { render } from 'react-dom';
import MainLayout from '../layouts/index.js';
import env from '../utils/const.js';

if (env === 'development') {
  require('../mocks/index.js');
}

render(<MainLayout />, document.getElementById('root'));