<template>
	<div>
		<!-- <img
			:src="`http://192.168.199.186:8009/union/img/${url}`"
			alt="加载失败"
		> -->
		<token-img auth-src="https://images.pexels.com/photos/7682736/pexels-photo-7682736.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"></token-img>
		<input
			ref="input"
			type="file"
			@change="handleFileChange"
		/>
		<button @click="upload">上传文件</button>
		<button @click="submit">提交</button>
	</div>
</template>

<script>
import axios from "axios";
import { getToken } from "@/utils/auth";
import { editDevice } from "../../api/ship";
import tokenImg from '@/components/token-img.vue';
export default {
  components: { tokenImg },
	data() {
		return {
			urlList: [],
			url: null,
		};
	},
	methods: {
		upload() {
			this.$refs.input.click();
		},
		handleFileChange(e) {
			const currentTarget = e.target;
			if (currentTarget.files) {
				const files = Array.from(currentTarget.files);
				console.log("files", files);
				const formData = new FormData();
				formData.append("file", files[0]);
				axios
					.post("/admin/uploadFile", formData, {
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${getToken()}`,
						},
					})
					.then((res) => {
						console.log(res.data.data.picName);
						this.url = res.data.data.picName;
					});
			}
		},
		submit() {
			//editDevice()
		},
	},
};
</script>

<style scoped>
input {
	display: none;
}
</style>
