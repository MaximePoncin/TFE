import React, {Component} from 'react';
import {Image, Carousel, Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, FieldGroup, Checkbox, HelpBlock} from 'react-bootstrap';
import validator from 'validator';
import _ from 'lodash';

import StayModel from '../../../model/Stay';
import ThemeModel from '../../../model/Theme';
import ActivityModel from '../../../model/Activity';

import Locale from '../../../locale';

class EditStay extends Component {
  constructor(props){
    super(props);

    this.state = {
      stay: new StayModel({}),
      imgArray: new Array(""),
      nameEN : "",
      nameFR: "",
      nameDE: "",
      theme: "",
      activities: [""],
      nbOvernights: "1",
      startingPrice: "1.0",
      available: false,
      city: "",
      coutry: "",
      availableThemes: [new ThemeModel({})],
      availableActivities: [new ActivityModel({})],
      nameENValidation: {
        text: "",
        status: null
      },
      nameFRValidation: {
        text: "",
        status: null
      },
      nameDEValidation: {
        text: "",
        status: null
      },
      cityValidation: {
        text: "",
        status: null
      },
      countryValidation: {
        text: "",
        status: null
      }
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleAvailability = this.handleAvailability.bind(this);
    this.handleNewActivities = this.handleNewActivities.bind(this);
    this.handleImgInput = this.handleImgInput.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToStays = this.goToStays.bind(this);
    this.addImgToStay = this.addImgToStay.bind(this);
  }

  handleUserInput(e) {
    const name = e.target.name,
          value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  handleNewActivities() {
    var node = ReactDOM.findDOMNode(this.refs.selectActivities);
    var options = [].slice.call(node.querySelectorAll('option'));
    var selected = options.filter(function (option) {
        return option.selected;
    });
    var selectedValues = selected.map(function (option) {
        return option.value;
    });

    this.setState({
      activities: selectedValues
    });
  }

  handleAvailability(e) {
    if (e.target.checked) {
      this.setState({
        available: true
      });
      return "on";
    } else {
      this.setState({
        available: false
      });
      return null;
    }
  }

  handleImgInput(e) {
    if(e.target.files.length > 0) {
      let image = e.target.files[0];
      let form = new FormData();
      form.append('stayImage', image);
      this.setState({
        imageFile: form
      });
    } else {
      this.setState({
        imageFile: undefined
      })
    }
  }

  goToStays() {
    this.props.changeElmToRender("stays");
  }

  validateForm(e) {
    this.setState({
      nameENValidation: {
        text: "",
        status: null
      },
      nameFRValidation: {
        text: "",
        status: null
      },
      nameDEValidation: {
        text: "",
        status: null
      },
      cityValidation: {
        text: "",
        status: null
      },
      countryValidation: {
        text: "",
        status: null
      }
    })

      let isValid = true;

      if(!validator.isAlpha(this.state.nameEN.replace(/ /, ''))) {
        this.setState({
          nameENValidation:{
            status: "error",
            text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
          }
        })
        isvalid = false;
      }

      if(!validator.isAlpha(this.state.nameFR.replace(/ /, ''))) {
        this.setState({
          nameFRValidation:{
            status: "error",
            text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
          }
        })
        isvalid = false;
      }

      if(!validator.isAlpha(this.state.nameDE.replace(/ /, ''))) {
        this.setState({
          nameDEValidation:{
            status: "error",
            text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
          }
        })
        isvalid = false;
      }

      if(!validator.isAlpha(this.state.city.replace(/ /, ''))) {
        this.setState({
          nameENValidation:{
            status: "error",
            text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
          }
        })
        isvalid = false;
      }

      if(!validator.isAlpha(this.state.country.replace(/ /, ''))) {
        this.setState({
          countryValidation:{
            status: "error",
            text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
          }
        })
        isvalid = false;
      }

      if(!validator.isAlpha(this.state.city.replace(/ /, ''))) {
        this.setState({
          cityValidation:{
            status: "error",
            text: Locale[localStorage.getItem('LPC_beerTour_locale')].validation.mustBeAlpha
          }
        })
        isvalid = false;
      }

    e.preventDefault();

    return isValid;
  }

  deleteImg(imgPath) {
    console.log(imgPath);
    StayModel.deleteImg(JSON.stringify({imgLink: imgPath}))
    .then(res => {
      StayModel.get(this.props.concernedStayId)
      .then(stay => {
        // (stay.images).push(imgPath.file)
        let newImgsArray = this.state.imgArray;
        _.pull(newImgsArray, imgPath);
        console.log(newImgsArray);

        this.setState({
          imgArray: newImgsArray
        })

        const stayToUpdate = {
          names: [
            {
              lang: "EN",
              name: stay.names[0].name
            },
            {
              lang: "FR",
              name: stay.names[1].name
            },
            {
              lang: "DE",
              name: stay.names[2].name
            },
          ],
          overnightStay: stay.overnightStay,
          activity: stay.activity,
          theme: stay.theme,
          startingPrice: stay.startingPrice,
          available: stay.available,
          locality: {
            country: stay.locality.country,
            city: stay.locality.city
          },
          images: newImgsArray
        }

        StayModel.update(this.props.concernedStayId, JSON.stringify(stayToUpdate))
        .then(success => {
          console.log('Img deleted');
        })
        .catch(err => {
          console.log(err);
        })
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  addImgToStay() {
    StayModel.addImg(this.state.imageFile)
    .then(imgPath => {
      console.log(imgPath);
      StayModel.get(this.props.concernedStayId)
      .then(stay => {
        // (stay.images).push(imgPath.file)
        let newImgsArray = new Array();
        newImgsArray = stay.images;

        console.log(imgPath);
        newImgsArray.push(imgPath.file);

        this.setState({
          imgArray: newImgsArray
        })

        const stayToUpdate = {
          names: [
            {
              lang: "EN",
              name: stay.names[0].name
            },
            {
              lang: "FR",
              name: stay.names[1].name
            },
            {
              lang: "DE",
              name: stay.names[2].name
            },
          ],
          overnightStay: stay.overnightStay,
          activity: stay.activity,
          theme: stay.theme,
          startingPrice: stay.startingPrice,
          available: stay.available,
          locality: {
            country: stay.locality.country,
            city: stay.locality.city
          },
          images: newImgsArray
        }

        StayModel.update(this.props.concernedStayId, JSON.stringify(stayToUpdate))
        .then(success => {
          // this.goToStaysList();
          console.log('Img added');
        })
        .catch(err => {
          console.log(err);
        })
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleSubmit(e) {
    if(this.validateForm(e)){

      StayModel.get(this.props.concernedStayId)
      .then(stay => {
        const stayToUpdate = {
          names: [
            {
              lang: "EN",
              name: this.state.nameEN
            },
            {
              lang: "FR",
              name: this.state.nameFR
            },
            {
              lang: "DE",
              name: this.state.nameDE
            },
          ],
          overnightStay: this.state.nbOvernights,
          activity: this.state.activities,
          theme: this.state.theme,
          startingPrice: this.state.startingPrice,
          available: this.state.available,
          locality: {
            country: this.state.country,
            city: this.state.city
          },
          images: stay.images
        }

        StayModel.update(this.props.concernedStayId, JSON.stringify(stayToUpdate))
        .then(success => {
          this.goToStaysList();
        })
        .catch(err => {
          console.log(err);
        })
      })
    }
    e.preventDefault();
  }

  componentWillMount() {
    StayModel.get(this.props.concernedStayId)
    .then(stay => {

      ThemeModel.getAll()
      .then(receivedThemes => {
        this.setState({
          availableThemes: receivedThemes
        })
      })
      .catch(err => {
        console.log(err);
      })

      ActivityModel.getAll()
      .then(receivedActivities => {
        this.setState({
          availableActivities: receivedActivities
        })
      })
      .catch(err => {
        console.log(err);
      })

      this.setState({
        stay: stay,
        imgArray: stay.images,
        nameEN: stay.getName('EN'),
        nameFR: stay.getName('FR'),
        nameDE: stay.getName('DE'),
        nbOvernights: stay.overnightStay,
        theme: stay.theme,
        activities: stay.activity,
        city: stay.locality.city,
        country: stay.locality.country,
        startingPrice: stay.startingPrice,
        available: stay.available
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
            <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.editStay}</h1>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.stayNames}</legend>
            <Row className="show-grid">
              <Col xs={12}>
                <FormGroup
                  validationState={this.state.nameENValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.nameEN}</ControlLabel>
                  <FormControl
                    name="nameEN"
                    type="text"
                    value={this.state.nameEN}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.nameENValidation.text}
                  </HelpBlock>
                </FormGroup>

                <FormGroup
                  validationState={this.state.nameFRValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.nameFR}</ControlLabel>
                  <FormControl
                    name="nameFR"
                    type="text"
                    value={this.state.nameFR}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.nameFRValidation.text}
                  </HelpBlock>
                </FormGroup>

                <FormGroup
                  validationState={this.state.nameDEValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.nameDE}</ControlLabel>
                  <FormControl
                    name="nameDE"
                    type="text"
                    value={this.state.nameDE}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.nameDEValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
          </fieldset>
          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.description}</legend>
            <Row className="show-grid">
            <Col xs={3}>
              <FormGroup
                bsSize="sm"
              >
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.overnight}</ControlLabel>
                <br />
                <FormControl
                    name="nbOvernights"
                    type="number"
                    min="1"
                    value={this.state.nbOvernights}
                    placeholder="1"
                    onChange={this.handleUserInput}
                    required
                  />
              </FormGroup>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={5}>
              <FormGroup>
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.theme}</ControlLabel>
                <FormControl
                    componentClass="select"
                    name="theme"
                    value={this.state.theme}
                    onChange={this.handleUserInput}
                  >
                    {
                      this.state.availableThemes.map(theme => {
                        return <option key={theme.id} value={theme.id}>{theme.getName(localStorage.getItem("LPC_beerTour_locale"))}</option>
                      })
                    }
                  </FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={5}>
              <FormGroup>
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.activities}</ControlLabel>
                <FormControl
                    componentClass="select"
                    multiple
                    required
                    name="activities"
                    ref="selectActivities"
                    value={this.state.activities}
                    onChange={this.handleNewActivities}
                  >
                    {
                      this.state.availableActivities.map(activity => {
                        return <option key={activity.id} value={activity.id}>{activity.getName(localStorage.getItem("LPC_beerTour_locale"))}</option>
                      })
                    }
                  </FormControl>
              </FormGroup>
            </Col>
          </Row>
          </fieldset>
          <fieldset>
            <legend>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.locality}</legend>
            <Row className="show-grid">
              <Col xs={12}>
                <FormGroup
                  validationState={this.state.cityValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.city}</ControlLabel>
                  <FormControl
                    name="city"
                    type="text"
                    value={this.state.city}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.cityValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12}>
                <FormGroup
                  validationState={this.state.countryValidation.status}
                >
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.country}</ControlLabel>
                  <FormControl
                    name="country"
                    type="text"
                    value={this.state.country}
                    onChange={this.handleUserInput}
                    required
                  />
                  <HelpBlock>
                    {this.state.countryValidation.text}
                  </HelpBlock>
                </FormGroup>
              </Col>
            </Row>
          </fieldset>
          <fieldset>
            <legend></legend>
            <Row className="show-grid">
              <Col xs={3}>
                <FormGroup>
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.startingPrice}</ControlLabel>
                  <br />
                  <FormControl
                      name="startingPrice"
                      type="number"
                      min="1.0"
                      step="0.01"
                      value={this.state.startingPrice}
                      placeholder="1.0"
                      onChange={this.handleUserInput}
                      required
                    />
                </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12}>
                <FormGroup>
                  <Checkbox
                    inline
                    ref={this.availableCheckbox}
                    name="available"
                    onChange={this.handleAvailability}
                    value={this.handleAvailability}
                    // value={this.state.available}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.available}
                  </Checkbox>
                </FormGroup>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={12}>
                <Carousel>
                  {
                    this.state.imgArray.map(imgPath => {
                      return(
                        <Carousel.Item>
                          {/* <img  src={imgPath} /> */}
                          {/* <Image src={imgPath} responsive /> */}
                          <Image width={450} height={250} src={imgPath} responsive />
                          <Carousel.Caption>
                            <Button
                              bsStyle="danger"
                              onClick={this.deleteImg.bind(this, imgPath)}
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
              <Col xs={4}>
                <FormGroup>
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.addAnImg}</ControlLabel>
                  <input
                    name="stayImage"
                    type="file"
                    onChange={this.handleImgInput}
                  />
                </FormGroup>
              </Col>
              <Col xs={8} className="text-left">
                <Button
                  bsStyle="primary"
                  onClick={this.addImgToStay}
                  disabled={this.state.imageFile == undefined}
                >
                  {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.addImg}
                </Button>
              </Col>
            </Row>
          </fieldset>
          <Row className="show-grid">
            <Col xs={6} className="text-center">
              <Button
                type="submit"
                bsStyle="primary"
              >
                {Locale[localStorage.getItem('LPC_beerTour_locale')].edit}
              </Button>
            </Col>
            <Col xs={6} className="text-center">
              <Button
                bsStyle="primary"
                onClick={this.goToStays}
              >
                {Locale[localStorage.getItem('LPC_beerTour_locale')].cancel}
              </Button>
            </Col>
          </Row>
        </form>
      </Grid>
    );
  }
}

export default EditStay;
