import React from 'react';
import ReactDOM from 'react-dom';
import Index from './JSX/Index';
require('./JSX/AUI/Btn');
require("./Contents/index.less");
require('./Util/Util.jsx');
ReactDOM.render(
    (<Index />),
    document.getElementById('app')
);

