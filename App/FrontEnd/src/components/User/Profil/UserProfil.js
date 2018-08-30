import React, {Component} from 'react';
import {Grid, Row, Col, Button, ControlLabel} from 'react-bootstrap';
import moment from 'moment';

import UserModel from '../../../model/User';

import Locale from '../../../locale';

class UserProfil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currUser: new UserModel({}),
      givenName: "",
      surname: "",
      birthDate: "",
      mail: "",
      phone: "",
      address: ""
    }

    this.editUserProfil = this.editUserProfil.bind(this);
  }

  editUserProfil() {
    this.props.changeElmToRender("editUserProfil", this.props.userId);
  }

  componentWillMount() {
    UserModel.getByMail(this.props.userId)
    .then(user => {
      this.setState({
        // currUser: user,
        givenName: user.person.givenName,
        surname: user.person.surname,
        birthDate: new Date(user.person.birthDate),
        mail: user.mail,
        phone: user.phoneNumber,
        address: user.address
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <h2>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.personnalInfo}</h2>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12}>
            <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.surname}</ControlLabel>
            <p>{this.state.surname}</p>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12}>
            <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.givenName}</ControlLabel>
            <p>{this.state.givenName}</p>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12}>
            <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.birthDate}</ControlLabel>
            <p>{moment(this.state.birthDate).format('DD / MM / YYYY')}</p>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12}>
            <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.mail}</ControlLabel>
            <p>{this.state.mail}</p>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12}>
            <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.phoneNum}</ControlLabel>
            <p>{this.state.phone}</p>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12}>
            <h3>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.adress}</h3>
            <p>{this.state.address.num}, {this.state.address.street} {this.state.address.postalCode}</p>
            <p>{this.state.address.city} {this.state.address.country}</p>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12}>
            <Button
              bsStyle="primary"
              type="button"
              onClick={this.editUserProfil}
            >
              {Locale[localStorage.getItem('LPC_beerTour_locale')].edit}
            </Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default UserProfil;
