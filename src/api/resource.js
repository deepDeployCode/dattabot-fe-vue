/* eslint-disable no-param-reassign */
import axios from '@/libs/axios'
import getDataFromStorage from '@/helpers/getDataFromStorage'

function createResource() {
  axios.interceptors.request.use(config => {
    // TODO: intercept request or header request

    const {
      tokenCurrent: token,
    } = getDataFromStorage()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }, error => Promise.reject(error))

  return axios
}

export default createResource()
