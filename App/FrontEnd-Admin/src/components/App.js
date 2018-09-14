import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import LogInForm from './LogInForm';

const mapStateToProps = state => {
  return {loggedIn: state.loggedIn};
};

class App extends React.Component {
  render() {
    if(this.props.loggedIn) {
      return (
        <BrowserRouter>
          <Route path="/:filter?" component={LogInForm} />
        </BrowserRouter>
      );
    } else {
      return (
        <LogInForm />
      );
    }
  }
}

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
