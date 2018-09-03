import React, {Component} from 'react';
import {Panel, Button, Grid, Row, Col} from 'react-bootstrap';

import SalePointModel from '../../../model/SalePoint';

import Locale from '../../../locale';

class SalePoint extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.handleDisplay = this.handleDisplay.bind(this);
  }

  handleDisplay() {
    this.props.changeElmToRender('salePoint', this.props.salePointToRender.id)
  }

  render() {
    return(
      <li className="list-group-item">
        <Panel bsStyle="info">
          <Panel.Heading>
            <p>
              <b>
                {this.props.salePointToRender.name}
              </b>
            </p>
          </Panel.Heading>
          <Panel.Body>
            <p>
              <span>
                <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.address}</b>
                <br />
                {this.props.salePointToRender.address.num}, {this.props.salePointToRender.address.street} {this.props.salePointToRender.address.postalCode}
                <br />
                {this.props.salePointToRender.address.city}, {this.props.salePointToRender.address.country}
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
export default SalePoint;
