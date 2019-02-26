import _ from 'lodash';

export default class Stay {

  constructor(stay) {
    this.id = stay._id || null;
    this.names = stay.names || [{lang: "", name: ""}];
    this.overnightStay = stay.overnightStay || -1;
    this.activity = stay.activity || "";
    this.theme = stay.theme || "";
    this.startingPrice = stay.startingPrice || 0;
    this.available = stay.available || false;
    this.locality = stay.locality || {city: "", country: ""};
    this.images = stay.images || new Array;
  }

  get id() {
    return this._id;
  }

  get names() {
    return this._names;
  }

  get overnightStay() {
    return this._overnightStay;
  }

  get activity() {
    return this._activity;
  }

  get theme() {
    return this._theme;
  }

  get startingPrice() {
    return this._startingPrice;
  }

  get available() {
    return this._available;
  }

  get locality() {
    return this._locality;
  }



  set id(id) {
    this._id = id;
  }

  set names(names) {
    this._names = names;
  }

  set overnightStay(overnightStay) {
    this._overnightStay = overnightStay;
  }

  set activity(activity) {
    this._activity = activity;
  }

  set theme(theme) {
    this._theme = theme;
  }

  set startingPrice(startingPrice) {
    this._startingPrice = startingPrice;
  }

  set available(available) {
    this._available = available;
  }

  set locality(locality) {
    this._locality = locality;
  }


  getName(lang) {
    const nameObj = _.find(this.names, ("lang": lang));
    if(nameObj) {
      return nameObj.name;
    } else {
      return "";
    }
  }
}
