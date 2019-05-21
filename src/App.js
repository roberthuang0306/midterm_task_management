import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Calendar from './components/Calendar';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="grid-container">
          <aside className="sidenav">
            <h1 className='logo'>Logo</h1>
            <ul style={{ "list-style-type": "None", "padding": 0 }}>
              <li className="nav-button">
                <Link to="/" className="nav-link">Calendar</Link>
              </li>
            </ul>
          </aside>
          <Switch>
            <Route path="/" component={Calendar} />
          </Switch>
        </div >
      </Router>

    );
  }

}

export default App;
