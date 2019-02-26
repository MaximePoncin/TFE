export default class Standing {

  constructor(standing) {
    this.id = standing._id || null;
    this.names = standing.names;

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
}
