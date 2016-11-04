import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import Main from './Main.jsx';
import Sass from './styles/style.scss';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path='/' component={Main} />
  </Router>,
  document.getElementById('app')
);
