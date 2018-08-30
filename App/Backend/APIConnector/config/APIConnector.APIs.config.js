module.exports = {
  AuthManager: {
    method: ['POST'],
    uri: 'http://127.0.0.1:8001',
    authPath: '/auth',
    registerPath: '/register',
    personPath: '/person',
    userPath: '/user',
    userByMailPath: '/userByMail',
    salePointPath: '/salePoint'
  },
  BookingManager: {
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    uri: 'http://127.0.0.1:8002',
    boardTypePath: '/boardType',
    bookingPath: '/booking',
    standingPath: '/standing'
  },
  StayManager: {
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    uri: 'http://127.0.0.1:8003',
    stayPath: '/stay',
    activityPath: '/activity',
    themePath: '/theme'
  },
  AdvertisingClientManager: {
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    uri: 'http://127.0.0.1:8004',
    advertisingClientPath: '/advertisingClient'
  },
  BeerTypeManager: {
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    uri: 'http://127.0.0.1:8005',
    beerTypePath: '/beerType'
  },
  MailManager: {
    method: ['POST'],
    uri:'http://127.0.0.1:8006',
    mailPath: '/sendMail'
  }
};
