import React, {Component} from 'react';
import {Grid, Row, Col, Panel, Button} from 'react-bootstrap';

import UserModel from '../../../model/User';


import Locale from '../../../locale';

class User extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: new UserModel({})
    }

    this.handleEdition = this.handleEdition.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  handleEdition() {
    this.props.handleEdition(this.props.userToRender.id);
  }

  handleDeletion() {
    UserModel.delete(this.props.userToRender.id)
    .then(deletedUser => {
      this.props.handleDeletion(deletedUser.id)
    })
    .catch(err => {
      console.log(err);
    })
  }

  componentWillMount() {
    this.setState({
      user: new UserModel(this.props.userToRender)
    })
  }

  render() {
    return(
      // <h1>{this.state.user.id}</h1>
      <li className="list-group-item">
        <Panel bsStyle="info">
          <Panel.Heading>
            <p>
              <b>
                {this.state.user.person.surname} {this.state.user.person.givenName}
              </b>
            </p>
          </Panel.Heading>
          <Panel.Body>
            <p>
              <span>
                <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.mail}</b>
                <br />
                {this.state.user.mail}
              </span>
              <br />
              <span>
                <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.address}</b>
                <br />
                {this.state.user.address.num}, {this.state.user.address.street} {this.state.user.address.postalCode}
                <br />
                {this.state.user.address.city}, {this.state.user.address.country}
              </span>
              <br />
              <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.phoneNum}</b>
              <br />
              {this.state.user.phoneNumber}
            </p>
          </Panel.Body>
          <Panel.Footer>
            <Grid fluid>
              <Row className="show-grid">
                <Col xs={6} className="text-center">
                  <Button
                    bsStyle="primary"
                    onClick={this.handleEdition}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].edit}
                  </Button>
                </Col>
                <Col xs={6} className="text-center">
                  <Button
                    bsStyle="danger"
                    onClick={this.handleDeletion}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].delete}
                  </Button>
                </Col>
              </Row>
            </Grid>
          </Panel.Footer>
        </Panel>
      </li>
    )
  }
}

export default User;
