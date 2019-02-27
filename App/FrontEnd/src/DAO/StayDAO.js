import Stay from '../model/Stay';

export default class StayDAO {
  static getAuthHeaders() {
    return {
      // "content-type": application/json; charset=utf-8,
      "Authorization": localStorage.getItem("LPC_beerTour_token")
    };
  }

  static getAll() {
    return fetch("/api/stay", {
      method: "GET",
      headers: StayDAO.getAuthHeaders()
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
        StaysTab.push(new Stay(receivedStay))
        // console.log(new Stay(receivedStay));
      })

      return StaysTab;
      // return [];
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static get(id) {
    return fetch("/api/stay/" + id, {
      method: "GET",
      headers: StayDAO.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error ('An error occured...');
    })
    .then(json => {

      return new Stay(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static create(formData) {
    return fetch("/api/stay", {
      method: "POST",
      headers: StayDAO.getAuthHeaders(),
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Stay(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static update(id, update) {
    return fetch("/api/stay/" + id, {
      method: "PUT",
      headers: StayDAO.getAuthHeaders(),
      body: update
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Stay(json);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static delete(id) {
    return fetch("/api/stay/" + id, {
      method: "DELETE",
      headers: StayDAO.getAuthHeaders()
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('An error occured...');
    })
    .then(json => {
      return new Stay(json)
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  static addImg(img) {
    return fetch("/upload/stayImg", {
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

}
