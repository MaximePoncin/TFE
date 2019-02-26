class Address {
  constructor(address) {
    this.street = address.street || "";
    this.num = address.num || "";
    this.postalCode = address.postalCode || "";
    this.country = address.country || "";
    this.city = address.city || "";
  }

  get street() {
    return this._street;
  }

  get num() {
    return this._num;
  }

  get postalCode() {
    return this._postalCode;
  }

  get country() {
    return this._country;
  }

  get city() {
    return this._city;
  }



  set street(street) {
    this._street = street;
  }

  set num(num) {
    this._num = num;
  }

  set postalCode(postalCode) {
    this._postalCode = postalCode;
  }

  set country(country) {
    this._country = country;
  }

  set city(city) {
    this._city = city;
  }
};

export default class AdvertisingClient {
  constructor(advClient) {
    this.id = advClient._id || null;
    this.mail = advClient.mail || "";
    this.name = advClient.name || "";
    this.url = advClient.url || "";
    this.beerTypes = advClient.beerTypes || [""];
    this.address = advClient.address || new Address({});
    this.images = advClient.images || [{path: "", link:""}]
  }

  get id() {
    return this._id;
  }

  get mail() {
    return this._mail;
  }

  get name() {
    return this._name;
  }

  get url() {
    return this._url;
  }

  get beerTypes() {
    return this._beerTypes;
  }

  get address() {
    return this._address;
  }

  get images() {
    return this._images;
  }



  set id(id) {
    this._id = id;
  }

  set mail(mail) {
    this._mail = mail;
  }

  set name(name) {
    this._name = name;
  }

  set url(url) {
    this._url = url;
  }

  set beerTypes(beerTypes) {
    this._beerTypes = beerTypes;
  }

  set address(address) {
    this._address = address;
  }

  set images(images) {
    this._images = images;
  }
}
