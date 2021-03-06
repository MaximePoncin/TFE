import Person from './Person';

class Address {
  constructor(address) {
    // console.log(typeof address);
    this.street = address.street;
    this.num = address.num;
    this.postalCode = address.postalCode;
    this.country = address.country;
    this.city = address.city;
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

export default class User {
  constructor(user) {
    this.id = user._id || null;
    this.mail = user.mail || "";
    this.phoneNumber = user.phoneNumber || "";
    this.password = user.password || "";
    this.role = user.role || "";
    this.address = user.address || new Address({});
    this.person = user.person || new Person({});
    this.salePoint = user.salePoint || "";
  }

  get id() {
    return this._id;
  }

  get mail() {
    return this._mail;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  get password() {
    return this._password;
  }

  get user() {
    return this._user;
  }

  get admin() {
    return this._admin;
  }

  get superAdmin() {
    return this._superAdmin;
  }

  get address() {
    return this._address;
  }

  get person() {
    return this._person;
  }

  get salePoint() {
    return this._salePoint;
  }



  set id(id) {
    this._id = id;
  }

  set mail(mail) {
    this._mail = mail;
  }

  set phoneNumber(phoneNumber) {
    this._phoneNumber = phoneNumber;
  }

  set password(password) {
    this._password = password;
  }

  set user(user) {
    this._user = user;
  }

  set admin(admin) {
    this._admin = admin;
  }

  set superAdmin(superAdmin) {
    this._superAdmin = superAdmin;
  }

  set address(address) {
    this._address = address;
  }

  set person(person) {
    this._person = person;
  }

  set salePoint(salePoint) {
    this._salePoint = salePoint;
  }


  static getAuthHeaders() {
    return {"Authorization": localStorage.getItem("LPC_beerTour_token")};
  }

  static getAll() {
    return fetch("/api/user", {
      method: "GET",
      headers: User.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      let UsersTab = new Array();

      json.map(receivedUser => {
        UsersTab.push(new User(receivedUser))
      })

      return UsersTab;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static get(id) {
    return fetch("/api/user/" + id, {
      method: "GET",
      headers: User.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error ('An error occured...');
    })
    .then(json => {
      return new User(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static getByMail(mail) {
    return fetch("/api/userByMail/" + mail, {
      method: "GET",
      headers: User.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error ('An error occured...');
    })
    .then(json => {
      console.log(json);
      return new User(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static create(formData) {
    return fetch("/api/user", {
      method: "POST",
      // headers: User.getAuthHeaders(),
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      console.log(json);
      return new User(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static update(id, update) {
    return fetch("/api/user/" + id, {
      method: "PUT",
      headers: User.getAuthHeaders(),
      body: update
    })
    .then(response => {
      if (response.ok) {
        response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new User(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static delete(id) {
    return fetch("/api/user/" + id, {
      method: "DELETE",
      headers: User.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new User(json)
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }
}
