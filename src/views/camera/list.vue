<template>
	<div @click="goToDetail">
		list
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
