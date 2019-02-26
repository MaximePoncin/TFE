import User from '../model/User';

static getAuthHeaders() {
  return {"Authorization": localStorage.getItem("LPC_beerTour_token")};
}

static getAll() {
  return fetch("/api/user", {
    method: "GET",
    headers: User.getAuthHeaders()
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
      UsersTab.push(new User(receivedUser))
    })

    return UsersTab;
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static get(id) {
  return fetch("/api/user/" + id, {
    method: "GET",
    headers: User.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error ('An error occured...');
  })
  .then(json => {
    return new User(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static getByMail(mail) {
  return fetch("/api/userByMail/" + mail, {
    method: "GET",
    headers: User.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error ('An error occured...');
  })
  .then(json => {
    console.log(json);
    return new User(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static create(formData) {
  return fetch("/api/user", {
    method: "POST",
    // headers: User.getAuthHeaders(),
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    console.log(json);
    return new User(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static update(id, update) {
  return fetch("/api/user/" + id, {
    method: "PUT",
    headers: User.getAuthHeaders(),
    body: update
  })
  .then(response => {
    if (response.ok) {
      response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new User(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static delete(id) {
  return fetch("/api/user/" + id, {
    method: "DELETE",
    headers: User.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new User(json)
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}
