import React, {Component} from 'react';
import {Grid, Row, Col, ListGroup} from 'react-bootstrap';
import _ from 'lodash';

import SalePoint from './SalePoint';

import SalePointModel from '../../../model/SalePoint';

import Locale from '../../../locale';

class ListSalePoints extends Component {
  constructor(props){
    super(props);

    this.state = {
      salePoints: [new SalePointModel({})]
    }

    this.handleEditSalePoint = this.handleEditSalePoint.bind(this);
    this.handleDeleteSalePoint = this.handleDeleteSalePoint.bind(this);
  }

  handleEditSalePoint(salePointId) {
    this.props.changeElmToRender("editSalePoint", salePointId);
  }

  handleDeleteSalePoint(salePointId) {
    let currentSalePoints = this.state.salePoints;
    const newSalePointsTab = _.reject(currentSalePoints, {"id": salePointId});

    console.log(newSalePointsTab);

    this.setState({
      salePoints: newSalePointsTab
    })
  }

  componentWillMount() {
    SalePointModel.getAll()
    .then(receivedSalePoints => {
      this.setState({
        salePoints: receivedSalePoints
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if(this.state.salePoints.length > 0) {
      return(
        <Grid>
          <Row className="show-grid">
            <Col xs={12}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.salePoints}</h1>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12}>
              <ul>
                <ListGroup>
                  {
                    this.state.salePoints.map(salePoint => {
                      return(
                        // <h1>{salePoint.id}</h1>
                        <SalePoint
                          key={salePoint.id}
                          salePointToRender={salePoint}
                          handleEdition={this.handleEditSalePoint}
                          handleDeletion={this.handleDeleteSalePoint}
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
            <Col xs={12}>
              <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.noneToDisplay}</h1>
            </Col>
          </Row>
        </Grid>
      )
    }
  }
}

export default ListSalePoints;
