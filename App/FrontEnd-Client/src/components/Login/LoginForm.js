import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button, Alert, Grid, Row, Col} from 'react-bootstrap';
import AuthModel from '../../model/auth';

import Locale from '../../locale';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      password: ''
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToRegistration = this.goToRegistration.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }

  changeLang(e) {
    this.props.changeLang(e.target.value)
  }

  handleUserInput(e) {
    const name = e.target.name,
          value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    AuthModel.authenticate(this.state.userId, this.state.password)
    .then((auth) => {
      console.log(auth);
      this.props.connect(auth);
    })
    .catch(err => {
      console.log(err);
    })

    e.preventDefault();
  }

  goToRegistration() {
    this.props.changeElmToRender("registration");
  }

  render() {
    return (
      <Grid>
        <form onSubmit={this.handleSubmit} className="sm" noValidate>
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
            <Col xs={3} xsOffset={6} className="text-right">
              <FormGroup
                bsSize="sm"
              >
                <ControlLabel><small>{Locale[localStorage.getItem('LPC_beerTour_locale')].connection.userID}</small></ControlLabel>
                <FormControl
                  name="userId"
                  type="text"
                  value={this.state.userId}
                  placeholder="Your mail address"
                  onChange={this.handleUserInput}
                />
                <ControlLabel><small>{Locale[localStorage.getItem('LPC_beerTour_locale')].connection.password}</small></ControlLabel>
                <FormControl
                  name="password"
                  type="password"
                  value={this.state.password}
                  placeholder="Your password"
                  onChange={this.handleUserInput}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className="show-grid">
            <FormGroup
                bsSize="sm"
              >
                <Col xs={3} xsOffset={6} className="text-right">
                  <Button
                    type="submit"
                    // onClick={this.sendForm}
                    bsStyle="primary"
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].connection.connect}
                  </Button>
                </Col>
                <Col xs={3} className="text-right">
                  <Button
                    type="button"
                    onClick={this.goToRegistration}
                    bsStyle="primary"
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].connection.register}
                  </Button>
                </Col>
              </FormGroup>
            </Row>
        </form>
      </Grid>
    )
  }
}

export default LoginForm;
