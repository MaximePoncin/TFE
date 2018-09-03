import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";

import Locale from '../../locale';

class GVC extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            {Locale[localStorage.getItem('LPC_beerTour_locale')].gvc.title}
          </Col>
        </Row>
        {
          Locale[localStorage.getItem('LPC_beerTour_locale')].gvc.content.map(elm => {
            return(
              <Row className="show-grid">
                <Col xs={12}>
                  <h1>{elm.name}</h1>
                  <p>{elm.text}</p>
                </Col>
              </Row>
            )
          })
        }
      </Grid>
    )
  }
}

export default GVC;
