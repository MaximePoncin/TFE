import React, {Component} from 'react';
import {Panel, Button, Grid, Row, Col, Carousel, Image} from 'react-bootstrap';

import ThemeModel from '../../../model/Theme';
import ActivityModel from '../../../model/Activity';

import Locale from '../../../locale';

class DisplayedStay extends Component {
  constructor(props){
    super(props);

    this.state = {
      theme: new ThemeModel({}),
      activities: new Array (new ActivityModel({}))
    }

    this.seeDetailedStay = this.seeDetailedStay.bind(this);
  }

  componentWillMount() {
    ThemeModel.get(this.props.stay.theme)
    .then(receivedTheme => {
      this.setState({
        theme: receivedTheme
      })
    })
    .catch(err => {
      console.log(err);
    })

    ActivityModel.getMany(JSON.stringify({ids: this.props.stay.activity}))
    .then(receivedActivities => {
      this.setState({
        activities: receivedActivities
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  seeDetailedStay() {
    this.props.changeElmToRender("detailedStay", this.props.stay.id)
  }

  render() {
    return(
      <li className="list-group-item">
        <Panel bsStyle="info">
          <Panel.Heading>
            <b>{this.props.stay.getName(localStorage.getItem("LPC_beerTour_locale"))}</b>
            <br />
            <b>{this.props.stay.locality.city } ({this.props.stay.locality.country})</b>
          </Panel.Heading>
          <Panel.Body>
            <Grid fluid>
              <Row className="show-grid">
                <Col xs={4}>
                  <ul>
                    <li>
                      <span>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.overnight}: {this.props.stay.overnightStay}</span>
                    </li>
                    <li>
                      <span>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.theme}: {this.state.theme.getName(localStorage.getItem("LPC_beerTour_locale"))}</span>
                    </li>
                    <li>
                      <ul>
                        <span>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.activities}</span>
                        {
                          this.state.activities.map(activity => {
                            return(
                              <li>{activity.getName(localStorage.getItem("LPC_beerTour_locale"))}</li>
                            )
                          })
                        }
                      </ul>
                    </li>
                    <li>
                      <span>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.startingPrice}: {this.props.stay.startingPrice}€ / person</span>
                    </li>
                  </ul>
                </Col>
                <Col xs={8}>
                  <Carousel>
                    {
                      this.props.stay.images.map(img => {
                        return(
                          <Carousel.Item>
                            <Image width={450} height={250} src={img} responsive />
                          </Carousel.Item>
                        )
                      })
                    }
                  </Carousel>
                </Col>
              </Row>
            </Grid>
          </Panel.Body>
          <Panel.Footer>
            <Button
              bsStyle="primary"
              onClick={this.seeDetailedStay}
            >
              Get details
            </Button>
          </Panel.Footer>
        </Panel>
      </li>
    )
  }
}

export default DisplayedStay;
