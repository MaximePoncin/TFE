import React, {Component} from 'react';
import {Grid, Row, Col, ListGroup} from 'react-bootstrap';

import AdvClient from './AdvClient';

import AdvClientModel from '../../../model/AdvertisingClient';

import Locale from '../../../locale';

class ListAdvClients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advClients: [new AdvClientModel({})]
    }

    this.handleEditAdvClient = this.handleEditAdvClient.bind(this);
    this.handleDeleteAdvClient = this.handleDeleteAdvClient.bind(this);
  }

  handleEditAdvClient(advClientId) {
    this.props.changeElmToRender("editAdvClient", advClientId)
  }

  handleDeleteAdvClient(advClientId) {
    let currentAdvClients = this.state.advClients;
    const newAdvClientsTab = _.reject(currentAdvClients, {"id": advClientId});

    console.log(newAdvClientsTab);

    this.setState({
      advClients: newAdvClientsTab
    })
  }

  componentWillMount() {
    AdvClientModel.getAll()
    .then(receivedAdvClients => {
      this.setState({
        advClients: receivedAdvClients
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if(this.state.advClients.length > 0) {
      return(
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.advClients}</h1>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12}>
              <ul>
                <ListGroup>
                  {
                    this.state.advClients.map(advClient => {
                      return(
                        <AdvClient
                          key={advClient.id}
                          advClientToRender={advClient}
                          handleEdition={this.handleEditAdvClient}
                          handleDeletion={this.handleDeleteAdvClient}
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
            <Col xs={12}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.noneToDisplay}</h1>
            </Col>
          </Row>
        </Grid>
      )
    }
  }
}

export default ListAdvClients;
