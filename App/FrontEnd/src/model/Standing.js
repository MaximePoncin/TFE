export default class Standing {

  constructor(standing) {
    this.id = standing._id || null;
    this.names = standing.names;

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
    const objName = _.find(this.names, ("lang": lang));

    if(objName) {
      return objName.name;
    } else {
      return "";
    }
  }


  static getAuthHeaders() {
    return {"Authorization": localStorage.getItem("LPC_beerTour_token")};
  }

  static getAll() {
    return fetch("/api/standing", {
      method: "GET",
      headers: Standing.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      let BeerTypesTab = new Array();

      json.map(receivedBeerType => {
        BeerTypesTab.push(new Standing(receivedBeerType))
      })

      return BeerTypesTab;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static get(id) {
    return fetch("/api/standing/" + id, {
      method: "GET",
      headers: Standing.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error ('An error occured...');
    })
    .then(json => {
      return new Standing(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static create(formData) {
    return fetch("/api/standing", {
      method: "POST",
      headers: Standing.getAuthHeaders(),
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Standing(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static update(id, update) {
    return fetch("/api/standing/" + id, {
      method: "PUT",
      headers: Standing.getAuthHeaders(),
      body: update
    })
    .then(response => {
      if (response.ok) {
        response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Standing(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static delete(id) {
    return fetch("/api/standing/" + id, {
      method: "DELETE",
      headers: Standing.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Standing(json)
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }
}
