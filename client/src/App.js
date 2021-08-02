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
import Post from './routes/Post';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from './client';
import AuthRoute from './util/AuthRoute';


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <div className="App">
      <Router>
        <Container>
          <MenuBar isLoggedIn={isLoggedIn} />
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/posts/:id" component={Post} />
            <Route path="/404" component={NotFound} />
            <Redirect from="*" to="/404" />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
