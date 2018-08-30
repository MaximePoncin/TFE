import React, {Component} from 'react';
import {Grid, Row, Col, Panel, Button} from 'react-bootstrap';

import UserModel from '../../../model/User';


import Locale from '../../../locale';

class Admin extends Component {
  constructor(props){
    super(props);

    this.state = {
      admin: new UserModel({})
    }

    this.handleEdition = this.handleEdition.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  handleEdition() {
    this.props.handleEdition(this.props.adminToRender.id);
  }

  handleDeletion() {
    UserModel.delete(this.props.adminToRender.id)
    .then(deletedAdmin => {
      this.props.handleDeletion(deletedAdmin.id);
    })
    .catch(err => {
      console.log(err);
    })
  }

  componentWillMount() {
    // this.setState({
    //   admin: new UserModel(this.props.adminToRender)
    // })
  }

  render() {
    return(
      // <h1>{this.state.user.id}</h1>
      <li className="list-group-item">
        <Panel bsStyle="info">
          <Panel.Heading>
            <p>
              <b>
                {this.props.adminToRender.person.surname} {this.props.adminToRender.person.givenName}
              </b>
            </p>
          </Panel.Heading>
          <Panel.Body>
            <p>
              <span>
                <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.mail}</b>
                <br />
                {this.props.adminToRender.mail}
              </span>
              <br />
              <span>
                <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.address}</b>
                <br />
                {this.props.adminToRender.address.num}, {this.props.adminToRender.address.street} {this.props.adminToRender.address.postalCode}
                <br />
                {this.props.adminToRender.address.city}, {this.props.adminToRender.address.country}
              </span>
              <br />
              <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.phoneNum}</b>
              <br />
              {this.props.adminToRender.phoneNumber}
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

export default Admin;
