<template>
	<div>
		<!-- <img
http://wuhanligong.xxlun.com/union
http://localhost:9527
			alt="加载失败"
		> -->
		<token-img
			width="100px"
			height="100px"
			v-if="url"
			:key="key"
			:auth-src="`http://wuhanligong.xxlun.com/union/admin/img/${url}`"
		/>
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
import axios from "axios";
import { getToken } from "@/utils/auth";
import { editDevice } from "../../api/ship";
import tokenImg from "@/components/token-img.vue";
export default {
	components: { tokenImg },
	data() {
		return {
			urlList: [],
			url: null,
			key: 0,
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
					.post("/union/admin/uploadFile", formData, {
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${getToken()}`,
						},
					})
					.then((res) => {
						console.log(res.data.data.picName);
						this.url = res.data.data.picName;
						this.key++;
					});
			}
		},
		async submit() {
			const id = localStorage.getItem("id");
			//console.log(id);
			await editDevice({
				id: `${id}`,
				logoUrl: `http://wuhanligong.xxlun.com/union/admin/img/${this.url}`,
			});
			location.reload();
		},
	},
};
</script>

<style scoped>
input {
	display: none;
}
</style>
