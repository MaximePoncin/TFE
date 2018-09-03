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



  static getAuthHeaders() {
    return {"Authorization": localStorage.getItem("LPC_beerTour_token")};
  }

  static getAll() {
    return fetch("/api/advertisingClient", {
      method: "GET",
      headers: AdvertisingClient.getAuthHeaders()
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
        UsersTab.push(new AdvertisingClient(receivedUser))
      })

      return UsersTab;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static get(id) {
    return fetch("/api/advertisingClient/" + id, {
      method: "GET",
      headers: AdvertisingClient.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error ('An error occured...');
    })
    .then(json => {
      return new AdvertisingClient(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static create(formData) {
    return fetch("/api/advertisingClient", {
      method: "POST",
      headers: AdvertisingClient.getAuthHeaders(),
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new AdvertisingClient(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static update(id, update) {
    return fetch("/api/advertisingClient/" + id, {
      method: "PUT",
      headers: AdvertisingClient.getAuthHeaders(),
      body: update
    })
    .then(response => {
      if (response.ok) {
        response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new AdvertisingClient(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static delete(id) {
    return fetch("/api/advertisingClient/" + id, {
      method: "DELETE",
      headers: AdvertisingClient.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new AdvertisingClient(json)
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static addImg(img) {
    return fetch("/upload/advClientImg", {
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
