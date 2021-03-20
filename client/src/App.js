import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './pagepaths/Home';
import Home from './pagepaths/Login';
import Home from './pagepaths/Register';
import Home from './pagepaths/Messages';
import Home from './pagepaths/Search';
import Home from './pagepaths/Friends';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/messages' component={Messages}/>
      <Route exact path='/search' component={Search}/>
      <Route exact path='/search' component={Friends}/>
    </Router>
  );
}

export default App;
