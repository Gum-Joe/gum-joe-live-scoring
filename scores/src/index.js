import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'; // eslint-disable-line
import App from './App';
import Scores from './Scores';
import './index.css';

class Wrapper extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path="/" component={Wrapper}>
      <IndexRoute component={App} />
      <Route path="/scores" component={Scores} />
    </Route>
  </Router>),
  document.getElementById('root')
);
