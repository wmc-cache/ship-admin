import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
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
    if (res.data.name == 'admin') {
      res.data.roles = ['admin']
    }
    if (res.data.permissionMenuList) {

      store.commit("permission/SET_permissionMenuList", res.data.permissionMenuList)
      //console.log("res.data.permissionMenuList", res.data.permissionMenuList, store)

      res.data.roles.push('test')
    }
    if (res.data.permissionMenuList) {
      res.data.permissionMenuList.forEach(ele => {
        if (ele.select == true) {

          res.data.roles.push(ele.name)

        }
        if (ele.children) {
          ele.children.forEach(ele => {
            if (ele.select == true) {

              res.data.roles.push(ele.name)

            }
            if (ele.children) {
              ele.children.forEach(ele => {
                if (ele.select == true) {

                  res.data.roles.push(ele.name)

                }

              })
            }

          })
        }
      })
    }
    const errMsg = res.message || res.msg || '请求失败'
    if (res.code !== 20000) {
      Message({
        message: errMsg,
        type: 'error',
        duration: 5 * 1000
      })
      // if (res.code === -2) {
      //   MessageBox.confirm('您的登录状态已经失效，请重新登录', '登录失效', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(new Error(errMsg))
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
