import React, {Component} from 'react';
import {Grid, Row, Col, ListGroup, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import _ from 'lodash';

import SalePoint from './SalePoint';

import SalePointModel from '../../../model/SalePoint';

import Locale from '../../../locale';

class ListSalePoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      salePoints: [new SalePointModel({})],
      shownSalePoints: [new SalePointModel({})],
      city: "",
      country: ""
    }

    this.handleUserInput = this.handleUserInput.bind(this);
    this.search = this.search.bind(this);

  }

  handleUserInput(e) {
    const name = e.target.name,
          value = e.target.value;

    this.setState({
      [name]: value
    });

    this.search();
  }

  search() {
    let filteredSalePoints;

    if (this.state.city == "" && this.state.country == "") {
      filteredSalePoints = this.state.salePoints
    } else if (this.state.city == "" && this.state.country != "") {
      filteredSalePoints = _.filter(this.state.salePoints, (o) => {
        return o.address.country == this.state.country
      })
    } else if (this.state.city != "" && this.state.country == "") {
      filteredSalePoints = _.filter(this.state.salePoints, (o) => {
        return o.address.city == this.state.city
      })
    } else if(this.state.city != "" && this.state.country != "") {
      filteredSalePoints = _.filter(this.state.salePoints, (o) => {
        return o.address.city == this.state.city && o.address.country == this.state.country
      })
    }

    this.setState({
      shownSalePoints: filteredSalePoints
    })
  }

  componentWillMount() {
    SalePointModel.getAll()
    .then(receivedSalePoints => {
      this.setState({
        salePoints: receivedSalePoints,
        shownSalePoints: receivedSalePoints
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if(this.state.shownSalePoints.length > 0) {
      return(
        <Grid>
          <Row className="show-grid">
            <Col xs={7}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.salePoints}</h1>
            </Col>
            {/* <Col xs={5}>
              <Grid fluid>
                <Row className="show-grid">
                  <form>
                    <FormGroup
                      bsSize="sm"
                    >
                      <Col xs={12} className="text-right">
                        <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.city}</ControlLabel>
                        <FormControl
                          type="text"
                          name="city"
                          value={this.state.city}
                          onChange={this.handleUserInput}
                        />
                      </Col>
                      <Col xs={12} className="text-right">
                        <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.country}</ControlLabel>
                        <FormControl
                          type="text"
                          name="country"
                          value={this.state.country}
                          onChange={this.handleUserInput}
                        />
                      </Col>
                    </FormGroup>
                  </form>
                </Row>
              </Grid>
            </Col> */}
          </Row>
          <Row className="show-grid">
            <Col xs={12}>
              <ul>
                <ListGroup>
                  {
                    this.state.shownSalePoints.map(salePoint => {
                      return(
                        <SalePoint
                          key={salePoint.id}
                          salePointToRender={salePoint}
                          // handleEdition={this.handleEditSalePoint}
                          // handleDeletion={this.handleDeleteSalePoint}
                          changeElmToRender={this.props.changeElmToRender}
                        />
                      )
                    })
                  }
                </ListGroup>
              </ul>
            </Col>
          </Row>
        </Grid>
      )
    } else {
      return (
        <Grid>
          <Row className="show-grid">
            <Col xs={7}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.noneToDisplay}</h1>
            </Col>
            {/* <Col xs={5}>
              <Grid fluid>
                <Row className="show-grid">
                  <form>
                    <FormGroup
                      bsSize="sm"
                    >
                      <Col xs={12} className="text-right">
                        <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.city}</ControlLabel>
                        <FormControl
                          type="text"
                          name="city"
                          value={this.state.city}
                          onChange={this.handleUserInput}
                        />
                      </Col>
                      <Col xs={12} className="text-right">
                        <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.country}</ControlLabel>
                        <FormControl
                          type="text"
                          name="country"
                          value={this.state.country}
                          onChange={this.handleUserInput}
                        />
                      </Col>
                    </FormGroup>
                  </form>
                </Row>
              </Grid>
            </Col> */}
          </Row>
        </Grid>
      )
    }
  }
}

export default ListSalePoints;
