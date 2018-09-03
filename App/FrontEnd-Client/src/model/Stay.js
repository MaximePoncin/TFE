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


  static getAuthHeaders() {
    return {
      // "content-type": application/json; charset=utf-8,
      "Authorization": localStorage.getItem("LPC_beerTour_token")
    };
  }

  static getAll() {
    return fetch("/api/stay", {
      method: "GET",
      headers: Stay.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      let StaysTab = new Array();

      json.map(receivedStay => {
        StaysTab.push(new Stay(receivedStay))
        // console.log(new Stay(receivedStay));
      })

      return StaysTab;
      // return [];
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static get(id) {
    return fetch("/api/stay/" + id, {
      method: "GET",
      headers: Stay.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error ('An error occured...');
    })
    .then(json => {

      return new Stay(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static create(formData) {
    return fetch("/api/stay", {
      method: "POST",
      headers: Stay.getAuthHeaders(),
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Stay(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static update(id, update) {
    return fetch("/api/stay/" + id, {
      method: "PUT",
      headers: Stay.getAuthHeaders(),
      body: update
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Stay(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static delete(id) {
    return fetch("/api/stay/" + id, {
      method: "DELETE",
      headers: Stay.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Stay(json)
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static addImg(img) {
    return fetch("/upload/stayImg", {
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
