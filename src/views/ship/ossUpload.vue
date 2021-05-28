<template>
  <div>

    <!-- <token-img
			width="100px"
			height="100px"
			v-if="url"
			:key="key"
			:auth-src="`http://wuhanligong.xxlun.com/union/admin/img/${url}`"
		/> -->
    <input
      ref="input"
      type="file"
      @change="handleFileChange"
    >
    <div>
      <el-button @click="upload">上传文件</el-button>
      <el-button @click="submit">提交</el-button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
import OSS from 'ali-oss'
import { editDevice } from '../../api/ship'
import tokenImg from '@/components/token-img.vue'
export default {
	components: { tokenImg },
	data() {
		return {
			urlList: [],
			url: null,
			key: 0,
			client: null
		}
	},
	mounted() {
		this.client = new OSS({
			// yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
			region: 'oss-cn-hangzhou',
			// 从STS服务获取的临时访问凭证。临时访问凭证包括临时访问密钥（AccessKeyId和AccessKeySecret）和安全令牌（SecurityToken）。
			accessKeyId: 'LTAI5tH9DMgb8zz329RdSaCX',
			accessKeySecret: 'svAIilNfoPocG1SgTiwpphnXXe2zvz',
			// stsToken: "yourSecurityToken",
			bucket: 'wmc-oss-test'
		})
		console.log(this.client)
	},
	methods: {
		upload() {
			this.$refs.input.click()
		},
		handleFileChange(e) {
			const currentTarget = e.target
			if (currentTarget.files) {
				const files = Array.from(currentTarget.files)
				console.log('files', files[0])
				// const formData = new FormData();
				// formData.append("file", files[0]);
				this.client
					.put('object', files)
					.then(function(r1) {
						console.log('put success: %j', r1)
						return client.get('object')
					})
					.then(function(r2) {
						console.log('get success: %j', r2)
					})
					.catch(function(err) {
						console.error('error: %j', err)
					})
			}
		},
		async submit() {
			const id = localStorage.getItem('id')
			// console.log(id);
			await editDevice({
				id: `${id}`,
				logoUrl: `http://wuhanligong.xxlun.com/union/admin/img/${this.url}`
			})
			location.reload()
		}
	}
}
</script>

<style scoped>
input {
	display: none;
}
</style>
