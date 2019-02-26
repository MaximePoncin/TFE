import _ from 'lodash';

export default class Activity {

  constructor(activity) {
    this.id = activity._id || null;
    this.descriptions = activity.descriptions;

  }

  get id() {
    return this._id;
  }

  get descriptions() {
    return this._descriptions;
  }

  set id(id) {
    this._id = id;
  }

  set descriptions(descriptions) {
    this._descriptions = descriptions;
  }

  getName(lang) {
    const nameObj = _.find(this.descriptions, {"lang": lang});

    console.log(nameObj)

    if(nameObj) {
      return nameObj.name;
    } else {
      return "";
    }
  }

  getDescr(lang) {
    const descrObj = _.find(this.descriptions, {'lang': lang});

    if(descrObj) {
      return descrObj.descr;
    } else {
      return "";
    }
  }
}
