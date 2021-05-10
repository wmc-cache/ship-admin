import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'



const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30 * 1000
})



service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)




service.interceptors.response.use(
  response => {
    const res = response.data
    res.data.roles = []
    if (res.data.name == "admin") {
      res.data.roles = ["admin"]
    }
    if (res.data.permissionMenuList) {
      res.data.roles.push("equipment")
    }
    if (res.data.permissionMenuList) {
      res.data.permissionMenuList.forEach(ele => {
        if (ele.select == true) {
          res.data.roles.push(ele.name)
        }

      })
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
