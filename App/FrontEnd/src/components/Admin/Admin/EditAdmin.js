import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';

import DatePicker from 'react-date-picker';
import moment from 'moment';
import validator from 'validator';

import UserModel from '../../../model/User';

import Locale from '../../../locale';

class EditAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: new UserModel({}),
      adminSurname: "",
      adminGivenName: "",
      adminBirthdate: moment(new Date()).subtract(18, 'y').toDate(),
      adminStreet: "",
      adminStreetNum: "",
      adminPostalCode: "",
      adminCity: "",
      adminCountry: "",
      adminMail: "",
      adminPhone: "",
      adminPassword: "",
      adminSurnameValidation: {
        status: null,
        text: ""
      },
      adminGivenNameValidation: {
        status: null,
        text: ""
      },
      adminStreetValidation: {
        status: null,
        text: ""
      },
      adminStreetNumValidation: {
        status: null,
        text: ""
      },
      adminPostalCodeValidation: {
        status: null,
        text: ""
      },
      adminCityValidation: {
        status: null,
        text: ""
      },
      adminCountryValidation: {
        status: null,
        text: ""
      },
      adminMailValidation: {
        status: null,
        text: ""
      },
      adminPhoneValidation: {
        status: null,
        text: ""
      },
      adminPasswordValidation: {
        status: null,
        text: ""
      },
      adminPasswordConfValidation: {
        status: null,
        text: ""
      }
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleChangeBirthDate = this.handleChangeBirthDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.goToAdmins = this.goToAdmins.bind(this);
  }

  componentWillMount() {
    UserModel.get(this.props.concernedAdminId)
    .then(receivedUser => {
      console.log(receivedUser);
      this.setState({
        admin: receivedUser,
        adminSurname: receivedUser.person.surname,
        adminGivenName: receivedUser.person.givenName,
        adminBirthdate: moment(receivedUser.person.birthDate).toDate(),
        adminStreet: receivedUser.address.street,
        adminStreetNum: receivedUser.address.num,
        adminPostalCode: receivedUser.address.postalCode,
        adminCity: receivedUser.address.city,
        adminCountry: receivedUser.address.country,
        adminMail: receivedUser.mail,
        adminPhone: receivedUser.phoneNumber,
        adminPassword: receivedUser.password
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  goToAdmins() {
    this.props.changeElmToRender("admins")
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
      adminBirthdate: date
    })
  }

  handleSubmit(e) {
    if(this.validateForm(e)) {
      const person = {
              surname: this.state.adminSurname,
              givenName: this.state.adminGivenName,
              birthDate: this.state.adminBirthdate
            },
            address = {
              street: this.state.adminStreet,
              num: this.state.adminStreetNum,
              postalCode: this.state.adminPostalCode,
              country: this.state.adminCountry,
              city: this.state.adminCity
            };

      const admin = {
        person: person,
        address: address,
        mail: this.state.adminMail,
        phoneNumber: this.state.adminPhone,
        password: this.state.adminPassword
      }

      console.log(JSON.stringify(admin));

      UserModel.update(this.props.concernedAdminId, JSON.stringify(admin))
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
      adminSurnameValidation: {},
      adminGivenNameValidation: {},
      adminStreetValidation: {},
      adminStreetNumValidation: {},
      adminPostalCodeValidation: {},
      adminCountryValidation: {},
      adminCityValidation: {},
      adminMailValidation: {},
      adminPhoneValidation: {},
      adminPasswordConfValidation: {}
    })

    let isValid = true;

    if(!validator.isAlpha(this.state.adminSurname.replace(/ /, ''))) {
      this.setState({
        adminSurnameValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })
      isValid = false;
    }

    if(!validator.isAlpha(this.state.adminGivenName.replace(/ /, ''))){
      this.setState({
        adminGivenNameValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })
      isValid = false;
    }

    if(!validator.isAlpha(this.state.adminStreet.replace(/ /, ''))){
      this.setState({
        adminStreetValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })
      isValid = false;
    }

    if(!validator.isAlphanumeric(this.state.adminrStreetNum.replace(/ /, ''))){
      this.setState({
        adminStreetNumValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlphaNum
        }
      })
      isValid = false;
    }

    if(!validator.isNumeric(this.state.adminPostalCode.replace(/ /, ''))){
      this.setState({
        adminPostalCodeValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeNum
        }
      })
      isValid = false;
    }

    if(!validator.isAlpha(this.state.adminCountry.replace(/ /, ''))){
      this.setState({
        adminCountrValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })
      isValid = false;
    }

    if(!validator.isAlpha(this.state.adminCity.replace(/ /, ''))){
      this.setState({
        adminCityValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })
      isValid = false;
    }

    if(!validator.isEmail(this.state.adminMail)){
      this.setState({
        adminMailValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeValidMail
        }
      })
      isValid = false;
    }

    if(!validator.isNumeric(this.state.adminPhone.replace(/ /, ''))){
      this.setState({
        adminPhoneValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeNum
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
            <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.edit}</h1>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit} className="sm">
          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.personnalInfo}</legend>
            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  bsSize="sm"
                  validationState={this.state.adminSurnameValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.surname}</ControlLabel>
                  <FormControl
                    name="adminSurname"
                    type="text"
                    value={this.state.adminSurname}
                    placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].admin.surnamePlaceholder}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.adminSurnameValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  bsSize="sm"
                  validationState={this.state.adminGivenNameValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.givenName}</ControlLabel>
                  <FormControl
                    name="adminGivenName"
                    type="text"
                    value={this.state.adminGivenName}
                    placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].admin.givenNamePlaceholder}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.adminGivenNameValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  bsSize="sm"
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.birthDate}</ControlLabel>
                  <br />
                  <DatePicker
                    value={this.state.adminBirthdate}
                    onChange={this.handleChangeBirthDate}
                    name="adminBirthdate"
                    maxDate={moment(new Date()).subtract(18, 'y').toDate()}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <fieldset>
              <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.accountInfo}</legend>
              <Row className="show-grid">
                  <Col xs={10}>
                    <FormGroup
                      bsSize="sm"
                      validationState={this.state.adminMailValidation.status}
                    >
                      <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.mail}</ControlLabel>
                      <FormControl
                        name="adminMail"
                        type="email"
                        value={this.state.adminMail}
                        placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].admin.mailPlaceholder}
                        onChange={this.handleUserInput}
                        required
                        disabled
                      />
                      <HelpBlock>
                        {this.state.adminMailValidation.text}
                      </HelpBlock>
                    </FormGroup>
                  </Col>
              </Row>

              <Row className="show-grid">
                  <Col xs={10}>
                    <FormGroup
                      bsSize="sm"
                      validationState={this.state.adminPhoneValidation.status}
                    >
                      <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.phone}</ControlLabel>
                      <FormControl
                        name="adminPhone"
                        type="text"
                        value={this.state.adminPhone}
                        placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].admin.phonePlaceholder}
                        onChange={this.handleUserInput}
                        required
                      />
                      <HelpBlock>
                        {this.state.adminPhoneValidation.text}
                      </HelpBlock>
                    </FormGroup>
                  </Col>
              </Row>
            </fieldset>
          </fieldset>
          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.address}</legend>
            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.adminStreetValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.street}</ControlLabel>
                    <FormControl
                      name="adminStreet"
                      type="text"
                      value={this.state.adminStreet}
                      placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].admin.streetPlaceholder}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.adminStreetValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.adminStreetNumValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.streetNum}</ControlLabel>
                    <FormControl
                      name="adminStreetNum"
                      type="text"
                      value={this.state.adminStreetNum}
                      placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].admin.streetNumPlaceholder}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.adminStreetNumValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.adminPostalCodeValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.postalCode}</ControlLabel>
                    <FormControl
                      name="adminPostalCode"
                      type="text"
                      value={this.state.adminPostalCode}
                      placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].admin.postalCodePlaceholder}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.adminPostalCodeValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.adminCityValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.city}</ControlLabel>
                    <FormControl
                      name="adminCity"
                      type="text"
                      value={this.state.adminCity}
                      placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].admin.cityPlaceholder}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.adminCityValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.adminCountryValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].admin.country}</ControlLabel>
                    <FormControl
                      name="adminCountry"
                      type="text"
                      value={this.state.adminCountry}
                      placeholder={Locale[localStorage.getItem('LPC_beerTour_locale')].admin.countryPlaceholder}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.adminCountryValidation.text}
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
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].edit}
                  </Button>
                </Col>
                <Col xs={1}>
                  <Button
                    type="button"
                    bsStyle="primary"
                    onClick={this.goToAdmins}
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

export default EditAdmin;
