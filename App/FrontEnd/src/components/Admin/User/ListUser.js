import React, {Component} from 'react';
import {Grid, Row, Col, ListGroup} from 'react-bootstrap';
import _ from 'lodash';

import User from './User';

import UserModel from '../../../model/User';

import Locale from '../../../locale';

class ListUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // stays: [new StayModel({})]
      users: [new UserModel({})]
    }

    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  handleEditUser(userId) {
    this.props.changeElmToRender("editUser", userId);
  }

  handleDeleteUser(userId) {
    console.log("deletion: " + userId);

    let currentUsers = this.state.users;
    const newUsersTab = _.reject(currentUsers, {"id": userId});

    console.log(newUsersTab);

    this.setState({
      users: newUsersTab
    })
  }

  componentWillMount() {
    UserModel.getAll()
    .then(receivedUsers => {
      this.setState({
        users: _.filter(receivedUsers, {'role': 'User'})
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if(this.state.users.length > 0) {
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
                    this.state.users.map(user => {
                      return (
                        <User
                          key={user.id}
                          userToRender={user}
                          handleEdition={this.handleEditUser}
                          handleDeletion={this.handleDeleteUser}
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
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].user.noneToDisplay}</h1>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}

export default ListUsers;
