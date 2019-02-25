import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import BookedStay from './BookedStay';

import BookedStayModel from '../../../model/Booking';
// import StayModel from '../../../model/Stay';

import Locale from '../../../locale';

class ListBookedStays extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookedStaysArray: new Array(new BookedStayModel({}))
    }

    this.handleEditBookedStay = this.handleEditBookedStay.bind(this);
    this.handleDeleteBookedStay = this.handleDeleteBookedStay.bind(this);
  }

  handleEditBookedStay(bookedStayId) {
    this.props.changeElmToRender("editBookedStay", bookedStayId);
  }

  handleDeleteBookedStay(bookedStayId) {
    console.log("deletion");
  }

  componentWillMount() {
    BookedStayModel.getAll()
    .then(receivedBookedStay => {
      this.setState({
        bookedStaysArray: receivedBookedStay
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if(this.state.bookedStaysArray.length > 0) {
      return(
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].booking.bookedStays}</h1>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12}>
              <ul>
                {
                  this.state.bookedStaysArray.map(bookedStay => {
                    return(
                      <BookedStay
                        key={bookedStay.id}
                        bookedStayToRender={bookedStay}
                        handleEdition={this.handleEditBookedStay}
                        handleDeletion={this.handleDeleteBookedStay}
                        changeElmToRender={this.props.changeElmToRender}
                      />
                    )
                  })
                }
              </ul>
            </Col>
          </Row>
        </Grid>
      )
    } else {
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              {Locale[localStorage.getItem('LPC_beerTour_locale')].booking.noneToDisplay}
            </Col>
          </Row>
        </Grid>
      )
    }
  }
}

export default ListBookedStays;
