import _ from 'lodash';

export default class Theme {

  constructor(theme) {
    this.id = theme._id || null;
    this.names = theme.names || new Array({lang: "", name: ""});

  }

  get id() {
    return this._id;
  }

  get names() {
    return this._names;
  }



  set id(id) {
    this._id = id;
  }

  set names(names) {
    this._names = names;
  }

  getName(lang) {
    const nameObj = _.find(this.names, {"lang": lang});

    if(nameObj) {
      return nameObj.name;
    } else {
      return "";
    }
  }



  static getAuthHeaders() {
    return {"Authorization": localStorage.getItem("LPC_beerTour_token")};
  }

  static getAll() {
    return fetch("/api/theme", {
      method: "GET",
      headers: Theme.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      let BeerTypesTab = new Array();

      json.forEach(receivedBeerType => {
        BeerTypesTab.push(new Theme(receivedBeerType))
      })

      return BeerTypesTab;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static get(id) {
    return fetch("/api/theme/" + id, {
      method: "GET",
      headers: Theme.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error ('An error occured...');
    })
    .then(json => {
      return new Theme(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static create(formData) {
    return fetch("/api/theme", {
      method: "POST",
      headers: Theme.getAuthHeaders(),
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Theme(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static update(id, update) {
    return fetch("/api/theme/" + id, {
      method: "PUT",
      headers: Theme.getAuthHeaders(),
      body: update
    })
    .then(response => {
      if (response.ok) {
        response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Theme(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static delete(id) {
    return fetch("/api/theme/" + id, {
      method: "DELETE",
      headers: Theme.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Theme(json)
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }
}
