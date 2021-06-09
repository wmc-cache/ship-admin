<template>
	<div>

		<div class="filter-container">
			<el-button
				class="filter-item"
				type="primary"
				icon="el-icon-edit"
				@click="add"
			>新增子菜单</el-button>
			<el-alert
				:closable="closable"
				type="info"
				show-icon
			>
				{{this.$route.params.name}}菜单详情

			</el-alert>
		</div>
	</div>

</template>

<script>
export default {
	data() {
		return {
			closable: false,
		};
	},
	mounted() {
		console.log(this.$route);
	},
	methods() {},
};
</script>

<style>
</style>
