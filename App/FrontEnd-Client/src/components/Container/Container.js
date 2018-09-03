import React, {Component} from 'react';

import DisplayStays from '../Stay/DisplayStays';
import SeeStay from '../Stay/SeeStay';
import BookingStay from '../Booking/BookingStay';
import RegistrationForm from '../Registration/RegistrationForm';
import UserProfil from '../User/UserProfil';
import EditUserProfil from '../User/EditUserProfil';

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    switch(this.props.renderingElm) {
      case "staysUser":
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
      case "detailedStayUser":
        return(
          <SeeStay
            stayId={this.props.concernedItemId}
            changeElmToRender={this.props.changeElmToRender}
          />
        )
      case "bookStayUser":
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
      case "GVC":
        return <h1>GVC</h1>;
        break;
      case "usersContact":
        return <h1>Users contact info</h1>;
        break;
      case "partnersContact":
        return <h1>Partners contact info</h1>;
        break;
      default:
        return <h1>Not implemented, yet</h1>;
    }
  }
}

export default Container;

// switch(this.props.renderingElm) {
//   case "stays":
//     return(
//       <DisplayStays
//         changeElmToRender={this.props.changeElmToRender}
//       />);
//     break;
//   case "registration":
//     return (
//       <RegistrationForm
//         changeElmToRender={this.props.changeElmToRender}
//       />);
//     break;
//   case "detailedStay":
//     return(
//       <SeeStay
//         stayId={this.props.concernedItemId}
//         changeElmToRender={this.props.changeElmToRender}
//       />
//     )
//   case "bookStay":
//     return(
//       <BookingStay
//         stayId={this.props.concernedItemId}
//         changeElmToRender={this.props.changeElmToRender}
//       />
//     );
//     break;
//   case "userProfil":
//     return (
//       <UserProfil
//         userId={this.props.concernedItemId}
//         changeElmToRender={this.props.changeElmToRender}
//       />
//     );
//     break;
//   case "editUserProfil":
//     return(
//       <EditUserProfil
//         userId={this.props.concernedItemId}
//         changeElmToRender={this.props.changeElmToRender}
//       />
//     );
//     break;
//   case "GVC":
//     return <h1>GVC</h1>;
//     break;
//   case "usersContact":
//     return <h1>Users contact info</h1>;
//     break;
//   case "partnersContact":
//     return <h1>Partners contact info</h1>;
//     break;
//   default:
//     return <h1>Not implemented, yet</h1>;
// }
