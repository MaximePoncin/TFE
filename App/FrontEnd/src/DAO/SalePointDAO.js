import SalePoint from '../model/SalePoint';

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
