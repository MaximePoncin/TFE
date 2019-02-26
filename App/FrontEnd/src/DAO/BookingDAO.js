import Booking from '../model/Booking';

static getAuthHeaders() {
  return {"Authorization": localStorage.getItem("LPC_beerTour_token")};
}

static getAll() {
  return fetch("/api/booking", {
    method: "GET",
    headers: Booking.getAuthHeaders()
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
      StaysTab.push(new Booking(receivedStay))
    })

    return StaysTab;
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static get(id) {
  return fetch("/api/booking/" + id, {
    method: "GET",
    headers: Booking.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error ('An error occured...');
  })
  .then(json => {
    return new Booking(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static create(formData) {
  return fetch("/api/booking", {
    method: "POST",
    headers: Booking.getAuthHeaders(),
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    // fetch("api/sendMail", {
    //   method: "POST",
    //   headers: Booking.getAuthHeaders(),
    //   body:
    // })

    return new Booking(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static update(id, update) {
  return fetch("/api/booking/" + id, {
    method: "PUT",
    headers: Booking.getAuthHeaders(),
    body: update
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    console.log(json);

    return new Booking(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static delete(id) {
  return fetch("/api/booking/" + id, {
    method: "DELETE",
    headers: Booking.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new Booking(json)
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}
