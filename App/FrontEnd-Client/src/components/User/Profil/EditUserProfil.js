import React, {Component} from 'react';
import {Grid, Row , Col, Button, ControlLabel, FormGroup, FormControl, HelpBlock} from 'react-bootstrap';
import validator from 'validator';

import UserModel from '../../../model/User';

import Locale from '../../../locale';

class EditUserProfil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: "",
      adrNum: "",
      adrStreet: "",
      adrPostalCode: "",
      adrCity: "",
      adrCountry: "",
      phoneValidation: {
        text: "",
        status: null
      },
      adrNumValidation: {
        text: "",
        status: null
      },
      adrStreetValidation: {
        text: "",
        status: null
      },
      adrPostalCodeValidation: {
        text: "",
        status: null
      },
      adrCityValidation: {
        text: "",
        status: null
      },
      adrCountryValidation: {
        text: "",
        status: null
      },
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.goBackToProfil = this.goBackToProfil.bind(this);
  }

  goBackToProfil() {
    this.props.changeElmToRender('userProfil', this.props.userId);
  }

  validateForm(e) {
    this.setState({
      phoneValidation: {
        text: "",
        status: null
      },
      adrNumValidation: {
        text: "",
        status: null
      },
      adrStreetValidation: {
        text: "",
        status: null
      },
      adrPostalCodeValidation: {
        text: "",
        status: null
      },
      adrCityValidation: {
        text: "",
        status: null
      },
      adrCountryValidation: {
        text: "",
        status: null
      }
    });

    let isValid = true;

    if(!validator.isNumeric(this.state.phone)) {
      this.setState({
        phoneValidation: {
          status: 'error',
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeNum
        }
      })

      isValid = false;
    }

    if(!validator.isAlphanumeric(this.state.adrNum.replace(" ", ""))) {
      this.setState({
        adrNumValidation: {
          status: 'error',
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlphaNum
        }
      })

      isValid = false;
    }

    if(!validator.isAlpha(this.state.adrStreet.replace(" ", ""))) {
      this.setState({
        adrStreetValidation: {
          status: 'error',
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })

      isValid = false;
    }

    if(!validator.isNumeric(this.state.adrPostalCode)) {
      this.setState({
        adrPostalCodeValidation: {
          status: 'error',
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeNum
        }
      })

      isValid = false;
    }

    if(!validator.isAlpha(this.state.adrCity)) {
      this.setState({
        adrCityValidation: {
          status: 'error',
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })

      isValid = false;
    }

    if(!validator.isAlpha(this.state.adrCountry)) {
      this.setState({
        adrCountryValidation: {
          status: 'error',
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })

      isValid = false;
    }

    e.preventDefault();

    return isValid;
  }

  handleSubmit(e) {
    if(this.validateForm(e)) {
      let update= {
        person: this.state.currUser.person,
        phoneNumber: this.state.phone,
        mail: this.props.userId,
        password: this.state.currUser.password,
        address: {
          city: this.state.adrCity,
          country: this.state.adrCountry,
          postalCode: this.state.adrPostalCode,
          street: this.state.adrStreet,
          num: this.state.adrNum
        },
        user: this.state.currUser.user,
        admin: this.state.currUser.admin,
        superAdmin: this.state.currUser.superAdmin
      };

      console.log(JSON.stringify(update));

      UserModel.update(this.state.currUser.id, JSON.stringify(update))
      .then(updatedUser => {
        console.log(updatedUser);
        this.goBackToProfil();
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      console.log("not ok");
    }
    e.preventDefault();
  }

  handleUserInput(e) {
    const name = e.target.name,
          value = e.target.value;

    this.setState({
      [name]: value
    })
  }

componentWillMount() {
  UserModel.getByMail(this.props.userId)
  .then( user => {
    this.setState({
      currUser: user,
      phone: user.phoneNumber,
      adrNum: user.address.num,
      adrCity: user.address.city,
      adrStreet: user.address.street,
      adrPostalCode: user.address.postalCode,
      adrCountry: user.address.country
    })
  })
  .catch(err => {
    console.log(err);
  })
}

  render() {
    return (
      <Grid>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.personnalInfo}</legend>
            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  validationState={this.state.phoneValidation.status}
                  bsSize="sm"
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.phoneNum}</ControlLabel>
                  <FormControl
                    name="phone"
                    value={this.state.phone}
                    type="text"
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.phoneValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
          </fieldset>

          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.address}</legend>
            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  validationState={this.state.adrNumValidation.status}
                  bsSize="sm"
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.addressInfo.num}</ControlLabel>
                  <FormControl
                    name="adrNum"
                    value={this.state.adrNum}
                    type="text"
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.adrNumValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  validationState={this.state.adrStreetValidation.status}
                  bsSize="sm"
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.addressInfo.street}</ControlLabel>
                  <FormControl
                    name="adrStreet"
                    value={this.state.adrStreet}
                    type="text"
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.adrStreetValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  validationState={this.state.adrPostalCodeValidation.status}
                  bsSize="sm"
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.addressInfo.postalCode}</ControlLabel>
                  <FormControl
                    name="adrPostalCode"
                    value={this.state.adrPostalCode}
                    type="text"
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.adrPostalCodeValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  validationState={this.state.adrCityValidation.status}
                  bsSize="sm"
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.addressInfo.city}</ControlLabel>
                  <FormControl
                    name="adrCity"
                    value={this.state.adrCity}
                    type="text"
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.adrCityValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  validationState={this.state.adrCountryValidation.status}
                  bsSize="sm"
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].userProfil.addressInfo.country}</ControlLabel>
                  <FormControl
                    name="adrCountry"
                    value={this.state.adrCountry}
                    type="text"
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.adrCountryValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
          </fieldset>
          <Row className="show-grid">
            <Col xs={3}>
              <Button
                bsStyle="primary"
                type="submit"
              >
                {Locale[localStorage.getItem('LPC_beerTour_locale')].sendChanges}
              </Button>
            </Col>

            <Col xs={3}>
              <Button
                bsStyle="primary"
                type="button"
                onClick={this.goBackToProfil}
              >
                {Locale[localStorage.getItem('LPC_beerTour_locale')].back}
              </Button>
            </Col>
          </Row>
        </form>
      </Grid>
    )
  }
}

export default EditUserProfil;
