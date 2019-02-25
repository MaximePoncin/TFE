import React, {Component} from 'react';
import {Image, Carousel, Grid, Row, Col} from 'react-bootstrap';

import AdvClientModel from '../../../model/AdvertisingClient';
import BeerTypeModel from '../../../model/BeerType';

import Locale from '../../../locale';

class SeeAdvClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advClient: new AdvClientModel({}),
      beerTypes: [new BeerTypeModel({})]
    }
  }

  componentWillMount() {
    AdvClientModel.get(this.props.advClientId)
    .then(receivedAdvClient => {

      let beerTypesArray = {
        ids: receivedAdvClient.beerTypes
      }

      BeerTypeModel.getMany(JSON.stringify(beerTypesArray))
      .then(receivedBeerTypes => {
        this.setState({
          beerTypes: receivedBeerTypes
        })
      })
      .catch(err => {
        console.log(err);
      })

      this.setState({
        advClient: receivedAdvClient
      })
    })
  }

  render() {
    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <h1>{this.state.advClient.name}</h1>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={6}>
            <Row className="show-grid">
              <Col xs={12}>
                <p>
                  <h3>
                    <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.address}</b>
                    <br />
                    {this.state.advClient.address.num}, {this.state.advClient.address.street} {this.state.advClient.address.postalCode}
                    <br />
                    {this.state.advClient.address.city}, {this.state.advClient.address.country}
                  </h3>
                </p>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12}>
                <h3>{Locale[localStorage.getItem('LPC_beerTour_locale')].advertisingClient.beerTypes}</h3>
                <ul>
                  {
                    this.state.beerTypes.map(beerType => {
                      return(
                        <li>{beerType.value}</li>
                      )
                    })
                  }
                </ul>
              </Col>
            </Row>
          </Col>
          <Col xs={6} className="text-center">
            <Carousel>
              {
                this.state.advClient.images.map(img => {
                  return(
                    <Carousel.Item>
                      <a href={img.link} target="_blank">
                        <Image width={450} heigth={250} src={img.path} responsive />
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

export default SeeAdvClient;
