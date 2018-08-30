import React, {Component} from 'react';
import {Panel, Button, Grid, Row, Col} from 'react-bootstrap';

import AdvClientModel from '../../../model/AdvertisingClient';

import Locale from '../../../locale';

class AdvClient extends Component {
  constructor(props){
    super(props);

    this.state = {

    }

    this.handleDisplay = this.handleDisplay.bind(this);
  }

  handleDisplay() {
    this.props.changeElmToRender('advClient', this.props.advClientToRender.id)
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
                {this.props.advClientToRender.name}
              </b>
            </p>
          </Panel.Heading>
          <Panel.Body>
            <p>
              <span>
                <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.address}</b>
                <br />
                {this.props.advClientToRender.address.num}, {this.props.advClientToRender.address.street} {this.props.advClientToRender.address.postalCode}
                <br />
                {this.props.advClientToRender.address.city}, {this.props.advClientToRender.address.country}
              </span>
            </p>
          </Panel.Body>
          <Panel.Footer>
            <Grid fluid>
              <Row className="show-grid">
                <Col xs={12} className="text-center">
                  <Button
                    bsStyle="primary"
                    onClick={this.handleDisplay}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].see}
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

export default AdvClient;
