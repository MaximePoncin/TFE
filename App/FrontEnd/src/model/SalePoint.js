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

  static getAuthHeaders() {
    return {"Authorization": localStorage.getItem("LPC_beerTour_token")};
  }

  static getAll() {
    return fetch("/api/salePoint", {
      method: "GET",
      headers: SalePoint.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      let SalePointsTab = new Array();

      json.map(receivedSalePoint => {
        SalePointsTab.push(new SalePoint(receivedSalePoint))
      })

      return SalePointsTab;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static get(id) {
    return fetch("/api/salePoint/" + id, {
      method: "GET",
      headers: SalePoint.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error ('An error occured...');
    })
    .then(json => {
      return new SalePoint(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static create(formData) {
    return fetch("/api/salePoint", {
      method: "POST",
      headers: SalePoint.getAuthHeaders(),
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      console.log(new SalePoint(json));
      return new SalePoint(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static update(id, update) {
    return fetch("/api/salePoint/" + id, {
      method: "PUT",
      headers: SalePoint.getAuthHeaders(),
      body: update
    })
    .then(response => {
      if (response.ok) {
        response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new SalePoint(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static delete(id) {
    return fetch("/api/salePoint/" + id, {
      method: "DELETE",
      headers: SalePoint.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new SalePoint(json)
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static addImg(img) {
    return fetch("/upload/salePointImg", {
      method: "POST",
      body: img
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }

      throw new Error('An error occured')
    })
    .then(json => {
      console.log(json);
      return json;
    })
    .catch(err => {
      console.log(err);
      return err;
    })
  }

  static deleteImg(imgPath) {
    return fetch("/deleteImg", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: imgPath
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      throw new Error("Error while deleting an image.");
    })
    .catch(err => {
      console.log(err);
      return err;
    })
  }
}
