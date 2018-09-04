import React from 'react';
import ReactDOM from 'react-dom';
import { getFilledArray } from './utils';

import App from './App';
import './index.css';

const filled = getFilledArray();

ReactDOM.render(<App array={filled} />, document.getElementById('root'));
