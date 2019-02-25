import React, {Component} from 'react';

import ListBookedStays from '../BookedStay/ListBookedStays';
import EditBookedStay from '../BookedStay/EditBookedStay';
import CreateBookedStay from '../BookedStay/CreateBookedStay';

import CreateStay from '../Stay/CreateStay';
import ListStays from '../Stay/ListStays';
import EditStay from '../Stay/EditStay';

import CreateUser from '../User/CreateUser';
import ListUsers from '../User/ListUser';
import EditUser from '../User/EditUser';

import CreateAdmin from '../Admin/CreateAdmin';
import ListAdmins from '../Admin/ListAdmin';
import EditAdmin from '../Admin/EditAdmin';

import CreateSalePoint from '../SalePoint/CreateSalePoint';
import ListSalePoints from '../SalePoint/ListSalePoints';
import EditSalePoint from '../SalePoint/EditSalePoint';

import CreateAdvClient from '../AdvClient/CreateAdvClient';
import ListAdvClients from '../AdvClient/ListAdvClients';
import EditAdvClient from '../AdvClient/EditAdvClient';

import Locale from '../../../locale';

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    switch(this.props.renderingElm) {
      case "stays":
          return (
            <ListStays
              changeElmToRender={this.props.changeElmToRender}
            />
          );
        break;
      case "createStay":
        return(
          <CreateStay
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "editStay":
        return (
          <EditStay
            changeElmToRender={this.props.changeElmToRender}
            concernedStayId={this.props.concernedItemId}
          />
        );
        break;
      case "bookedStays":
        return (
          <ListBookedStays
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "createBookedStay":
        return(
        <CreateBookedStay
          changeElmToRender={this.props.changeElmToRender}
          concernedStayId={this.props.concernedItemId}
        />
        );
        break;
      case "editBookedStay":
        return(
          <EditBookedStay
            changeElmToRender={this.props.changeElmToRender}
            concernedBookedStayId={this.props.concernedItemId}
          />
        );
        break;
      case "users":
        return (
          <ListUsers
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "createUser":
        return(
          <CreateUser
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "editUser":
        return(
          <EditUser
            changeElmToRender={this.props.changeElmToRender}
            concernedUserId={this.props.concernedItemId}
          />
        );
        break;
      case "admins":
          return (
            <ListAdmins
              changeElmToRender={this.props.changeElmToRender}
            />
          );
        break;
      case "createAdmin":
        return(
          <CreateAdmin
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "editAdmin":
        return (
          <EditAdmin
            changeElmToRender={this.props.changeElmToRender}
            concernedAdminId={this.props.concernedItemId}
          />
        )
      case "salePoints":
        return (
          <ListSalePoints
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "createSalePoint":
        return(
          <CreateSalePoint
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "editSalePoint":
        return(
          <EditSalePoint
            changeElmToRender={this.props.changeElmToRender}
            concernedSalePointId={this.props.concernedItemId}
          />
        );
        break;
      case "advClients":
        return (
          <ListAdvClients
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "createAdvClient":
        return(
          <CreateAdvClient
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "editAdvClient":
        return(
          <EditAdvClient
            changeElmToRender={this.props.changeElmToRender}
            concernedAdvClientId={this.props.concernedItemId}
          />
        )
        break;
      default:
        return <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].error}</h1>;
    }
  }
}

export default Container;
