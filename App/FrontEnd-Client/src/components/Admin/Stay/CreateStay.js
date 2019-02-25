import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {FieldGroup, FormGroup, ControlLabel, FormControl, Checkbox, Button, Grid, Row, Col, HelpBlock} from 'react-bootstrap';
import _ from 'lodash';
import validator from 'validator';

import StayModel from '../../../model/Stay';
import ActivityModel from '../../../model/Activity';
import ThemeModel from '../../../model/Theme';

import Locale from '../../../locale';

class CreateStay extends Component {
  constructor(props) {
    super(props);

    this.availableCheckbox = React.createRef();

    this.state = {
      stay: new StayModel({}),
      availableThemes : new Array,
      availableActivities: new Array,
      nbOvernights: "1",
      startingPrice: "1.0",
      available: false,
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
    this.goToStaysList = this.goToStaysList.bind(this);
  }

  goToStaysList() {
    this.props.changeElmToRender("stays");
  }

  componentWillMount() {
    let availableThemes,
        availableActivities;

    ThemeModel.getAll()
    .then(receivedThemes => {
      this.setState({
        availableThemes: receivedThemes,
        theme: receivedThemes[0].id
      })
    })
    .catch(err => {
      console.log(err);
    })

    ActivityModel.getAll()
    .then(receivedActivities => {
      this.setState({
        availableActivities: receivedActivities,
        activities: receivedActivities[0].id
      })
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
    } else {
      this.setState({
        available: false
      });
    }
  }

  handleImgInput(e) {
    let image = e.target.files[0];
    let form = new FormData();
    form.append('stayImage', image);
    this.setState({
      imageFile: form
    });
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

  handleSubmit(e) {
    if(this.validateForm(e)){

      StayModel.addImg(this.state.imageFile)
      .then(res => {
        const stay = {
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
          images: [res.file]
        }

        StayModel.create(JSON.stringify(stay))
        .then(success => {
          this.goToStaysList();
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

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.createStay}</h1>
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
                    value={this.state.available}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.available}
                  </Checkbox>
                </FormGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12}>
                <FormGroup>
                  <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.img}</ControlLabel>
                  <input
                    name="stayImage"
                    type="file"
                    onChange={this.handleImgInput}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
          </fieldset>
          <Button
            type="submit"
          >
            {Locale[localStorage.getItem('LPC_beerTour_locale')].create}
          </Button>
        </form>
      </Grid>
    )
  }
}

export default CreateStay;
