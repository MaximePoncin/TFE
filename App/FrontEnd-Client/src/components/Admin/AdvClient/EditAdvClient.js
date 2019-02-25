import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Image, Carousel, Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, FieldGroup, HelpBlock} from 'react-bootstrap';
import validator from 'validator';
import _ from 'lodash';

import AdvClientModel from '../../../model/AdvertisingClient';
import BeerTypeModel from '../../../model/BeerType';

import Locale from '../../../locale';

class EditAdvClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advClient: new AdvClientModel({}),
      imgArray: new Array({path:"", link:""}),
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
    this.addImg = this.addImg.bind(this);
  }

  handleUserInput(e) {
    const name = e.target.name,
          value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  componentWillMount() {
    BeerTypeModel.getAll()
    .then(receivedBeerTypes => {
      this.setState({
        availableBeerTypes: receivedBeerTypes
      })
    })
    .catch(err => {
      console.log(err);
    })

    AdvClientModel.get(this.props.concernedAdvClientId)
    .then(receivedAdvClient => {
      console.log(receivedAdvClient);

      this.setState({
        advClientName: receivedAdvClient.name,
        advClientMail: receivedAdvClient.mail,
        advClientURL: receivedAdvClient.url,
        advClientImages: receivedAdvClient.images,
        imgArray: receivedAdvClient.images,
        advClientStreet: receivedAdvClient.address.street,
        advClientStreetNum: receivedAdvClient.address.num,
        advClientPostalCode: receivedAdvClient.address.postalCode,
        advClientCountry: receivedAdvClient.address.country,
        advClientCity: receivedAdvClient.address.city
      })
    })
    .catch(err => {
      console.log(err);
    })
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

    e.preventDefault();

    return isValid;
  }

  handleSubmit(e) {
    if(this.validateForm(e)) {
      let imgArrayWithoutID = new Array();

      this.state.imgArray.map(img => {
        imgArrayWithoutID.push({path:img.path, link:img.link})
      })

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
        images: imgArrayWithoutID
      }

      console.log(advClient);

      AdvClientModel.update(this.props.concernedAdvClientId, JSON.stringify(advClient))
      .then(createdAdvClient => {
        console.log(createdAdvClient);
        this.goToAdvClients();
      })
      .catch(err => {
        console.log(err);
      })
    }
    e.preventDefault();
  }

  addImg() {
    if(this.state.imageFile != undefined
      && this.state.advClientImgLink) {
      AdvClientModel.addImg(this.state.imageFile)
      .then(imgPath => {
        AdvClientModel.get(this.props.concernedAdvClientId)
        .then(currentAdvClient => {
          let newImgsArray = new Array();
          currentAdvClient.images.map(img => {
            newImgsArray.push({path: img.path, link:img.link})
          })

          newImgsArray.push({path: imgPath.file, link:this.state.advClientImgLink});

          currentAdvClient.images = newImgsArray;

          const modifiedAdvClient = {
            mail: currentAdvClient.mail,
            name: currentAdvClient.name,
            url: currentAdvClient.url,
            beerTypes: currentAdvClient.beerTypes,
            address: {
              street: currentAdvClient.address.street,
              num: currentAdvClient.address.num,
              postalCode: currentAdvClient.address.postalCode,
              country: currentAdvClient.address.country,
              city: currentAdvClient.address.city
            },
            images: currentAdvClient.images
          }

          console.log(modifiedAdvClient);

          AdvClientModel.update(this.props.concernedAdvClientId, JSON.stringify(modifiedAdvClient))
          .then(updatedAdvClient => {
            console.log(updatedAdvClient);
            // this.setState({
            //   imgArray: updatedAdvClient.images
            // })
          })
          .catch(err => {
            console.log(err);
          })
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  deleteImg(imgPath) {
    AdvClientModel.deleteImg(imgPath)
    .then(res => {
      AdvClientModel.get(this.props.concernedAdvClientId)
      .then(currentAdvClient => {
        let newImgsArray = this.state.imgArray;
        _.pull(newImgsArray, imgPath);
        console.log(newImgsArray)

        this.setState({
          imgArray: newImgsArray
        })

        currentAdvClient.images = newImgsArray;

        AdvClientModel.update(this.props.concernedAdvClientId, JSON.stringify(currentAdvClient))
        .then(updatedAdvClient => {
          console.log(updatedAdvClient);
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.editAdvClient}</h1>
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
              <Col xs={8}>
                <Carousel>
                  {
                    this.state.imgArray.map(img => {
                      return(
                        <Carousel.Item>
                          <Image width={450} height={250} src={img.path} responsive />
                          <Carousel.Caption>
                            <Button
                              bsStyle="danger"
                              onClick={this.deleteImg.bind(this, img.path)}
                              disabled={this.state.imgArray.length <= 1}
                            >
                              {Locale[localStorage.getItem('LPC_beerTour_locale')].delete}
                            </Button>
                          </Carousel.Caption>
                        </Carousel.Item>
                      )
                    })
                  }
                </Carousel>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={6}>
                <FormGroup>
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.img}</ControlLabel>
                  <input
                    name="advClientImage"
                    type="file"
                    onChange={this.handleImgInput}
                  />
                </FormGroup>
              </Col>
              <Col xs={6} className="text-left">
                <Button
                  bsStyle="primary"
                  onClick={this.addImg}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.addImg}
                </Button>
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
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].edit}
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
    )
  }
}

export default EditAdvClient;
