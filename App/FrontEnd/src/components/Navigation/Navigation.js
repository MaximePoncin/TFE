import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import Locale from '../../../locale';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.goToStays = this.goToStays.bind(this);
  }

  goToStays() {
    this.props.changeElmToRender("stays");
  }

  render() {
    if(localStorage.getItem("LPC_beerTour_user")) {
      switch(JSON.parse(localStorage.getItem("LPC_beerTour_user")).role) {
        case "user":
          return (
            <Navbar>
              <Nav>
                  <NavItem
                    eventKey={1}
                    href=""
                    onClick={this.goToStays}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.stays}
                  </NavItem>
              </Nav>
            </Navbar>
          );
          break;
        case "admin":
          return (
            <Navbar>
              <Nav>
                <NavItem
                  eventKey={1}
                  href=""
                  onClick={this.goToStays}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.stays}
                </NavItem>
              </Nav>
            </Navbar>
          );
          break;
        case "superAdmin":
          return (
            <Navbar>
              <Nav>
                <NavItem
                  eventKey={1}
                  href=""
                  onClick={this.goToStays}
                  >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.stays}
                </NavItem>
              </Nav>
            </Navbar>
          );
          break;
        default:
          return <h3>{Locale[localStorage.getItem('LPC_beerTour_locale')].error}</h3>;
      }
    } else {
      return <h3>{Locale[localStorage.getItem('LPC_beerTour_locale')].error}</h3>;
    }
  }
}

export default Navigation;
