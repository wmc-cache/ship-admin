<template>
	<div class="app-container">

		<el-button @click="goToDetail">进入水质监控系统</el-button>

	</div>

</template>

<script>
export default {
	methods: {
		goToDetail() {
			this.$router.push({
				path: "/camera/detail",
			});
		},
	},
};
</script>

<style>
</style>
