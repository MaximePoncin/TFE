import AdvertisingClient from '../model/AdvertisingClient';

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
