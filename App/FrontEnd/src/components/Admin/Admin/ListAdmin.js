import React, {Component} from 'react';
import {Grid, Row, Col, ListGroup} from 'react-bootstrap';
import _ from 'lodash';

import Admin from './Admin';

import UserModel from '../../../model/User';

import Locale from '../../../locale';

class ListAdmins extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // stays: [new StayModel({})]
      admins: [new UserModel({})]
    }

    this.handleEditAdmin = this.handleEditAdmin.bind(this);
    this.handleDeleteAdmin = this.handleDeleteAdmin.bind(this);
  }

  handleEditAdmin(adminId) {
    this.props.changeElmToRender("editAdmin", adminId);
  }

  handleDeleteAdmin(adminId) {
    console.log("deletion: " + adminId);

    let currentAdmins = this.state.admins;
    const newAdminsTab = _.reject(currentAdmins, {"id": adminId});

    console.log(newAdminsTab);

    this.setState({
      admins: newAdminsTab
    })
  }

  componentWillMount() {
    UserModel.getAll()
    .then(receivedUsers => {
      this.setState({
        admins: _.filter(receivedUsers, {'role': 'Admin'})
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if(this.state.admins.length > 0) {
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].user.usersList}</h1>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12}>
              <ul>
                <ListGroup>
                  {
                    this.state.admins.map(admin => {
                      return (
                        <Admin
                          key={admin.id}
                          adminToRender={admin}
                          handleEdition={this.handleEditAdmin}
                          handleDeletion={this.handleDeleteAdmin}
                        />
                      )
                    })
                  }
                </ListGroup>
              </ul>
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return(
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.noneToDisplay}</h1>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}

export default ListAdmins;
