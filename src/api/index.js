import resource from './resource'

const endpoints = {
  auth: {
    login: '/auth/login',
    forgotPassword: '/auth/forgotPassword',
    resetPassword: '/auth/changePassword/noAuth',
    register: '/auth/register',
    user: '/auth/user',
  },
  forum: {
    default: '/forum',
    comment: '/forum/comment',
    report: '/forum/report',
    like: '/forum/like',
  },
  tentang: {
    galeri: '/galeri?page=1&filter_rules=[]',
    berkas: '/document?page=1&filter_rules=[]',
  },
  krip: {
    default: '/krip',
    upload: '/krip/upload',
    schedule: '/krip/schedule',
    daftar: '/krip/register',
    cancel: '/krip/cancel',
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
    register(data) {
      return resource.post(endpoints.auth.register, data)
    },
    getUser() {
      return resource.post(endpoints.auth.user)
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
    addComment(id, data) {
      return resource.post(`${endpoints.forum.comment}/${id}`, data)
    },
    editForum(data) {
      return resource.put(endpoints.forum.default, data)
    },
    reportForum(id, data) {
      return resource.post(`${endpoints.forum.report}/${id}`, data)
    },
    likeForum(id) {
      return resource.post(`${endpoints.forum.like}/${id}`)
    },
  },
  tentang: {
    getGalery() {
      return resource.get(endpoints.tentang.galeri)
    },
    getBerkas() {
      return resource.get(endpoints.tentang.berkas)
    },
  },
  krip: {
    getKrip(url = endpoints.krip.default) {
      return resource.get(url)
    },
    upload(data) {
      return resource.post(endpoints.krip.upload, data)
    },
    getSchedule(url = endpoints.krip.schedule) {
      return resource.get(url)
    },
    daftar(data) {
      return resource.post(endpoints.krip.daftar, data)
    },
    batal(id) {
      return resource.post(endpoints.krip.cancel, {
        kripjadwal_id: id,
      })
    },
    deleteBerkas(id) {
      return resource.delete(`/${endpoints.krip.default}/${id}`)
    },
  },
}

export default apis
