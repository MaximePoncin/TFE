import React, {Component} from 'react';
import {Panel, Button, Grid, Row, Col} from 'react-bootstrap';
import _ from 'lodash';

import AdvClientModel from '../../../model/AdvertisingClient';
import BeerTypeModel from '../../../model/BeerType';

import Locale from '../../../locale';

class AdvClient extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.handleEdition = this.handleEdition.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  handleEdition() {
    this.props.handleEdition(this.props.advClientToRender.id)
  }

  handleDeletion() {
    console.log("deletion");
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

export default AdvClient;
