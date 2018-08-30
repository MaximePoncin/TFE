import React, {Component} from 'react';
import {Panel, Button, Grid, Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';

import BookedStayModel from '../../../model/Booking';
import StayModel from '../../../model/Stay';
import BoardTypeModel from '../../../model/BoardType';
import StandingModel from '../../../model/Standing';

import Locale from '../../../locale';

class BookedStay extends Component {
  constructor(props){
    super(props);

    this.state = {
      stay: new StayModel({}),
      boardType: new BoardTypeModel({}),
      standing: new StandingModel({})
    }

    this.handleEdition = this.handleEdition.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  handleEdition() {
    this.props.handleEdition(this.props.bookedStayToRender.id);
  }

  handleDeletion() {
    this.props.handleDeleteBookedStay(this.props.bookedStayToRender.id);
  }

  componentWillMount() {
    if(this.props.bookedStayToRender.stayId) {
      StayModel.get(this.props.bookedStayToRender.stayId)
      .then(receivedStay => {
        this.setState({
          stay: receivedStay
        })
      })
      .catch(err => {
        console.log(err);
      })
    }

    if(this.props.bookedStayToRender.boardType) {
      BoardTypeModel.get(this.props.bookedStayToRender.boardType)
      .then(receivedBoardType => {
        this.setState({
          boardType: receivedBoardType
        })
      })
      .catch(err => {
        console.log(err);
      })
    }

    if(this.props.bookedStayToRender.standing) {
      StandingModel.get(this.props.bookedStayToRender.standing)
      .then(receivedStanding => {
        this.setState({
          standing: receivedStanding
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    return(
      <li className="list-group-item">
        <Panel
          bsStyle="info"
        >
          <Panel.Heading>
            <p>
              <b>
                {
                  Locale[localStorage.getItem('LPC_beerTour_locale')].booking.account + ": " + this.props.bookedStayToRender.userMail
                }
                <br />
                {
                  Locale[localStorage.getItem('LPC_beerTour_locale')].booking.stay + ": " + this.state.stay.getName(localStorage.getItem("LPC_BeerTour_locale"))
                }
              </b>
            </p>
            <p>
              <span>
                {
                  Locale[localStorage.getItem('LPC_beerTour_locale')].booking.bookedOn + moment(this.props.bookedStayToRender.bookingDate).format('DD / MM / YYYY')
                }
              </span>
            </p>
          </Panel.Heading>
          <Panel.Body>
            {
              Locale[localStorage.getItem('LPC_beerTour_locale')].booking.nbPersons + ": " + this.props.bookedStayToRender.nbPersons
            }
            <br />
            {
              Locale[localStorage.getItem('LPC_beerTour_locale')].booking.standingType + ": " + this.state.standing.getName(localStorage.getItem('LPC_BeerTour_locale'))
            }
            <br />
            {
              Locale[localStorage.getItem('LPC_beerTour_locale')].booking.boardType + ": " + this.state.boardType.getName(localStorage.getItem('LPC_BeerTour_locale'))
            }
          </Panel.Body>
          <Panel.Footer>
            <Grid>
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

export default BookedStay;
