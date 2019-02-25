import React, {Component} from 'react';
import {Panel, Button, Grid, Row, Col} from 'react-bootstrap';

import StayModel from '../../../model/Stay';
import ThemeModel from '../../../model/Theme';
import ActivityModel from '../../../model/Activity';

import Locale from '../../../locale';

class Stay extends Component {
  constructor(props){
    super(props);

    this.state = {
      stay: new StayModel({}),
      theme: new ThemeModel({}),
      activity: [new ActivityModel({})]
    }

    this.handleEdition = this.handleEdition.bind(this);
    this.handleBooking = this.handleBooking.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);
  }

  handleEdition() {
    this.props.handleEdition(this.props.stayToRender.id);
  }

  handleBooking() {
    this.props.handleBookStay(this.props.stayToRender.id);
  }

  handleDeletion() {
    //Deleting stay
    StayModel.delete(this.props.stayToRender.id)
    .then(response => {
      response.images.map(imagePath => {

        const payload = {
          imgLink: imagePath
        };
        //Deleting stay images
        StayModel.deleteImg(JSON.stringify(payload))
        .then(res => {
          if(res) {
            this.props.handleDeletion(response.id);
          }else {
            throw new Error("Error while deleting image");
          }
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

  componentWillMount() {
    this.setState({
      stay: new StayModel(this.props.stayToRender)
    });

    ThemeModel.get(this.props.stayToRender.theme)
    .then(receivedTheme => {
      this.setState({
        theme: receivedTheme
      });
    })
    .catch(err => {
      console.log(err);
    })

    let activitiesIdArray = new Array();

    this.props.stayToRender.activity.map(stayActivity => {
      activitiesIdArray.push(stayActivity)
    })

    const actArr = {
      ids: activitiesIdArray
    };

    ActivityModel.getMany(JSON.stringify(actArr))
    .then(activitiesArray => {
      this.setState({
        activity: activitiesArray
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <li className="list-group-item">
        <Panel bsStyle="info">
          <Panel.Heading>
            <p>
              <b>{this.state.stay.getName(localStorage.getItem("LPC_beerTour_locale"))}</b>
            </p>
            <p>
              <span>{this.state.stay.locality.city} ({this.state.stay.locality.country})</span>
            </p>
          </Panel.Heading>
          <Panel.Body>
            <p>
              <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.theme}: </b>{this.state.theme.getName(localStorage.getItem("LPC_beerTour_locale"))}
            </p>
            <p>
              <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].stay.activities}: </b>
              <ul>
                {
                  this.state.activity.map(act => {
                    return (
                      <li key={Math.random()}> {act.getName(localStorage.getItem("LPC_beerTour_locale"))} </li>
                    )
                    // console.log(act.getName(localStorage.getItem("LPC_beerTour_locale")))
                  })
                }
              </ul>
            </p>
          </Panel.Body>
          <Panel.Footer>
            <Grid fluid>
              <Row className="show-grid">
                <Col xs={4} className="text-center">
                  <Button
                    bsStyle="primary"
                    onClick={this.handleEdition}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].edit}
                  </Button>
                </Col>
                <Col xs={4} className="text-center">
                  <Button
                    bsStyle="primary"
                    onClick={this.handleBooking}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].stay.book}
                  </Button>
                </Col>
                <Col xs={4} className="text-center">
                  <Button
                    bsStyle="danger"
                    onClick={this.handleDeletion}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].delete}
                  </Button>
                </Col>
              </Row>
            </Grid>
          </Panel.Footer>
        </Panel>
      </li>
      // <h1>Stay</h1>
    );
  }
}

export default Stay;
