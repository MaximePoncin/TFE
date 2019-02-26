import BeerType from '../model/BeerType';

static getAuthHeaders() {
  return {"Authorization": localStorage.getItem("LPC_beerTour_token")};
}

static getAll() {
  return fetch("/api/beerType", {
    method: "GET",
    headers: BeerType.getAuthHeaders()
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
      BeerTypesTab.push(new BeerType(receivedBeerType))
    })

    return BeerTypesTab;
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static get(id) {
  return fetch("/api/beerType", {
    method: "GET",
    headers: BeerType.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error ('An error occured...');
  })
  .then(json => {
    return new BeerType(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static create(formData) {
  return fetch("/api/beerType", {
    method: "POST",
    headers: BeerType.getAuthHeaders(),
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new BeerType(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static update(id, update) {
  return fetch("/api/beerType", {
    method: "PUT",
    headers: BeerType.getAuthHeaders(),
    body: update
  })
  .then(response => {
    if (response.ok) {
      response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new BeerType(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static delete(id) {
  return fetch("/api/beerType", {
    method: "DELETE",
    headers: BeerType.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new BeerType(json)
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static getMany(ids) {
  return fetch("api/beerType/getMany", {
    method: "POST",
    headers: BeerType.getAuthHeaders(),
    body: ids
  })
  .then(response => {
    if(response.ok) {
      return response.json()
    }
    throw new Error("An error occured");
  })
  .then(json => {
    let beerTypesArray = new Array();

    json.map(beerType => {
      beerTypesArray.push(new BeerType(beerType))
    })

    return beerTypesArray;
  })
  .catch(err => {
    return err;
  })
}
