import React, {Component} from 'react';
import {ListGroup, Panel, Grid, Row, Col} from 'react-bootstrap';

import DisplayedStay from './DisplayedStay';

import StayModel from '../../../model/Stay';

import Locale from '../../../locale';

class DisplayStays extends Component {
  constructor(props){
    super(props);

    this.state = {
      stays: []
    }
  }

  componentWillMount() {
    StayModel.getAll()
    .then(stays => {
      this.setState({
        stays: stays
      })
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
              <ListGroup>
                {
                  this.state.stays.map(stay => {
                    if(stay.available) {
                      return(
                        // <h1>Coucou</h1>
                        <DisplayedStay
                          key={stay.id}
                          stay={stay}
                          changeElmToRender={this.props.changeElmToRender}
                        />
                      )
                    }
                  })
                }
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return(
        <Grid>
          <Row className="show-grid">
            <Col xs={7}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.noneToDisplay}</h1>
            </Col>
          </Row>
        </Grid>
      )
    }
  }
}

export default DisplayStays;
