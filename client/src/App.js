import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import Home from './routes/Home';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Register from './routes/Register';
import MenuBar from './components/MenuBar';
import { Container } from 'semantic-ui-react'

function App() {
  return (
    <div className="App">
      <Router>
        <Container>
          <MenuBar />
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/404" component={NotFound} />
            <Redirect from="*" to="/404" />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
