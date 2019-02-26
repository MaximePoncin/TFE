import person from '../model/Person';

static getAuthHeaders() {
  return {"Authorization": localStorage.getItem("LPC_beerTour_token")};
}

static getAll() {
  return fetch("/api/person", {
    method: "GET",
    headers: Person.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    let PersonsTab = new Array();

    json.map(receivedPerson => {
      PersonsTab.push(new Person(receivedPerson))
    })

    return PersonsTab;
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static get(id) {
  return fetch("/api/person", {
    method: "GET",
    headers: Person.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error ('An error occured...');
  })
  .then(json => {
    return new Person(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static create(formData) {
  return fetch("/api/person", {
    method: "POST",
    headers: Person.getAuthHeaders(),
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new Person(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static update(id, update) {
  return fetch("/api/person", {
    method: "PUT",
    headers: Person.getAuthHeaders(),
    body: update
  })
  .then(response => {
    if (response.ok) {
      response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new Person(json);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}

static delete(id) {
  return fetch("/api/person", {
    method: "DELETE",
    headers: Person.getAuthHeaders()
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('An error occured...');
  })
  .then(json => {
    return new Person(json)
  })
  .catch(err => {
    console.log(err);
    return err;
  });
}
