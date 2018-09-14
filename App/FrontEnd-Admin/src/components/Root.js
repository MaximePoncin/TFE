import React from 'react';
import { Provider } from 'react-redux';
import { LocaleProvider, Radio } from 'antd';
import moment from 'moment';

import App from './App';

import store from '../store';

import frFR from 'antd/lib/locale-provider/fr_FR';
import deDE from 'antd/lib/locale-provider/de_DE';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: null
    }

    this.changeLocale = this.changeLocale.bind(this);
  }

  changeLocale(e) {
    e.preventDefault();
    const localeValue = e.target.value;
    this.setState({ locale: localeValue });
    if (!localeValue) {
      moment.locale('en');
    } else if(localeValue === frFR) {
      moment.locale('fr');
    } else if(localeValue === deDE) {
      moment.locale('de');
    }
  }

  render() {
    const { locale } = this.state;
    return (
      <React.Fragment>
        <Radio.Group defaultValue={undefined} onChange={this.changeLocale}>
          <Radio.Button key="en" value={undefined}>English</Radio.Button>
          <Radio.Button key="fr" value={frFR}>Français</Radio.Button>
          <Radio.Button key="de" value={deDE}>Deutsch</Radio.Button>
        </Radio.Group>
        <Provider store={store}>
          <LocaleProvider locale={locale}>
            <App />
          </LocaleProvider>
        </Provider>
      </React.Fragment>
    )
  }
};

export default Root;
