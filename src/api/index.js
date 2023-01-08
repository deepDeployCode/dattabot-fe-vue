import resource from './resource'

const endpoints = {
  auth: {
    login: '/auth/login',
    forgotPassword: '/auth/forgotPassword',
    resetPassword: '/auth/changePassword/noAuth',
  },
}

const apis = {
  auth: {
    login(data) {
      return resource.post(endpoints.auth.login, data)
    },
    forgotPassword(data) {
      return resource.post(endpoints.auth.forgotPassword, data)
    },
    resetPassword(data) {
      return resource.post(endpoints.auth.resetPassword, data)
    },
  },
}

export default apis
