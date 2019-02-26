import _ from 'lodash';

export default class Theme {

  constructor(theme) {
    this.id = theme._id || null;
    this.names = theme.names || new Array({lang: "", name: ""});

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
    const nameObj = _.find(this.names, {"lang": lang});

    if(nameObj) {
      return nameObj.name;
    } else {
      return "";
    }
  }
}
