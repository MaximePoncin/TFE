import React, {Component} from 'react';

import AdminInterface from './Admin/AdminInterface';
import UserInterface from './User/UserInterface';

// import Header from './Header/Header';
// import Navigation from './Navigation/Navigation';
// import Container from './Container/Container';
// import Footer from './Footer/Footer';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state= {
      elmToRender: "stays",
      role: "none",
      connected: this.isConnected(),
      currenLanguage: this.getCurrentLang()
    }

    this.changeElmToRender = this.changeElmToRender.bind(this);
    this.isConnected = this.isConnected.bind(this);
    this.handleConnection = this.handleConnection.bind(this);
    this.handleDisconnection = this.handleDisconnection.bind(this);
    this.getCurrentLang = this.getCurrentLang.bind(this);
    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
  }

  changeElmToRender(elm, concernedItem = null) {
    this.setState({
      elmToRender: elm,
      elmToRenderId: concernedItem
    });
  }

  isConnected(){
    return ((
      localStorage.getItem("LPC_beerTour_token") && localStorage.getItem("LPC_beerTour_user") &&
      localStorage.getItem("LPC_beerTour_token") !== "" && localStorage.getItem("LPC_beerTour_user") !== ""
    ) || false)
  }

  handleConnection(auth){
    // localStorage.removeItem("LPC_beerTour_token");

    localStorage.setItem("LPC_beerTour_token", auth.token);

    if (localStorage.getItem("LPC_beerTour_user")) {
      localStorage.removeItem("LPC_beerTour_user");
    }

    let role = auth.user.role;

    const LPC_user = {
      userMail: auth.user.mail,
      surname: auth.user.person.surname,
      givenName: auth.user.person.givenName,
      role: role
    }

    localStorage.setItem("LPC_beerTour_user", JSON.stringify(LPC_user));

    this.setState({
      connected: true,
      elmToRender: "stays",
      role: role
    })
  }

  handleDisconnection(){
    this.setState({
      connected: false,
      elmToRender: "stays",
      role: "none"
    });
    const defaultToken = require('../../config/token.config').defaultToken;

    localStorage.setItem("LPC_beerTour_token", defaultToken);

    localStorage.removeItem("LPC_beerTour_user");
  }

  getCurrentLang() {
    if (localStorage.getItem("LCP_beerTour_locale")) {
      return localStorage.getItem("LCP_beerTour_locale");
    }

    return "EN";
  }

  handleChangeLanguage(lang) {
    localStorage.setItem("LPC_beerTour_locale", lang);

    window.location.reload();
  }

  componentWillMount() {

    if(!localStorage.getItem("LPC_beerTour_token")) {
      const defaultToken = require('../../config/token.config').defaultToken;

      localStorage.setItem("LPC_beerTour_token", defaultToken);
    }

    if(localStorage.getItem("LPC_beerTour_user")) {
      this.setState({
        role: JSON.parse(localStorage.getItem("LPC_beerTour_user")).role
      })
    }
  }

  render() {
    if (!localStorage.getItem("LPC_beerTour_locale")) {
      // localStorage.setItem("LPC_beerTour_locale", "EN");
      this.handleChangeLanguage("EN");
    }

    if(this.state.role == "Admin" || this.state.role == "SuperAdmin"){
      return (
        <AdminInterface
          changeLanguage={this.handleChangeLanguage}
          changeElmToRender={this.changeElmToRender}
          connect={this.handleConnection}
          disconnect={this.handleDisconnection}
          isConnected={this.isConnected()}
          concernedItemId={this.state.elmToRenderId}
          renderingElm={this.state.elmToRender}
          changeLang={this.handleChangeLanguage}
        />
      );
    } else {
      return (
        <UserInterface
          changeLanguage={this.handleChangeLanguage}
          changeElmToRender={this.changeElmToRender}
          connect={this.handleConnection}
          disconnect={this.handleDisconnection}
          isConnected={this.isConnected()}
          concernedItemId={this.state.elmToRenderId}
          renderingElm={this.state.elmToRender}
          changeLang={this.handleChangeLanguage}
        />
      )
    }


  }
}

export default HomePage;
