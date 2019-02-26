export default class BeerType {

  constructor(beerType) {
    this.id = beerType._id || null;
    this.value = beerType.value || "";

  }

  get id() {
    return this._id;
  }

  get value() {
    return this._value;
  }



  set id(id) {
    this._id = id;
  }

  set value(value) {
    this._value = value;
  }
}
