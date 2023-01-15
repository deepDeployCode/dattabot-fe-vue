import resource from './resource'

const endpoints = {
  auth: {
    login: '/auth/login',
    forgotPassword: '/auth/forgotPassword',
    resetPassword: '/auth/changePassword/noAuth',
  },
  forum: {
    default: '/forum',
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
  forum: {
    getAll(url) {
      return resource.get(url || endpoints.forum.default)
    },
    getById(id) {
      return resource.get(`${endpoints.forum.default}/${id}`)
    },
    addForum(data) {
      return resource.post(endpoints.forum.default, data)
    },
  },
}

export default apis
