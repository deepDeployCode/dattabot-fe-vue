import axios from '@/libs/axios'

function createResource() {
  axios.interceptors.request.use(config => {
    // TODO: intercept request or header request

    return config
  }, error => Promise.reject(error))

  return axios
}

export default createResource();
