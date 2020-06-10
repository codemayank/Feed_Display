import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import mockData from './mock_data.json';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route key={Math.random().toString(36).substring(7)} path="/:sortBy?/:searchBy?" render={(props) => <App match={props.match} history={props.history}  mockData={mockData} />} />
          

      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
