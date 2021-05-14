<template>
  <img ref="img" /> 
</template>
<script>
import {getToken}  from "../utils/auth"
export default {
  name: "authImg",
  props: {
    authSrc: {
      type: String,
      required: false,
      default: "",
    }
  },
  mounted () {
    let token = `Bearer ${getToken()}`
    Object.defineProperty(Image.prototype, 'authsrc', {
      writable: true,
      enumerable: true,
      configurable: true
    })
    let img = this.$refs.img
    let request = new XMLHttpRequest();
    request.responseType = 'blob';
    request.open('get', this.authSrc, true);
    request.setRequestHeader('Authorization', token);
    request.onreadystatechange = e => {
      if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            
       img.src = URL.createObjectURL(request.response);
        img.onload = () => {
          URL.revokeObjectURL(img.src);
        }
      }
    };
    request.send(null);
  }
}
</script>

