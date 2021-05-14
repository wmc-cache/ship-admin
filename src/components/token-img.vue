<template>
  <img ref="img">
</template>
<script>
import { getToken } from '../utils/auth'
export default {
  name: 'AuthImg',
  props: {
    authSrc: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted() {
    const token = `Bearer ${getToken()}`
    Object.defineProperty(Image.prototype, 'authsrc', {
      writable: true,
      enumerable: true,
      configurable: true
    })
    const img = this.$refs.img
    const request = new XMLHttpRequest()
    request.responseType = 'blob'
    request.open('get', this.authSrc, true)
    request.setRequestHeader('Authorization', token)
    request.onreadystatechange = e => {
      if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
       img.src = URL.createObjectURL(request.response)
        img.onload = () => {
          URL.revokeObjectURL(img.src)
        }
      }
    }
    request.send(null)
  }
}
</script>

