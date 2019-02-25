import React, {Component} from 'react';
import {Panel, Button, Grid, Row, Col} from 'react-bootstrap';
import _ from 'lodash';

import SalePointModel from '../../../model/SalePoint';
import UserModel from '../../../model/User';

import Locale from '../../../locale';

class SalePoint extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.handleEdition = this.handleEdition.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);
    this.goToUserEdition = this.goToUserEdition.bind(this);
  }

  handleEdition() {
    this.props.handleEdition(this.props.salePointToRender.id);
  }

  handleDeletion() {
    //Deleting salePoint
    SalePointModel.delete(this.props.salePointToRender.id)
    .then(deletedSalePoint => {
      deletedSalePoint.images.map(image => {

        const payload = {
          imgLink: image.path
        };

        //Deleting salePoint images
        SalePointModel.deleteImg(JSON.stringify(payload))
        .then(res => {
          if(res) {
            console.log("Img deleted");
          }else {
            throw new Error("Error while deleting image");
          }
        })
        .catch(err => {
          console.log(err);
        })

        //Deleting salePoint user's account
        UserModel.getAll()
        .then(receivedUsers => {
          console.log(receivedUsers);
          console.log(this.props.salePointToRender.id);
          const salePointUserAccount = _.find(receivedUsers, {'salePoint': this.props.salePointToRender.id})
          console.log(salePointUserAccount);
          //Getting salePoint account
          UserModel.delete(salePointUserAccount.id)
          .then(deletedUser => {
            console.log("salePoint account deleted");
            this.props.handleDeletion(deletedSalePoint.id);
          })
          .catch(err => {
            console.log(err);
          })
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

  goToUserEdition() {
    UserModel.getAll()
    .then(receivedUsers => {
      const salePointUserAccount = _.find(receivedUsers, {'salePoint': this.props.salePointToRender.id});
      this.props.changeElmToRender('editUser', salePointUserAccount.id);
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return(
      <li className="list-group-item">
        <Panel bsStyle="info">
          <Panel.Heading>
            <p>
              <b>
                {this.props.salePointToRender.name}
              </b>
            </p>
          </Panel.Heading>
          <Panel.Body>
            <p>
              <span>
                <b>{Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.address}</b>
                <br />
                {this.props.salePointToRender.address.num}, {this.props.salePointToRender.address.street} {this.props.salePointToRender.address.postalCode}
                <br />
                {this.props.salePointToRender.address.city}, {this.props.salePointToRender.address.country}
              </span>
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
                    onClick={this.goToUserEdition}
                  >
                    {Locale[localStorage.getItem('LPC_beerTour_locale')].salePoint.editAccount}
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
    )
  }
}

export default SalePoint;
