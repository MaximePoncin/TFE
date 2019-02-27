import Auth from '../DAO/auth';
import jwt from 'jsonwebtoken';

export default class authCtrl {
  constructor($rootScope, $scope, $sce) {
    let setUserInfo = (token) => {
      jwt.verify(token, require('../../config/token.pass').secret, (err, decodedToken) => {
        if(err) {
          console.log(err);
          return;
        }
        $scope.userDisplayedName = $sce.trustAsHtml(decodedToken.userName.firstName + " " + decodedToken.userName.lastName);
        $scope.userRole = $sce.trustAsHtml(decodedToken.scope[0]);
      })
    }

    let token = localStorage.getItem("LPC_beerTour_token");

    if(!token) {
      $rootScope.isConnected = false;
    } else {
      $rootScope.isConnected = true;
      setUserInfo(token);
    }

    $scope.auth = function(userId, userPasswd) {
      Auth.authenticate(userId, userPasswd)
        .then(connected => {
          $scope.$apply(() => {
            console.log(connected);
            localStorage.setItem("LPC_beerTour_token", connected.token);
            $rootScope.isConnected = true;
            setUserInfo(connected.token);
          })
        })
        .catch(err => {
          console.log(err);
        })
    }

    $scope.deco = function() {
      localStorage.removeItem("LPC_beerTour_token");
      $rootScope.isConnected = false;
      $scope.userId = "";
      $scope.userRole = "";
    }
  }
}

authCtrl.$inject = ["$rootScope", "$scope", "$sce"];
