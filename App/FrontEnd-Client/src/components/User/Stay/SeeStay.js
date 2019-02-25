import React, {Component} from 'react';
import {Panel, Well, Grid, Row, Col, Carousel, Image, Button} from 'react-bootstrap';

import StayModel from '../../../model/Stay';
import ThemeModel from '../../../model/Theme';
import ActivityModel from '../../../model/Activity';

import Locale from '../../../locale';

class SeeStay extends Component {
  constructor(props){
    super(props);

    this.state = {
      stay: new StayModel({}),
      theme: new ThemeModel({}),
      activities: new Array(new ActivityModel({}))
    }

    this.bookStay = this.bookStay.bind(this);
  }

  bookStay() {
    if(!localStorage.getItem("LPC_beerTour_user")) {
      this.props.changeElmToRender("registration")
    } else {
      this.props.changeElmToRender("bookStay", this.state.stay.id)
    }
  }

  componentWillMount() {
    StayModel.get(this.props.stayId)
    .then(stay => {
      this.setState({
        stay: stay
      })

      ThemeModel.get(stay.theme)
      .then(receivedTheme => {
        this.setState({
          theme: receivedTheme
        })
      })
      .catch(err => {
        console.log(err);
      })

      ActivityModel.getMany(JSON.stringify({ids: stay.activity}))
      .then(receivedActivities => {
        this.setState({
          activities: receivedActivities
        })
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return(
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={12}>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <h1>{this.state.stay.getName(localStorage.getItem("LPC_beerTour_locale"))}</h1>
                <h3>
                  {this.state.stay.locality.city}
                  <br />
                  {this.state.stay.locality.country}
                </h3>
              </Panel.Heading>
              <Panel.Body>
                <Grid fluid>
                  <Row className="show-grid">
                    <Col xs={4}>
                      <h4>
                        {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.activities}
                      </h4>
                      <ul>
                        {
                          this.state.activities.map(act => {
                            return (
                              <React.Fragment>
                                <li>{act.getName(localStorage.getItem("LPC_beerTour_locale"))}</li>
                                <ul>
                                  <li>{act.getDescr(localStorage.getItem("LPC_beerTour_locale"))}</li>
                                </ul>
                              </React.Fragment>
                            )
                          })
                        }
                      </ul>
                    </Col>
                    <Col xs={8}>
                      <Carousel>
                        {
                          this.state.stay.images.map(img => {
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
                <Grid fluid>
                  <Row className="show-grid">
                    <Col xs={12}>
                      <Button
                        bsStyle="primary"
                        onClick={this.bookStay}
                      >
                        {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.book}
                      </Button>
                    </Col>
                  </Row>
                </Grid>
              </Panel.Footer>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SeeStay;
