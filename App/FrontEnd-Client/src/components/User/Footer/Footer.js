import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import Locale from '../../../locale';

class Footer extends Component {
  constructor(props){
    super(props);

    this.state = {

    }

    this.goToGVC = this.goToGVC.bind(this);
    this.goToUsersContact = this.goToUsersContact.bind(this);
    this.goToPartnersContact = this.goToPartnersContact.bind(this);
    this.goToFAQ = this.goToFAQ.bind(this);
  }

  goToGVC() {
    this.props.changeElmToRender("GVC");
  }

  goToUsersContact() {
    this.props.changeElmToRender("usersContact");
  }

  goToPartnersContact() {
    this.props.changeElmToRender("partnersContact");
  }

  goToFAQ() {
    this.props.changeElmToRender("FAQ");
  }

  render() {
    return (
      <Grid className="footer">
        <Row className="show-grid">
          <Col xs={2}>
            <a onClick={this.goToGVC}>{Locale[localStorage.getItem('LPC_beerTour_locale')].footer.GVC}</a>
          </Col>
          <Col xs={2}>
            <a onClick={this.goToUsersContact}>{Locale[localStorage.getItem('LPC_beerTour_locale')].footer.usersContact}</a>
          </Col>
          <Col xs={2}>
            <a onClick={this.goToPartnersContact}>{Locale[localStorage.getItem('LPC_beerTour_locale')].footer.partnersContact}</a>
          </Col>
          <Col xs={2}>
            <a onClick={this.goToFAQ}>{Locale[localStorage.getItem('LPC_beerTour_locale')].footer.faq}</a>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Footer;
