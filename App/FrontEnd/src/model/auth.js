export default class Auth {
  static authenticate(userId, userPasswd) {
    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("userPasswd", userPasswd);

    return fetch("/api/auth", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if(!response.ok) {
        console.log('Erreur de connexion');
      }

      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(err => {
      console.log('Err: ' + err);
      return err;
    })
  }
}
