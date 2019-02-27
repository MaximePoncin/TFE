import authCtrl from '../controllers/authCtrl'

let moduleName = angular
      .module("authModule", [])
      .controller("authCtrl", authCtrl)
      .name;

export default moduleName;
