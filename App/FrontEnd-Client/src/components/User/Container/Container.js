import React, {Component} from 'react';

import DisplayStays from '../Stay/DisplayStays';
import SeeStay from '../Stay/SeeStay';

import BookingStay from '../Booking/BookingStay';

import RegistrationForm from '../Registration/RegistrationForm';

import UserProfil from '../Profil/UserProfil';
import EditUserProfil from '../Profil/EditUserProfil';

import ListSalePoints from '../SalePoint/ListSalePoints';
import SeeSalePoint from '../SalePoint/SeeSalePoint';

import ListAdvClients from '../AdvClient/ListAdvClients';
import SeeAdvClient from '../AdvClient/SeeAdvClient';

import GVC from '../GVC';
import UsersContact from '../Contact/UsersContact';
import PartnersContact from '../Contact/PartnersContact';
import FAQ from '../FAQ';

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
        return(
          <DisplayStays
            changeElmToRender={this.props.changeElmToRender}
          />);
        break;
      case "registration":
        return (
          <RegistrationForm
            changeElmToRender={this.props.changeElmToRender}
          />);
        break;
      case "detailedStay":
        return(
          <SeeStay
            stayId={this.props.concernedItemId}
            changeElmToRender={this.props.changeElmToRender}
          />
        )
      case "bookStay":
        return(
          <BookingStay
            stayId={this.props.concernedItemId}
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "userProfil":
        return (
          <UserProfil
            userId={this.props.concernedItemId}
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "editUserProfil":
        return(
          <EditUserProfil
            userId={this.props.concernedItemId}
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "salePoints":
        return(
          <ListSalePoints
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "salePoint":
        return(
          <SeeSalePoint
            salePointId={this.props.concernedItemId}
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "advClients":
        return(
          <ListAdvClients
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "advClient":
        return(
          <SeeAdvClient
            advClientId={this.props.concernedItemId}
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "GVC":
        return(
          <GVC />
        );
        break;
      case "usersContact":
        return(
          <UsersContact
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "partnersContact":
        return (
          <PartnersContact
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      case "FAQ":
        return(
          <FAQ
            changeElmToRender={this.props.changeElmToRender}
          />
        );
        break;
      default:
        return <h1>Not implemented, yet</h1>;
    }
  }
}

export default Container;
