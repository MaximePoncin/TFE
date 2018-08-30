import React, {Component} from 'react';
import {Grid, Row, Col, ListGroup, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import _ from 'lodash';

import AdvClient from './AdvClient';

import AdvClientModel from '../../../model/AdvertisingClient';
import BeerTypeModel from '../../../model/BeerType';

import Locale from '../../../locale';

class ListAdvClients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advClients: [new AdvClientModel({})],
      shownAdvClients: [new AdvClientModel({})],
      availableBeerTypes: [new BeerTypeModel({})]
    }

    this.searchByBeerType = this.searchByBeerType.bind(this);
  }

  searchByBeerType(e) {
    const filteredAdvClients = _.filter(this.state.advClients, (o) => {
                                  return o.beerTypes.includes(e.target.value)
                                });

    this.setState({
      shownAdvClients: filteredAdvClients
    })
  }

  componentWillMount() {
    AdvClientModel.getAll()
    .then(receivedAdvClients => {
      this.setState({
        advClients: receivedAdvClients,
        shownAdvClients: receivedAdvClients
      })
    })

    BeerTypeModel.getAll()
    .then(receivedBeerTypes => {
      this.setState({
        availableBeerTypes: receivedBeerTypes
      })
    })
  }

  render() {
    if(this.state.shownAdvClients.length > 0) {
      return(
        <Grid>
          <Row className="show-grid">
            <Col xs={7}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.advClients}</h1>
            </Col>
            <Col xs={5} className="text-right">
              <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.beerTypes}</ControlLabel>
              <FormControl
                componentClass="select"
                onChange={this.searchByBeerType}
              >
                {
                  this.state.availableBeerTypes.map(beerType => {
                    return <option key={beerType.id} value={beerType.id}>{beerType.value}</option>
                  })
                }
              </FormControl>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12}>
              <ul>
                <ListGroup>
                  {
                    this.state.shownAdvClients.map(advClient => {
                      return(
                        <AdvClient
                          key={advClient.id}
                          advClientToRender={advClient}
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
      return(
        <Grid>
          <Row className="show-grid">
            <Col xs={7}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.noneToDisplay}</h1>
            </Col>
            <Col xs={5} className="text-right">
              <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.beerTypes}</ControlLabel>
              <FormControl
                componentClass="select"
                onChange={this.searchByBeerType}
              >
                {
                  this.state.availableBeerTypes.map(beerType => {
                    return <option key={beerType.id} value={beerType.id}>{beerType.value}</option>
                  })
                }
              </FormControl>
            </Col>
          </Row>
        </Grid>
      )
    }
  }
}
export default ListAdvClients;
