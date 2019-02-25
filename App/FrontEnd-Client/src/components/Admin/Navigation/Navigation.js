import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import Locale from '../../../locale';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.goToBookedStays = this.goToBookedStays.bind(this);
    // this.createBookedStay = this.createBookedStay.bind(this);

    this.goToStays = this.goToStays.bind(this);
    this.createStay = this.createStay.bind(this);

    this.goToUsers = this.goToUsers.bind(this);
    this.createUser = this.createUser.bind(this);

    this.goToAdmins = this.goToAdmins.bind(this);
    this.createAdmin = this.createAdmin.bind(this);

    this.goToSalePoints = this.goToSalePoints.bind(this);
    this.createSalePoint = this.createSalePoint.bind(this);

    this.goToAdvClients = this.goToAdvClients.bind(this);
    this.createAdvClient = this.createAdvClient.bind(this);
  }

  goToBookedStays() {
    this.props.changeElmToRender("bookedStays");
  }

  // createBookedStay() {
  //   this.props.changeElmToRender("createBookedStay")
  // }

  goToStays() {
    this.props.changeElmToRender("stays");
  }

  createStay() {
    this.props.changeElmToRender("createStay");
  }

  goToUsers() {
    this.props.changeElmToRender("users");
  }

  createUser() {
    this.props.changeElmToRender("createUser")
  }

  goToAdmins() {
    this.props.changeElmToRender("admins");
  }

  createAdmin() {
    this.props.changeElmToRender("createAdmin");
  }

  goToSalePoints() {
    this.props.changeElmToRender("salePoints");
  }

  createSalePoint() {
    this.props.changeElmToRender("createSalePoint")
  }

  goToAdvClients() {
    this.props.changeElmToRender("advClients");
  }

  createAdvClient() {
    this.props.changeElmToRender("createAdvClient");
  }

  render() {
    const user = JSON.parse(localStorage.getItem("LPC_beerTour_user"));

    if(user && user.role == "Admin") {
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <span>Super Admin</span>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown
              eventKey={1}
              title={Locale[localStorage.getItem('LPC_beerTour_locale')].bookedStay.bookedStay}
              id="dropDownForBookedStays"
              >
                <MenuItem
                  eventKey={1.1}
                  onClick={this.goToBookedStays}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].bookedStay.seeBookedStays}
                </MenuItem>
                {/* <MenuItem
                  eventKey={1.2}
                  onClick={this.createBookedStay}
                >
                  {Locale.bookedStay.createBookedStay}
                </MenuItem> */}
            </NavDropdown>
            <NavDropdown
              eventKey={2}
              title={Locale[localStorage.getItem('LPC_beerTour_locale')].stay.stays}
              id="dropDownForStays"
              >
                <MenuItem
                  eventKey={2.1}
                  onClick={this.goToStays}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.seeStays}
                </MenuItem>
                <MenuItem
                  eventKey={2.2}
                  onClick={this.createStay}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.createStay}
                </MenuItem>
            </NavDropdown>
            <NavDropdown
              eventKey={3}
              title={Locale[localStorage.getItem('LPC_beerTour_locale')].user.users}
              id="dropDownForUsers"
              >
                <MenuItem
                  eventKey={3.1}
                  onClick={this.goToUsers}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].user.seeUsers}
                </MenuItem>
                <MenuItem
                  eventKey={3.2}
                  onClick={this.createUser}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].user.createUser}
                </MenuItem>
            </NavDropdown>
            <NavDropdown
              eventKey={5}
              title={Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.salePoints}
              id="dropDownForSalePoints"
              >
                <MenuItem
                  eventKey={5.1}
                  onClick={this.goToSalePoints}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.seeSalePoints}
                </MenuItem>
                <MenuItem
                  eventKey={5.2}
                  onClick={this.createSalePoint}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.createSalePoint}
                </MenuItem>
            </NavDropdown>
            <NavDropdown
              eventKey={6}
              title={Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.advClients}
              id="dropDownForAdvClients"
              >
                <MenuItem
                  eventKey={6.1}
                  onClick={this.goToAdvClients}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.seeAdvClients}
                </MenuItem>
                <MenuItem
                  eventKey={6.2}
                  onClick={this.createAdvClient}
                >
                  {[localStorage.getItem('LPC_beerTour_locale')][localStorage.getItem('LPC_beerTour_locale')].advertisingClient.createAdvClient}
                </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      )
    } else if (user && user.role == "SuperAdmin"){
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <span>Super Admin</span>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown
              eventKey={1}
              title={Locale[localStorage.getItem('LPC_beerTour_locale')].bookedStay.bookedStay}
              id="dropDownForBookedStays"
              >
                <MenuItem
                  eventKey={1.1}
                  onClick={this.goToBookedStays}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].bookedStay.seeBookedStays}
                </MenuItem>
                {/* <MenuItem
                  eventKey={1.2}
                  onClick={this.createBookedStay}
                >
                  {Locale.bookedStay.createBookedStay}
                </MenuItem> */}
            </NavDropdown>
            <NavDropdown
              eventKey={2}
              title={Locale[localStorage.getItem('LPC_beerTour_locale')].stay.stays}
              id="dropDownForStays"
              >
                <MenuItem
                  eventKey={2.1}
                  onClick={this.goToStays}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.seeStays}
                </MenuItem>
                <MenuItem
                  eventKey={2.2}
                  onClick={this.createStay}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.createStay}
                </MenuItem>
            </NavDropdown>
            <NavDropdown
              eventKey={3}
              title={Locale[localStorage.getItem('LPC_beerTour_locale')].user.users}
              id="dropDownForUsers"
              >
                <MenuItem
                  eventKey={3.1}
                  onClick={this.goToUsers}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].user.seeUsers}
                </MenuItem>
                <MenuItem
                  eventKey={3.2}
                  onClick={this.createUser}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].user.createUser}
                </MenuItem>
            </NavDropdown>
            <NavDropdown
              eventKey={4}
              title={Locale[localStorage.getItem('LPC_beerTour_locale')].admin.admins}
              id="dropDownForAmins"
              >
                <MenuItem
                  eventKey={4.1}
                  onClick={this.goToAdmins}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].admin.seeAdmins}
                </MenuItem>
                <MenuItem
                  eventKey={4.2}
                  onClick={this.createAdmin}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].admin.createAdmin}
                </MenuItem>
            </NavDropdown>
            <NavDropdown
              eventKey={5}
              title={Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.salePoints}
              id="dropDownForSalePoints"
              >
                <MenuItem
                  eventKey={5.1}
                  onClick={this.goToSalePoints}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.seeSalePoints}
                </MenuItem>
                <MenuItem
                  eventKey={5.2}
                  onClick={this.createSalePoint}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.createSalePoint}
                </MenuItem>
            </NavDropdown>
            <NavDropdown
              eventKey={6}
              title={Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.advClients}
              id="dropDownForAdvClients"
              >
                <MenuItem
                  eventKey={6.1}
                  onClick={this.goToAdvClients}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.seeAdvClients}
                </MenuItem>
                <MenuItem
                  eventKey={6.2}
                  onClick={this.createAdvClient}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.createAdvClient}
                </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
      )
    } else {
      <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].error}</h1>
    }
  }
}

export default Navigation;
