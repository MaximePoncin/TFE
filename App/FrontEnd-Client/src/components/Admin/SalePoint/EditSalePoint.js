import React, {Component} from 'react';
import {Image, Carousel, Grid, Row, Col, Button, FormGroup, FormControl, ControlLabel, FieldGroup, HelpBlock} from 'react-bootstrap';
import validator from 'validator';

import SalePointModel from '../../../model/SalePoint';
import UserModel from '../../../model/User';

import Locale from '../../../locale';

class EditSalePoint extends Component {
  constructor(props){
    super(props);

    this.state = {
      salePoint: new SalePointModel({}),
      imgArray: new Array({path: "", link: ""}),
      salePointName: "",
      salePointStreet: "",
      salePointStreetNum: "",
      salePointPostalCode: "",
      salePointCountry: "",
      salePointCity: "",
      salePointImage: new Array({path:"", link:""}),
      salePointImageLink: "",
      salePointNameValidation: {
        status: null,
        text: ""
      },
      salePointImageLinkValidation: {
        status: null,
        text: ""
      },
      salePointStreetValidation: {
        status: null,
        text: ""
      },
      salePointStreetNumValidation: {
        status: null,
        text: ""
      },
      salePointPostalCodeValidation: {
        status: null,
        text: ""
      },
      salePointCityValidation: {
        status: null,
        text: ""
      },
      salePointCountryValidation: {
        status: null,
        text: ""
      }
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleImgInput = this.handleImgInput.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToSalePoints = this.goToSalePoints.bind(this);
  }

  componentWillMount() {
    SalePointModel.get(this.props.concernedSalePointId)
    .then(receivedSalePoint => {
      this.setState({
        salePoint: receivedSalePoint,
        salePointName: receivedSalePoint.name,
        salePointStreet: receivedSalePoint.address.street,
        salePointStreetNum: receivedSalePoint.address.num,
        salePointPostalCode: receivedSalePoint.address.postalCode,
        salePointCountry: receivedSalePoint.address.country,
        salePointCity: receivedSalePoint.address.city,
        imgArray: receivedSalePoint.images,
        salePointImageLink: receivedSalePoint.images[0].link
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleUserInput(e) {
    const name = e.target.name,
          value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  handleImgInput(e) {
    if(e.target.files.length > 0) {
      let image = e.target.files[0];
      let form = new FormData();
      form.append('salePointImage', image);
      this.setState({
        imageFile: form
      });
    } else {
      this.setState({
        imageFile: undefined
      })
    }
  }

  goToSalePoints() {
    this.props.changeElmToRender('salePoints');
  }

  validateForm(e) {
    this.setState({
      salePointNameValidation: {},
      salePointImageLinkValidation: {},
      salePointStreetValidation: {},
      salePointStreetNumValidation: {},
      salePointPostalCodeValidation: {},
      salePointCityValidation: {},
      salePointCountryValidation: {},
    })

    let isValid = true;

    if(!validator.isAlpha(this.state.salePointName.replace(/ /, ''))) {
      this.setState({
        salePointNameValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })

      isValid = false;
    }

    if(!validator.isURL(this.state.salePointImageLink)) {
      this.setState({
        salePointImageValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeURL
        }
      })

      isValid = false;
    }

    if(!validator.isAlpha(this.state.salePointStreet.replace(/ /, ''))) {
      this.setState({
        salePointStreetValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })

      isValid = false;
    }

    if(!validator.isAlphanumeric(this.state.salePointStreetNum.replace(/ /, ''))) {
      this.setState({
        salePointStreetNumValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlphaNum
        }
      })

      isValid = false;
    }

    if(!validator.isNumeric(this.state.salePointPostalCode.replace(/ /, ''))) {
      this.setState({
        salePointPostalCodeValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeNum
        }
      })

      isValid = false;
    }

    if(!validator.isAlpha(this.state.salePointCountry.replace(/ /, ''))) {
      this.setState({
        salePointCountryValidation: {
          status: "error",
          text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
        }
      })

      isValid = false;
    }

    if(!validator.isAlpha(this.state.salePointCity.replace(/ /, ''))) {
      this.setState({
        salePointCityValidation: {
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

      if(this.state.imageFile != undefined) {
        SalePointModel.addImg(this.state.imageFile)
        .then(img => {

          const imgToDelete = {
            imgLink: this.state.imgArray[0].path
          }

          this.setState({
            imgArray: new Array({path: img.file, link: this.state.salePointImageLink})
          })

          console.log("Img added: " + img.file);

          console.log(JSON.stringify(imgToDelete));

          SalePointModel.deleteImg(JSON.stringify(imgToDelete))
          .then(() => {
            console.log("Img deleted");

            const salePoint = {
              name: this.state.salePointName,
              address: {
                street: this.state.salePointStreet,
                num: this.state.salePointStreetNum,
                postalCode: this.state.salePointPostalCode,
                country: this.state.salePointCountry,
                city: this.state.salePointCity
              },
              // images: [{
              //   path: res.file,
              //   link: this.state.salePointImageLink
              // }]
              images: [{
                path: this.state.imgArray[0].path,
                link: this.state.salePointImageLink
              }]
              // images: this.state.imgArray
            }

            console.log(salePoint);

            SalePointModel.update(this.props.concernedSalePointId, JSON.stringify(salePoint))
            .then(updatedSalePoint => {
              console.log("SalePoint updated");
              console.log(updatedSalePoint);
            })
            .catch(err => {
              console.log(err);
            })
          })
          .catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
          console.log(err);
        })
      }
    }

    e.preventDefault();
  }

  render() {
    return(
      // <h1>{this.props.concernedSalePointId}</h1>
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.editSalePoint}</h1>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit} className="sm">
          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.info}</legend>
            <Row className="show-grid">
              <Col xs={12}>
                <FormGroup
                  bsSize="sm"
                  validationState={this.state.salePointNameValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.name}</ControlLabel>
                  <FormControl
                    name="salePointName"
                    type="text"
                    value={this.state.salePointName}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.salePointNameValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.img}</ControlLabel>
                  <input
                    name="salePointImage"
                    type="file"
                    onChange={this.handleImgInput}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6}>
                <a href={this.state.imgArray[0].link} target="_blank">
                  <Image src={this.state.imgArray[0].path} responsive />
                </a>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={10}>
                <FormGroup
                  bsSize="sm"
                  validationState={this.state.salePointImageLinkValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.imgLink}</ControlLabel>
                  <FormControl
                    name="salePointImageLink"
                    type="text"
                    value={this.state.salePointImageLink}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.salePointImageLinkValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
          </fieldset>

          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.address}</legend>
            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.salePointStreetValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.street}</ControlLabel>
                    <FormControl
                      name="salePointStreet"
                      type="text"
                      value={this.state.salePointStreet}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.salePointStreetValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.salePointStreetNumValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].register.streetNum}</ControlLabel>
                    <FormControl
                      name="salePointStreetNum"
                      type="text"
                      value={this.state.salePointStreetNum}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.salePointStreetNumValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.salePointPostalCodeValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.postalCode}</ControlLabel>
                    <FormControl
                      name="salePointPostalCode"
                      type="text"
                      value={this.state.salePointPostalCode}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.salePointPostalCodeValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.salePointCityValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.city}</ControlLabel>
                    <FormControl
                      name="salePointCity"
                      type="text"
                      value={this.state.salePointCity}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.salePointCityValidation.text}
                    </HelpBlock>
                  </FormGroup>
                </Col>
            </Row>

            <Row className="show-grid">
                <Col xs={10}>
                  <FormGroup
                    bsSize="sm"
                    validationState={this.state.salePointCountryValidation.status}
                  >
                    <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.country}</ControlLabel>
                    <FormControl
                      name="salePointCountry"
                      type="text"
                      value={this.state.salePointCountry}
                      onChange={this.handleUserInput}
                      required
                    />
                    <HelpBlock>
                      {this.state.salePointCountryValidation.text}
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
                    onClick={this.goToSalePoints}
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

export default EditSalePoint;
