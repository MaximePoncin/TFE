export default class BoardType {

  constructor(boardType) {
    this.id = boardType._id || null;
    this.names = boardType.names;

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
