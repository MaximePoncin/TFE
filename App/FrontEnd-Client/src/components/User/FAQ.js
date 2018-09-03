import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import Locale from '../../locale';

class FAQ extends Component {
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
            <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].faq.title}</h1>
          </Col>
        </Row>
        {
          Locale[localStorage.getItem('LPC_beerTour_locale')].faq.questAnsw.map(questAnsw => {
            return(
              <Row className="show-grid">
                <Col xs={12}>
                  <h1>{questAnsw.question}</h1>
                  <p>{questAnsw.answer}</p>
                </Col>
              </Row>
            )
          })
        }
      </Grid>
    )
  }
}

export default FAQ;
