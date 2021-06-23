<template>
	<div class="app-container">

		<el-button @click="goToDetail">进入传感器系统</el-button>

	</div>

</template>

<script>
import { getSiteList } from "../../api/sensor";
export default {
	mounted() {
		// getSiteList(0, 10).then((res) => {
		// 	console.log("getSiteList", res);
		// });
	},
	methods: {
		goToDetail() {
			this.$router.push({
				path: "/sensor/detail",
			});
		},
	},
};
</script>

<style>
</style>
