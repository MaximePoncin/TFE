import React, {Component} from 'react';
import {Grid, Row, Col, Button, FormGroup, FormControl} from 'react-bootstrap';

import Locale from '../../locale';

class AdminMenu extends Component {
  constructor(props){
    super(props);

    this.state = {

    }

    this.disconnect = this.disconnect.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }

  changeLang(e) {
    this.props.changeLang(e.target.value)
  }

  disconnect() {
    this.props.disconnect();
  }

  render() {
    return (
      <React.Fragment>
        <Grid className="UserMenu">
          <Row className="show-grid">
            <Col xs={3} className="text-left">
              <FormGroup>
                <FormControl
                  componentClass="select"
                  onChange={this.changeLang}
                  value={localStorage.getItem('LPC_beerTour_locale')}
                >
                  <option key="EN" value="EN">{Locale["lang"].english}</option>
                  <option key="FR" value="FR">{Locale["lang"].francais}</option>
                </FormControl>
              </FormGroup>
            </Col>
            <Col xs={9} className="text-right">
              <p>
                <small>{this.props.userInfo.givenName} {this.props.userInfo.surname}</small>
                <br />
                <small>{this.props.userInfo.userMail}</small>
              </p>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12}>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.props.disconnect}
              >
                {Locale[localStorage.getItem('LPC_beerTour_locale')].disconnect}
              </Button>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    )
  }
}

export default AdminMenu;
