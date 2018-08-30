import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';

import DatePicker from 'react-date-picker';
import moment from 'moment';
import validator from 'validator';

import UserModel from '../../../model/User';

import Locale from '../../../locale';

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userSurname: "",
      userGivenName: "",
      userBirthdate: moment(new Date()).subtract(18, 'y').toDate(),
      userStreet: "",
      userStreetNum: "",
      userPostalCode: "",
      userCity: "",
      userCountry: "",
      userMail: "",
      userPhone: "",
      userPassword: "",
      userPasswordConf: "",
      userSurnameValidation: {
        status: null,
        text: ""
      },
      userGivenNameValidation: {
        status: null,
        text: ""
      },
      userStreetValidation: {
        status: null,
        text: ""
      },
      userStreetNumValidation: {
        status: null,
        text: ""
      },
      userPostalCodeValidation: {
        status: null,
        text: ""
      },
      userCityValidation: {
        status: null,
        text: ""
      },
      userCountryValidation: {
        status: null,
        text: ""
      },
      userMailValidation: {
        status: null,
        text: ""
      },
      userPhoneValidation: {
        status: null,
        text: ""
      },
      userPasswordValidation: {
        status: null,
        text: ""
      },
      userPasswordConfValidation: {
        status: null,
        text: ""
      }
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleChangeBirthDate = this.handleChangeBirthDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.goToUsers = this.goToUsers.bind(this);
  }

  goToUsers() {
    this.props.changeElmToRender("users")
  }

  handleUserInput(e) {
    const name = e.target.name,
          value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  handleChangeBirthDate(date) {
    this.setState({
      userBirthdate: date
    })
  }

  handleSubmit(e) {
    if(this.validateForm(e)) {
      const person = {
              surname: this.state.userSurname,
              givenName: this.state.userGivenName,
              birthDate: this.state.userBirthdate
            },
            address = {
              street: this.state.userStreet,
              num: this.state.userStreetNum,
              postalCode: this.state.userPostalCode,
              country: this.state.userCountry,
              city: this.state.userCity
            };

      const user = {
        person: person,
        address: address,
        mail: this.state.userMail,
        phoneNumber: this.state.userPhone,
        password: this.state.userPassword
      }

      console.log(JSON.stringify(user));

      UserModel.create(JSON.stringify(user))
      .then(receivedUser => {
        console.log(receivedUser);
        console.log("success");
        this.goToUsers();
      })
      .catch(err => {
        console.log("failure");
      })

      e.preventDefault();
    }

    e.preventDefault();
  }

  validateForm(e) {
    this.setState({
      userSurnameValidation: {},
      userGivenNameValidation: {},
      userStreetValidation: {},
      userStreetNumValidation: {},
      userPostalCodeValidation: {},
      userCountryValidation: {},
      userCityValidation: {},
      userMailValidation: {},
      userPhoneValidation: {},
      userPasswordConfValidation: {}
    })

    let isValid = true;

    if(!validator.isAlpha(this.state.userSurname.replace(/ /, ''))) {
      this.setState({
        userSurnameValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })
      isValid = false;
    }

    if(!validator.isAlpha(this.state.userGivenName.replace(/ /, ''))){
      this.setState({
        userGivenNameValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })
      isValid = false;
    }

    if(!validator.isAlpha(this.state.userStreet.replace(/ /, ''))){
      this.setState({
        userStreetValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })
      isValid = false;
    }

    if(!validator.isAlphanumeric(this.state.userStreetNum.replace(/ /, ''))){
      this.setState({
        userStreetNumValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlphaNum
        }
      })
      isValid = false;
    }

    if(!validator.isNumeric(this.state.userPostalCode.replace(/ /, ''))){
      this.setState({
        userPostalCodeValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeNum
        }
      })
      isValid = false;
    }

    if(!validator.isAlpha(this.state.userCountry.replace(/ /, ''))){
      this.setState({
        userCountrValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })
      isValid = false;
    }

    if(!validator.isAlpha(this.state.userCity.replace(/ /, ''))){
      this.setState({
        userCityValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })
      isValid = false;
    }

    if(!validator.isEmail(this.state.userMail)){
      this.setState({
        userMailValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeValidMail
        }
      })
      isValid = false;
    }

    if(!validator.isNumeric(this.state.userPhone.replace(/ /, ''))){
      this.setState({
        userPhoneValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeNum
        }
      })
      isValid = false;
    }

    if(!validator.isAlphanumeric(this.state.userPassword)){
      this.setState({
        userPasswordValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlphaNum
        }
      })
      isValid = false;
    }

    if(this.state.userPassword !== this.state.userPasswordConf){
      this.setState({
        userPasswordConfValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustMatchPassword
        }
      })
      isValid = false;
    }

    e.preventDefault();

    return isValid;
  }

  render() {
    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.title}</h1>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit} className="sm">
          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.personnalInfo}</legend>
            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  bsSize="sm"
                  validationState={this.state.userSurnameValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.surname}</ControlLabel>
                  <FormControl
                    name="userSurname"
                    type="text"
                    value={this.state.userSurname}
                    placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].register.surnamePlaceholder}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.userSurnameValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  bsSize="sm"
                  validationState={this.state.userGivenNameValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.givenName}</ControlLabel>
                  <FormControl
                    name="userGivenName"
                    type="text"
                    value={this.state.userGivenName}
                    placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].register.givenNamePlaceholder}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.userGivenNameValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  bsSize="sm"
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.birthDate}</ControlLabel>
                  <br />
                  <DatePicker
                    value={this.state.userBirthdate}
                    onChange={this.handleChangeBirthDate}
                    name="userBirthdate"
                    maxDate={moment(new Date()).subtract(18, 'y').toDate()}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <fieldset>
              <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.accountInfo}</legend>
              <Row className="show-grid">
                  <Col xs={10}>
                    <FormGroup
                      bsSize="sm"
                      validationState={this.state.userMailValidation.status}
                    >
                      <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.mail}</ControlLabel>
                      <FormControl
                        name="userMail"
                        type="email"
                        value={this.state.userMail}
                        placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].register.mailPlaceholder}
                        onChange={this.handleUserInput}
                        required
                      />
                      <HelpBlock>
                        {this.state.userMailValidation.text}
                      </HelpBlock>
                    </FormGroup>
                  </Col>
              </Row>

              <Row className="show-grid">
                  <Col xs={10}>
                    <FormGroup
                      bsSize="sm"
                      validationState={this.state.userPhoneValidation.status}
                    >
                      <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.phone}</ControlLabel>
                      <FormControl
                        name="userPhone"
                        type="text"
                        value={this.state.userPhone}
                        placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].register.phonePlaceholder}
                        onChange={this.handleUserInput}
                        required
                      />
                      <HelpBlock>
                        {this.state.userPhoneValidation.text}
                      </HelpBlock>
                    </FormGroup>
                  </Col>
              </Row>

              <Row className="show-grid">
                  <Col xs={10}>
                    <FormGroup
                      bsSize="sm"
                      validationState={this.state.userPasswordValidation.status}
                    >
                      <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.password}</ControlLabel>
                      <FormControl
                        name="userPassword"
                        type="password"
                        value={this.state.userPassword}
                        placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].register.passwordPlaceholder}
                        onChange={this.handleUserInput}
                        required
                      />
                      <HelpBlock>
                        {this.state.userPasswordValidation.text}
                      </HelpBlock>
                    </FormGroup>
                  </Col>
              </Row>

              <Row className="show-grid">
                  <Col xs={10}>
                    <FormGroup
                      bsSize="sm"
                      validationState={this.state.userPasswordConfValidation.status}
                    >
                      <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.passwordConf}</ControlLabel>
                      <FormControl
                        name="userPasswordConf"
                        type="password"
                        value={this.state.userPasswordConf}
                        placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].register.passwordConfPlaceholder}
                        onChange={this.handleUserInput}
                        required
                      />
                      <HelpBlock>
                        {this.state.userPasswordConfValidation.text}
                      </HelpBlock>
                    </FormGroup>
                  </Col>
              </Row>
            </fieldset>
          </fieldset>
          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.address}</legend>
            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.userStreetValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.street}</ControlLabel>
                    <FormControl
                      name="userStreet"
                      type="text"
                      value={this.state.userStreet}
                      placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].register.streetPlaceholder}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.userStreetValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.userStreetNumValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.streetNum}</ControlLabel>
                    <FormControl
                      name="userStreetNum"
                      type="text"
                      value={this.state.userStreetNum}
                      placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].register.streetNumPlaceholder}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.userStreetNumValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.userPostalCodeValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.postalCode}</ControlLabel>
                    <FormControl
                      name="userPostalCode"
                      type="text"
                      value={this.state.userPostalCode}
                      placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].register.postalCodePlaceholder}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.userPostalCodeValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.userCityValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.city}</ControlLabel>
                    <FormControl
                      name="userCity"
                      type="text"
                      value={this.state.userCity}
                      placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].register.cityPlaceholder}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.userCityValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.userCountryValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.country}</ControlLabel>
                    <FormControl
                      name="userCountry"
                      type="text"
                      value={this.state.userCountry}
                      placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].register.countryPlaceholder}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.userCountryValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>
          </fieldset>

          <Row className="show-grid">
            <FormGroup
                bsSize="sm"
              >
                <Col xs={1}>
                  <Button
                    type="submit"
                    bsStyle="primary"
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].create}
                  </Button>
                </Col>
                <Col xs={1}>
                  <Button
                    type="button"
                    bsStyle="primary"
                    onClick={this.goToUsers}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].cancel}
                  </Button>
                </Col>
              </FormGroup>
            </Row>
        </form>
      </Grid>
    )
  }
}

export default CreateUser;
