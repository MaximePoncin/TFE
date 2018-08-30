import React, {Component} from 'react';

import LoginForm from '../Login/LoginForm';
import UserMenu from '../User/UserMenu';
import AdminMenu from '../Admin/AdminMenu';

import {PageHeader} from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    // this.disconnect = this.disconnect.bind(this);
  }

  // disconnect() {
  //   this.props.disconnect();
  // }

  render() {
    if(!this.props.isConnected) {
      return (
        <PageHeader>
          <LoginForm
            connect={this.props.connect}
            changeElmToRender={this.props.changeElmToRender}
            changeLang={this.props.changeLang}
          />
        </PageHeader>
      )
    } else {
      const role = JSON.parse(localStorage.getItem("LPC_beerTour_user")).role;

      if(role == "User") {
        return (
          <PageHeader>
            <UserMenu
              userInfo={JSON.parse(localStorage.getItem("LPC_beerTour_user"))}
              disconnect={this.props.disconnect}
              changeElmToRender={this.props.changeElmToRender}
              changeLang={this.props.changeLang}
            />
          </PageHeader>
        )
      } else if(role == "Admin" || role == "SuperAdmin") {
        return (
          <PageHeader>
            <AdminMenu
              userInfo={JSON.parse(localStorage.getItem("LPC_beerTour_user"))}
              disconnect={this.props.disconnect}
              changeElmToRender={this.props.changeElmToRender}
              changeLang={this.props.changeLang}
            />
          </PageHeader>
        )
      } else {
        return <h1>Error</h1>
      }
    }
  }
}

export default Header;
