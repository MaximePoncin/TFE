import Activity from '../model/Activity';

static getAuthHeaders() {
  return {"Authorization": localStorage.getItem("LPC_beerTour_token")};
}

static getAll() {
  return fetch("/api/activity", {
    method: "GET",
    headers: Activity.getAuthHeaders()
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
      BeerTypesTab.push(new Activity(receivedBeerType))
    })

    return BeerTypesTab;
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static get(id) {
  return fetch("/api/activity/" + id, {
    method: "GET",
    headers: Activity.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error ('An error occured...');
  })
  .then(json => {
    return new Activity(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static getMany(ids) {
  return fetch("/api/activity/getMany", {
    method: "POST",
    headers: Activity.getAuthHeaders(),
    body: ids
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }

    throw new Error ('An error occured ...');
  })
  .then(json => {

    let activitiesTab = new Array();

    json.map(activity => {
      activitiesTab.push(new Activity(activity));
    })

    return activitiesTab;
    // return [];
  })
  .catch(err => {
    return err;
  })
}

static create(formData) {
  return fetch("/api/activity", {
    method: "POST",
    headers: Activity.getAuthHeaders(),
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new Activity(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static update(id, update) {
  return fetch("/api/activity/" + id, {
    method: "PUT",
    headers: Activity.getAuthHeaders(),
    body: update
  })
  .then(response => {
    if (response.ok) {
      response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new Activity(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static delete(id) {
  return fetch("/api/activity/" + id, {
    method: "DELETE",
    headers: Activity.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new Activity(json)
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}
