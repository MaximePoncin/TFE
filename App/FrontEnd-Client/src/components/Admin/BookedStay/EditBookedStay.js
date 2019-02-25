import React, {Component} from 'react';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, HelpBlock} from 'react-bootstrap';
import {DateRangePicker, SingleDatePicker} from 'react-dates';
import DatePicker from 'react-date-picker';
import moment from 'moment';

import 'react-dates/lib/css/_datepicker.css';

import BookedStayModel from '../../../model/Booking';
import StayModel from '../../../model/Stay';
import BoardTypeModel from '../../../model/BoardType';
import StandingModel from '../../../model/Standing';

import Locale from '../../../locale';

class EditBookedStay extends Component {
  constructor(props){
    super(props);
    this.state = {
      stay: new StayModel({}),
      bookedStay: new BookedStayModel({}),
      arrivalDate: moment(),
      departureDate: moment(),
      stayStartDate: moment(),
      stayEndDate: moment(),
      alternativeStayStartDate: moment(),
      alternativeStayEndDate: moment(),
      nbPersons: 1,
      boardType: new BoardTypeModel({}),
      standing: new StandingModel({}),
      // paymentDate: new Date(),
      availableBoardTypes: [new BoardTypeModel({})],
      availableStandings: [new StandingModel({})],
      arrivalDateFocus: false,
      stayStartDateFocus: false,
      alternativeDatesFocus: null,
      paymentDateFocus: false,
      price: 1
    }

    this.checkDatesValidity = this.checkDatesValidity.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.goBackToBookedStays = this.goBackToBookedStays.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.handleChangePaymentDate = this.handleChangePaymentDate.bind(this);
  }

  getPrice() {
    return this.state.stay.startingPrice * this.state.nbPersons
  }

  checkDatesValidity() {
    if(this.state.stayStartDate.isBefore(this.state.arrivalDate)) {
      this.setState({
        stayStartDate: this.state.arrivalDate,
        stayEndDate: moment(this.state.arrivalDate).add(this.state.stay.overnightStay, 'd')
      })
    }

    if(this.state.alternativeStayStartDate.isBefore(this.state.arrivalDate)) {
      this.setState({
        alternativeStayStartDate: this.state.arrivalDate,
        alternativeStayEndDate: moment(this.state.arrivalDate).add(this.state.stay.overnightStay, 'd')
      })
    }

    if(this.state.stayEndDate.isAfter(this.state.departureDate)) {
      this.setState({
        stayEndDate: this.state.departureDate,
        stayStartDate: moment(this.state.departureDate).subtract(this.state.stay.overnightStay, 'd')
      })
    }

    if(this.state.alternativeStayEndDate.isBefore(this.state.departureDate)) {
      this.setState({
        alternativeStayEndDate: this.state.departureDate,
        alternativeStayStartDate: moment(this.state.departureDate).subtract(this.state.stay.overnightStay, 'd')
      })
    }
  }

  componentWillMount() {
    BookedStayModel.get(this.props.concernedBookedStayId)
    .then(receivedBookedStay => {
      this.setState({
        bookedStay: receivedBookedStay,
        arrivalDate: moment(receivedBookedStay.arrivalDate),
        departureDate: moment(receivedBookedStay.departureDate),
        stayStartDate: moment(receivedBookedStay.stayStartDate),
        stayEndDate: moment(receivedBookedStay.stayEndDate),
        alternativeStayStartDate: moment(receivedBookedStay.alternativeStayStartDate),
        alternativeStayEndDate: moment(receivedBookedStay.alternativeStayEndDate),
        nbPersons: receivedBookedStay.nbPersons,
        boardType: receivedBookedStay.boardType,
        standing: receivedBookedStay.standing,
        // paymentDate: moment(receivedBookedStay.paymentDate).toDate()
      })
      StayModel.get(receivedBookedStay.stayId)
      .then(receivedStay => {
        this.setState({
          stay: receivedStay
        })
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })

    BoardTypeModel.getAll()
    .then(receivedBoardTypes => {
      this.setState({
        availableBoardTypes: receivedBoardTypes
      })
    })
    .catch(err => {
      console.log(err);
    })

    StandingModel.getAll()
    .then(receivedStandings => {
      this.setState({
        availableStandings: receivedStandings
      })
    })
  }

  handleUserInput(e) {
    const name = e.target.name,
          value = e.target.value;

    console.log(name + ": " + JSON.stringify(value));

    this.setState({
      [name]: value
    });
  }

  goBackToBookedStays(){
    this.props.changeElmToRender("bookedStays")
  }

  handleChangePaymentDate(date) {
    console.log(date);

    this.setState({
      paymentDate: date
    })
  }

  handleSubmit(e){

      let book = {
        arrivalDate: this.state.arrivalDate.toDate(),
        departureDate: this.state.departureDate.toDate(),
        stayStartDate: this.state.stayStartDate.toDate(),
        stayEndDate: this.state.stayEndDate.toDate(),
        alternativeStayStartDate: this.state.alternativeStayStartDate.toDate(),
        alternativeStayEndDate: this.state.alternativeStayEndDate.toDate(),
        nbPersons: Number(this.state.nbPersons),
        bookingDate: moment(this.state.bookedStay.bookingDate).toDate(),
        price: this.getPrice(),
        boardType: this.state.boardType,
        standing: this.state.standing,
        stayId: this.state.bookedStay.stayId,
        userMail: this.state.bookedStay.userMail,
        // paymentDate: this.state.paymentDate
      }

      // if(this.state.paymentDate) {
      //   book.paymentDate = this.state.paymentDate
      // }

      console.log(JSON.stringify(book));

      BookedStayModel.update(this.props.concernedBookedStayId, JSON.stringify(book))
      .then(editedBookedStay => {
        console.log(editedBookedStay);
        // editedBookedStay.getSummary(localStorage.getItem("LPC_beerTour_locale"))
        // .then(receivedSummary => {
        //   console.log(receivedSummary);

          // const payload = {
          //   destMail: JSON.parse(localStorage.getItem("LPC_beerTour_user")).userMail,
          //   subject: Locale.mail.bookedStay.subject,
          //   text: (
          //     Locale.mail.bookedStay.text.intro +
          //     receivedSummary +
          //     Locale.mail.bookedStay.text.outro
          //   )
          // }
      //
      //     fetch('/sendEmail', {
      //       method: "POST",
      //       headers: {"Content-type": "application/json"},
      //       body: JSON.stringify(payload)
      //     })
      //     .then(res => {
      //       console.log("mail sent");
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     })
      //
      //     this.goBackToBookedStays();
        // })
        // .catch(err => {
        //   console.log(err);
        // })


      })
      .catch(err => {
        console.log(err);
      })
    // }

    e.preventDefault();
  }

  render() {
    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <h1>{Locale[localStorage.getItem('LPC_beerTour_locale')].booking.editBookedStay}</h1>
          </Col>
        </Row>
        <form onSubmit={this.handleSubmit} className="sm">
          <Row className="show-grid">
            <Col xs={3}>
              <FormGroup
                bsSize="sm"
              >
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].booking.stayStartDate}</ControlLabel>
                <br />
                <SingleDatePicker
                  date={this.state.stayStartDate} // momentPropTypes.momentObj or null
                  onDateChange={date => this.setState({ stayStartDate: date, stayEndDate: moment(date).add(this.state.stay.overnightStay, 'd') })} // PropTypes.func.isRequired
                  focused={this.state.stayStartDateFocus} // PropTypes.bool
                  onFocusChange={({ focused }) => this.setState({ stayStartDateFocus: focused }, () => this.checkDatesValidity())} // PropTypes.func.isRequired
                  id="stayStartDate" // PropTypes.string.isRequired,
                  required
                />
              </FormGroup>
            </Col>

            <Col xs={3}>
              <FormGroup
                bsSize="sm"
              >
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].booking.stayEndDate}</ControlLabel>
                <br />
                <SingleDatePicker
                  date={this.state.stayEndDate} // momentPropTypes.momentObj or null
                  onDateChange={date => {}} // PropTypes.func.isRequired
                  focused={null} // PropTypes.bool
                  onFocusChange={({ focused }) => {}} // PropTypes.func.isRequired
                  id="stayEndDate" // PropTypes.string.isRequired,
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={3}>
              <FormGroup
                bsSize="sm"
              >
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].booking.alternativeStayStartDate}</ControlLabel>
                <br />
                <SingleDatePicker
                  date={this.state.alternativeStayStartDate} // momentPropTypes.momentObj or null
                  onDateChange={date => this.setState({ alternativeStayStartDate: date, alternativeStayEndDate: moment(date).add(this.state.stay.overnightStay, 'd')} , () => this.checkDatesValidity())} // PropTypes.func.isRequired
                  focused={this.state.alternativeStayStartDateFocus} // PropTypes.bool
                  onFocusChange={({ focused }) => this.setState({ alternativeStayStartDateFocus: focused })} // PropTypes.func.isRequired
                  id="alternativeStayStartDate" // PropTypes.string.isRequired,
                  required
                />
              </FormGroup>
            </Col>
            <Col xs={3}>
              <FormGroup
                bsSize="sm"
              >
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].booking.alternativeStayEndDate}</ControlLabel>
                <br />
                <SingleDatePicker
                  date={this.state.alternativeStayEndDate} // momentPropTypes.momentObj or null
                  onDateChange={date => {}} // PropTypes.func.isRequired
                  focused={null} // PropTypes.bool
                  onFocusChange={({ focused }) => {}} // PropTypes.func.isRequired
                  id="alternativeStayEndDate" // PropTypes.string.isRequired,
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={6}>
              <FormGroup
                bsSize="sm"
              >
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].booking.arrivalDepartureDates}</ControlLabel>
                <br />
                <DateRangePicker
                  startDate={this.state.arrivalDate} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDate={this.state.departureDate} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) => this.setState({ arrivalDate: startDate, departureDate: endDate }, () => this.checkDatesValidity())} // PropTypes.func.isRequired,
                  focusedInput={this.state.alternativeDatesFocus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={focusedInput => this.setState({ alternativeDatesFocus: focusedInput })} // PropTypes.func.isRequired,
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Row className="show-grid">
            <Col xs={5}>
              <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].booking.chooseBoardType}</ControlLabel>
              <FormControl
                  componentClass="select"
                  name="boardType"
                  value={this.state.boardType}
                  onChange={this.handleUserInput}
                >
                  {
                    this.state.availableBoardTypes.map(boardType => {
                      return <option key={boardType.id} value={boardType.id}>{boardType.getName(localStorage.getItem("LPC_beerTour_locale"))}</option>
                    })
                  }
                </FormControl>

            </Col>
          </Row>
          <br />
          <Row className="show-grid">
            <Col xs={5}>
              <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].booking.chooseStanding}</ControlLabel>
              <FormControl
                  componentClass="select"
                  name="standing"
                  value={this.state.standing}
                  onChange={this.handleUserInput}
                >
                  {
                    this.state.availableStandings.map(standing => {
                      return <option key={standing.id} value={standing.id}>{standing.getName(localStorage.getItem("LPC_beerTour_locale"))}</option>
                    })
                  }
                </FormControl>

            </Col>
          </Row>
          <br />
          <Row className="show-grid">
            <Col xs={3}>
              <FormGroup
                bsSize="sm"
              >
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].booking.nbPersons}</ControlLabel>
                <br />
                <FormControl
                    name="nbPersons"
                    type="number"
                    min="1"
                    value={this.state.nbPersons}
                    placeholder="1"
                    onChange={this.handleUserInput}
                    required
                  />
              </FormGroup>
            </Col>
          </Row>

          <br />
          <Row className="show-grid">
            <Col xs={3}>
              <FormGroup
                bsSize="lg"
              >
                <ControlLabel>{Locale[localStorage.getItem('LPC_beerTour_locale')].booking.price}</ControlLabel>
                <h3>+/- {this.getPrice()} €</h3>
              </FormGroup>
            </Col>
          </Row>

          {/* <Row className="show-grid">
            <Col xs={3}>
              <DatePicker
                value={this.state.paymentDate}
                onChange={this.handleChangePaymentDate}
                name="paymentDate"
                maxDate={new Date()}
              />
            </Col>
          </Row> */}
          <Row className="show-grid">
            <Col xs={2}>
              <Button
                bsStyle="primary"
                type="submit"
              >
                {Locale[localStorage.getItem('LPC_beerTour_locale')].booking.bookStay}
              </Button>
            </Col>
            <Col xs={2} xsOffset={1}>
              <Button
                bsStyle="primary"
                type="button"
                onClick={this.goBackToBookedStays}
              >
                {Locale[localStorage.getItem('LPC_beerTour_locale')].cancel}
              </Button>
            </Col>
          </Row>
        </form>
      </Grid>
    )
  }
}

export default EditBookedStay;
