import React, {Component} from 'react';
import {Grid, Row, Col, ListGroup} from 'react-bootstrap';
import _ from 'lodash';

import Stay from './Stay';

import StayModel from '../../../model/Stay';

import Locale from '../../../locale';

class ListStays extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // stays: [new StayModel({})]
      stays: []
    }

    this.handleEditStay = this.handleEditStay.bind(this);
    this.handleBookStay = this.handleBookStay.bind(this);
    this.handleDeleteStay = this.handleDeleteStay.bind(this);
  }

  handleEditStay(stayId) {
    this.props.changeElmToRender("editStay", stayId);
  }

  handleBookStay(stayId) {
    this.props.changeElmToRender("createBookedStay", stayId);
  }

  handleDeleteStay(stayId) {
    let currentStays = this.state.stays;
    const newStaysTab = _.reject(currentStays, {"id": stayId});

    console.log(newStaysTab);

    this.setState({
      stays: newStaysTab
    })
  }

  componentWillMount() {
    StayModel.getAll()
    .then(receivedStays => {
      this.setState({
        stays: receivedStays
      })
      // console.log(receivedStays);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if(this.state.stays.length > 0) {
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.staysList}</h1>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12}>
              <ul>
                <ListGroup>
                  {
                    this.state.stays.map(stay => {
                      return (
                        <Stay
                          key={stay.id}
                          stayToRender={stay}
                          handleEdition={this.handleEditStay}
                          handleBookStay={this.handleBookStay}
                          handleDeletion={this.handleDeleteStay}
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
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.noneToDisplay}</h1>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}

export default ListStays;
