import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';

import validator from 'validator';

import AdvClientModel from '../../../model/AdvertisingClient';
import BeerTypeModel from '../../../model/BeerType';

import Locale from '../../../locale';

class CreateAdvClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advClientName: "",
      advClientURL: "",
      advClientMail: "",
      advClientBeerTypes: [],
      advClientImgLink: "",
      advClientStreet: "",
      advClientStreetNum: "",
      advClientPostalCode: "",
      advClientCity : "",
      advClientCountry: "",
      availableBeerTypes: [new BeerTypeModel({})],
      advClientNameValidation: {
        status: null,
        text: ""
      },
      advClientURLValidation: {
        status: null,
        text: ""
      },
      advClientMailValidation: {
        status: null,
        text: ""
      },
      advClientStreetValidation: {
        status: null,
        text: ""
      },
      advClientStreetNumValidation: {
        status: null,
        text: ""
      },
      advClientPostalCodeValidation: {
        status: null,
        text: ""
      },
      advClientCityValidation: {
        status: null,
        text: ""
      },
      advClientCountryValidation: {
        status: null,
        text: ""
      },
      advClientImgLinkValidation: {
        status: null,
        text: ""
      }
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.goToAdvClients = this.goToAdvClients.bind(this);
    this.handleImgInput = this.handleImgInput.bind(this);
    this.handleNewBeerTypes = this.handleNewBeerTypes.bind(this);
  }

  componentWillMount() {
    BeerTypeModel.getAll()
    .then(receivedBeerTypes => {
      this.setState({
        availableBeerTypes: receivedBeerTypes
      })
    })
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
      advClientNameValidation : {},
      advClientURLValidation : {},
      advClientMailValidation : {},
      advClientStreetValidation : {},
      advClientStreetNumValidation : {},
      advClientPostalCodeValidation : {},
      advClientCityValidation : {},
      advClientCountryValidation : {},
      advClientImgLinkValidation: {}
    })

    let isValid = true;

    if(!validator.isAlpha(this.state.advClientName.replace(/ /, ''))){
      this.setState({
        advClientNameValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })

      isValid = false;
    }

    if(!validator.isURL(this.state.advClientURL.replace(/ /, ''))){
      this.setState({
        advClientURLValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeURL
        }
      })

      isValid = false;
    }

    if(!validator.isEmail(this.state.advClientMail.replace(/ /, ''))){
      this.setState({
        advClientMailValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeValidMail
        }
      })

      isValid = false;
    }

    if(!validator.isAlpha(this.state.advClientStreet.replace(/ /, ''))){
      this.setState({
        advClientStreetValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })

      isValid = false;
    }

    if(!validator.isNumeric(this.state.advClientStreetNum.replace(/ /, ''))){
      this.setState({
        advClientStreetNumValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeNum
        }
      })

      isValid = false;
    }

    if(!validator.isAlphanumeric(this.state.advClientPostalCode.replace(/ /, ''))){
      this.setState({
        advClientPostalCodeValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlphaNum
        }
      })

      isValid = false;
    }

    if(!validator.isAlpha(this.state.advClientCity.replace(/ /, ''))){
      this.setState({
        advClientCityValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })

      isValid = false;
    }

    if(!validator.isAlpha(this.state.advClientCountry.replace(/ /, ''))){
      this.setState({
        advClientCountryValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })

      isValid = false;
    }

    if(!validator.isURL(this.state.advClientImgLink.replace(/ /, ''))){
      this.setState({
        advClientImgLinkValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeURL
        }
      })

      isValid = false;
    }

    e.preventDefault();

    return isValid;
  }

  goToAdvClients() {
    this.props.changeElmToRender('advClients');
  }

  handleImgInput(e) {
    let image = e.target.files[0];
    let form = new FormData();
    form.append('advClientImage', image);
    this.setState({
      imageFile: form
    });
  }

  handleSubmit(e) {
    if(this.validateForm(e)) {
      AdvClientModel.addImg(this.state.imageFile)
      .then(res => {
        const advClient = {
          name: this.state.advClientName ,
          url: this.state.advClientURL ,
          mail: this.state.advClientMail ,
          beerTypes: this.state.advClientBeerTypes,
          address: {
            street: this.state.advClientStreet ,
            num: this.state.advClientStreetNum ,
            postalCode: this.state.advClientPostalCode ,
            country: this.state.advClientCountry ,
            city: this.state.advClientCity
          },
          images: [{
            path: res.file,
            link: this.state.advClientImgLink
          }]
        }

        console.log(JSON.stringify(advClient));

        AdvClientModel.create(JSON.stringify(advClient))
        .then(createdAdvClient => {
          console.log(createdAdvClient);
          this.goToAdvClients();
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })
    }

    e.preventDefault();
  }

  handleNewBeerTypes() {
    var node = ReactDOM.findDOMNode(this.refs.selectBeerTypes);
    var options = [].slice.call(node.querySelectorAll('option'));
    var selected = options.filter(function (option) {
        return option.selected;
    });
    var selectedValues = selected.map(function (option) {
        return option.value;
    });

    this.setState({
      advClientBeerTypes: selectedValues
    });
  }

  render() {
    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.createAdvClient}</h1>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit} className="sm">
          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.info}</legend>
            <Row className="show-grid">
              <Col xs={12}>
                <FormGroup
                  bsSize="sm"
                  validationState={this.state.advClientNameValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.name}</ControlLabel>
                  <FormControl
                    name="advClientName"
                    type="text"
                    value={this.state.advClientName}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.advClientNameValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12}>
                <FormGroup
                  bsSize="sm"
                  validationState={this.state.advClientURLValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.URL}</ControlLabel>
                  <FormControl
                    name="advClientURL"
                    type="text"
                    value={this.state.advClientURL}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.advClientURLValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12}>
                <FormGroup
                  bsSize="sm"
                  validationState={this.state.advClientMailValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.mail}</ControlLabel>
                  <FormControl
                    name="advClientMail"
                    type="text"
                    value={this.state.advClientMail}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.advClientMailValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.img}</ControlLabel>
                  <input
                    name="advClientImage"
                    type="file"
                    onChange={this.handleImgInput}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  bsSize="sm"
                  validationState={this.state.advClientImgLinkValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.imgLink}</ControlLabel>
                  <FormControl
                    name="advClientImgLink"
                    type="text"
                    value={this.state.advClientImgLink}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.advClientImgLinkValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={5}>
                <FormGroup>
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.beerTypes}</ControlLabel>
                  <FormControl
                      componentClass="select"
                      multiple
                      required
                      name="beerTypes"
                      ref="selectBeerTypes"
                      value={this.state.beerTypes}
                      onChange={this.handleNewBeerTypes}
                    >
                      {
                        this.state.availableBeerTypes.map(beerType => {
                          return <option key={beerType.id} value={beerType.id}>{beerType.value}</option>
                        })
                      }
                    </FormControl>
                </FormGroup>
              </Col>
            </Row>
          </fieldset>

          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.address}</legend>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.advClientStreetValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.street}</ControlLabel>
                    <FormControl
                      name="advClientStreet"
                      type="text"
                      value={this.state.advClientStreet}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.advClientStreetValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.advClientStreetNumValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.number}</ControlLabel>
                    <FormControl
                      name="advClientStreetNum"
                      type="text"
                      value={this.state.advClientStreetNum}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.advClientStreetNumValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.advClientPostalCodeValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.postalCode}</ControlLabel>
                    <FormControl
                      name="advClientPostalCode"
                      type="text"
                      value={this.state.advClientPostalCode}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.advClientPostalCodeValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.advClientCityValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.city}</ControlLabel>
                    <FormControl
                      name="advClientCity"
                      type="text"
                      value={this.state.advClientCity}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.advClientCityValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.advClientCountryValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.country}</ControlLabel>
                    <FormControl
                      name="advClientCountry"
                      type="text"
                      value={this.state.advClientCountry}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.advClientCountryValidation.text}
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
                    onClick={this.goToAdvClients}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].cancel}
                  </Button>
                </Col>
              </FormGroup>
            </Row>
        </form>
      </Grid>
    );
  }
}

export default CreateAdvClient;
