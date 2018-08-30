import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import Locale from '../../../locale';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.goToStays = this.goToStays.bind(this);
    this.goToSalePoints = this.goToSalePoints.bind(this);
    this.goToAdvClients = this.goToAdvClients.bind(this);
  }

  goToStays() {
    this.props.changeElmToRender("stays");
  }

  goToSalePoints() {
    this.props.changeElmToRender("salePoints");
  }

  goToAdvClients() {
    this.props.changeElmToRender("advClients");
  }

  render() {
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
            <NavItem
              eventKey={2}
              href=""
              onClick={this.goToSalePoints}
            >
              {Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.salePoints}
            </NavItem>
            <NavItem
              eventKey={3}
              href=""
              onClick={this.goToAdvClients}
            >
              {Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.advClients}
            </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
