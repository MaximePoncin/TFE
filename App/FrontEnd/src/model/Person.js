export default class Person {

  constructor(person) {
    this.id = person._id || null;
    this.surname = person.surname || "";
    this.givenName = person.givenName || "";
    this.birthDate = person.birthDate  || new Date();
  }

  get id() {
    return this._id;
  }

  get surname() {
    return this._surname;
  }

  get givenName() {
    return this._givenName;
  }

  get birthDate() {
    return this._birthDate;
  }



  set id(id) {
    this._id = id;
  }

  set surname(surname) {
    this._surname = surname;
  }

  set givenName(givenName) {
    this._givenName = givenName;
  }

  set birthDate(birthDate) {
    this._birthDate = birthDate;
  }
}
