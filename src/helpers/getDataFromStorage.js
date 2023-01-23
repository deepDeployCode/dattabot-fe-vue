import storage from './storage'

const USER_STORAGE = 'USER_STORAGE'

const defaultObjOfUser = {
  tokenCurrent: '',
  userId: '',
  userLevel: '',
  email: '',
}

export const setUserStorage = (data = defaultObjOfUser) => {
  storage.setStorage(USER_STORAGE, JSON.stringify(data))
}

export const getUserDataFromStorage = () => {
  try {
    const user = storage.getStorage(USER_STORAGE)
    return user
  } catch (error) {
    return defaultObjOfUser
  }
}

export default getUserDataFromStorage
