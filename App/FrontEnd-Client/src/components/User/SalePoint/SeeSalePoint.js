import React, {Component} from 'react';
import {Grid, Row, Col, Button, Carousel, Image} from 'react-bootstrap';

import SalePointModel from '../../../model/SalePoint';

import Locale from '../../../locale';

class SeeSalePoint extends Component {
  constructor(props){
    super(props);

    this.state = {
      salePoint: new SalePointModel({})
    }
  }

  componentWillMount() {
    SalePointModel.get(this.props.salePointId)
    .then(receivedSalePoint => {
      this.setState({
        salePoint : receivedSalePoint
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
            <h1>{this.state.salePoint.name}</h1>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={6}>
            <p>
              <h3>
                <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.address}</b>
                <br />
                {this.state.salePoint.address.num}, {this.state.salePoint.address.street} {this.state.salePoint.address.postalCode}
                <br />
                {this.state.salePoint.address.city}, {this.state.salePoint.address.country}
              </h3>
            </p>
          </Col>
          <Col xs={6} className="text-center">
            <Carousel>
              {
                this.state.salePoint.images.map(img => {
                  return(
                    <Carousel.Item>
                      <a href={img.link} target="_blank">
                        <Image width={450} height={250} src={img.path} responsive />
                      </a>
                    </Carousel.Item>
                  )
                })
              }
            </Carousel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default SeeSalePoint;
