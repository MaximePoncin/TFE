import _ from 'lodash';

export default class BoardType {

  constructor(boardType) {
    this.id = boardType._id || null;
    this.names = boardType.names;

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
    return fetch("/api/boardType", {
      method: "GET",
      headers: BoardType.getAuthHeaders()
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
        BeerTypesTab.push(new BoardType(receivedBeerType))
      })

      return BeerTypesTab;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static get(id) {
    return fetch("/api/boardType/" + id, {
      method: "GET",
      headers: BoardType.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error ('An error occured...');
    })
    .then(json => {
      return new BoardType(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static create(formData) {
    return fetch("/api/boardType", {
      method: "POST",
      headers: BoardType.getAuthHeaders(),
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new BoardType(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static update(id, update) {
    return fetch("/api/boardType/" + id, {
      method: "PUT",
      headers: BoardType.getAuthHeaders(),
      body: update
    })
    .then(response => {
      if (response.ok) {
        response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new BoardType(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static delete(id) {
    return fetch("/api/boardType/" + id, {
      method: "DELETE",
      headers: BoardType.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new BoardType(json)
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }
}
