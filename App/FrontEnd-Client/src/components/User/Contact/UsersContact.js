import React, {Component} from 'react';
import {Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, FieldGroup, HelpBlock} from 'react-bootstrap';
import validator from 'validator';

import Locale from '../../../locale';

class UsersContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      text: "",
      emailValidation: {},
      textValidation: {}
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToStays = this.goToStays.bind(this);
  }

  goToStays(){
    this.props.changeElmToRender("stays")
  }

  handleUserInput(e) {
    const name = e.target.name,
          value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  validateForm(e) {
    this.setState({
      emailValidation: {},
      textValidation: {}
    })

    let isValid = true;

    if(!validator.isEmail(this.state.email)) {
      this.setState({
        emailValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeValidMail
        }
      })

      isValid = false;
    }

    if(!this.state.email) {
      this.setState({
        textValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlphaNum
        }
      })

      isValid = false;
    }

    e.preventDefault();
    return isValid;
  }

  handleSubmit(e) {
    if(this.validateForm(e)) {
      const payload = {
        to: require('../../../../config/app.mailer.config').auth.user,
        subject: Locale[localStorage.getItem('LPC_beerTour_locale')].mail.usersContact.subject + "/ " + this.state.email,
        text: this.state.text
      }

      console.log(JSON.stringify(payload));

      fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("LPC_beerTour_token")
        },
        body: JSON.stringify(payload)
      })
      .then(res => {
        console.log("email sent");
        this.goToStays();
      })
      .catch(err => {
        console.log(err);
      })
    }

    e.preventDefault();
  }

  render() {
    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].usersContact.usersContact}</h1>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit} className="sm">
          <Row className="show-grid">
            <Col xs={6}>
              <FormGroup
                bsStyle="sm"
                validationState={this.state.emailValidation.status}
              >
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].usersContact.userEmail}</ControlLabel>
                <FormControl
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleUserInput}
                  required
                />
                <HelpBlock>
                  {this.state.emailValidation.text}
                </HelpBlock>
              </FormGroup>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6}>
              <FormGroup
                bsStyle="sm"
                validationState={this.state.textValidation.status}
              >
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].usersContact.userText}</ControlLabel>
                <FormControl
                  name="text"
                  componentClass="textArea"
                  value={this.state.text}
                  onChange={this.handleUserInput}
                  required
                />
                <HelpBlock>
                  {this.state.textValidation.text}
                </HelpBlock>
              </FormGroup>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={3}>
              <Button
                bsStyle="primary"
                type="submit"
              >
                {Locale[localStorage.getItem('LPC_beerTour_locale')].send}
              </Button>
            </Col>
          </Row>
        </form>
      </Grid>
    )
  }
}

export default UsersContact;
