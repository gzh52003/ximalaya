import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './pages/IndexPage';
import Login from './pages/Login';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from
  "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";

function Home() {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/home" component={IndexPage} />
      {/* <IndexPage></IndexPage> */}
    </Router>
  )

}
ReactDOM.render(
  <Home />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
