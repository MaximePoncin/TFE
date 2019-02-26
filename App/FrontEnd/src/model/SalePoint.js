class Address {
  constructor(address) {
    // console.log(typeof address);
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

export default class SalePoint {
  constructor(salePoint) {
    this.id = salePoint._id || null;
    this.name = salePoint.name || "";
    this.address = salePoint.address || new Address ({});
    this.images = salePoint.images || new Array({path: "", link: ""})
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get user() {
    return this._user;
  }



  set id(id) {
    this._id = id;
  }

  set name(name) {
    this._name = name;
  }

  set user(user) {
    this._user = new User (user);
  }
}
