import moment from 'moment';

import StayModel from './Stay';
import ActivityModel from './Activity';
import ThemeModel from './Theme';
import BoardTypeModel from './BoardType';
import StandingModel from './Standing';

import Locale from '../locale';

const format = "DD / MM / YY";

export default class Booking {

  constructor(booking) {
    this.id = booking._id || null;
    this.arrivalDate = booking.arrivalDate || new Date();
    this.departureDate = booking.departureDate || new Date();
    this.stayStartDate = booking.stayStartDate || new Date();
    this.stayEndDate = booking.stayEndDate || new Date();
    this.alternativeStayStartDate = booking.alternativeStayStartDate || new Date();
    this.alternativeStayEndDate = booking.alternativeStayEndDate || new Date();
    this.nbPersons = booking.nbPersons || 1;
    this.bookingDate = booking.bookingDate || new Date();
    this.paymentDate = booking.paymentDate || null;
    this.price = booking.price || 1;
    this.boardType = booking.boardType || "";
    this.standing = booking.standing || "";
    this.stayId = booking.stayId || "";
    this.userMail = booking.userMail || "";
  }

  get id() {
    return this._id;
  }

  get arrivalDate() {
    return this._arrivalDate;
  }

  get departureDate() {
    return this._departureDate;
  }

  get stayStartDate() {
    return this._stayStartDate;
  }

  get stayEndDate() {
    return this._stayEndDate;
  }

  get alternativeStayStartDate() {
    return this._alternativeStayStartDate;
  }

  get alternativeStayEndDate() {
    return this._alternativeStayEndDate;
  }

  get nbPersons() {
    return this._nbPersons;
  }

  get bookingDate() {
    return this._bookingDate;
  }

  get paymentDate() {
    return this._paymentDate;
  }

  get price() {
    return this._price;
  }

  get boardType() {
    return this._boardType;
  }

  get standing() {
    return this._standing;
  }

  get stayId() {
    return this._stayId;
  }

  get userMail() {
    return this._userMail;
  }



  set id(id) {
    this._id = id;
  }

  set arrivalDate(arrivalDate) {
    this._arrivalDate = arrivalDate;
  }

  set departureDate(departureDate) {
    this._departureDate = departureDate;
  }

  set stayStartDate(stayStartDate) {
    this._stayStartDate = stayStartDate;
  }

  set stayEndDate(stayEndDate) {
    this._stayEndDate = stayEndDate;
  }

  set alternativeStayStartDate(alternativeStayStartDate) {
    this._alternativeStayStartDate = alternativeStayStartDate;
  }

  set alternativeStayEndDate(alternativeStayEndDate) {
    this._alternativeStayEndDate = alternativeStayEndDate;
  }

  set nbPersons(nbPersons) {
    this._nbPersons = nbPersons;
  }

  set bookingDate(bookingDate) {
    this._bookingDate = bookingDate;
  }

  set paymentDate(paymentDate) {
    this._paymentDate = paymentDate;
  }

  set price(price) {
    this._price = price;
  }

  set boardType(boardType) {
    this._boardType = boardType;
  }

  set standing(standing) {
    this._standing = standing;
  }

  set stayId(stayId) {
    this._stayId = stayId;
  }

  set userMail(userMail) {
    this._userMail = userMail;
  }

  getSummary(lang) {
    let stay, activities = "", theme = "", boardType = "", standing = "";

    return StayModel.get(this.stayId)
    .then(receivedStay => {
      stay = receivedStay;

       return ActivityModel.getMany(JSON.stringify({ids: stay.activity}))
      .then(receivedActivities => {
        receivedActivities.map(acti => {
          activities += (acti.getName(lang) + "\n");
        });

         return ThemeModel.get(stay.theme)
        .then(receivedTheme => {
          theme = receivedTheme.getName(lang);

           return BoardTypeModel.get(this.boardType)
          .then(receivedBoardType => {
            boardType = receivedBoardType.getName(lang);
            console.log(receivedBoardType);

            return StandingModel.get(this.standing)
            .then(receivedStanding => {
              standing = receivedStanding.getName(lang);
              console.log(receivedStanding);

              const bookedStaySummary = (
                Locale.stay.stay + ": " + stay.getName(lang) + "\n" +
                Locale.stay.theme + ": " + theme + "\n" +
                Locale.stay.activities + ": " + activities + "\n" +
                stay.locality.city + " (" + stay.locality.country + ")" + "\n\n\n" +
                Locale.booking.arrivalDepartureDates + ": " + moment(this.arrivalDate).format(format) + " => " + moment(this.departureDate).format(format) + "\n" +
                Locale.booking.stayStartDate + ": " + moment(this.stayStartDate).format(format) + "\n" +
                Locale.booking.stayEndDate + ": " + moment(this.stayEndDate).format(format) + "\n" +
                Locale.booking.alternativeStayStartDate + ": " + moment(this.alternativeStayStartDate).format(format) + "\n" +
                Locale.booking.alternativeStayEndDate + ": " + moment(this.alternativeStayEndDate).format(format) + "\n" +
                Locale.booking.boardType + ": " + boardType + "\n" +
                Locale.booking.standingType + ": " + standing + "\n" +
                Locale.booking.nbPersons + ": " + this.nbPersons + "\n"
              )

              return bookedStaySummary;
            })
            .catch(err => {
              console.log(err);
              return err;
            })
          })
          .catch(err => {
            console.log(err);
            return err;
          })
        })
        .catch(err => {
          console.log(err);
          return err;
        })
      })
      .catch(err => {
        console.log(err);
        return err;
      })
    })
    .catch(err => {
      console.log(err);
      return err;
    })
  }
}
