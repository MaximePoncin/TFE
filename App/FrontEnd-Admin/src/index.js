import React from 'react';
import { render } from 'react-dom';
import propTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import { LocaleProvider } from 'antd';
import frFR from 'antd/lib/locale-provider/fr_FR';
import App from './App';
import LogInForm from './components/LogInForm';

import './assets/stylesheets/styles.scss';
// import 'antd/dist/antd.css';

render(
  <Provider store={store}>
    <LocaleProvider locale={frFR}>
      <Router>
        <Route path="/:filter?" component={LogInForm} />
      </Router>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);

//TODO: Faire un élément Root logé dans le Provider pour qu'il acceuil le LocaleProvider (dont l'attribut locale serait basé sur un des états du store) ainsi que le Router
