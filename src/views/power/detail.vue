<template>
	<div>
		<el-dialog
			title="新增子菜单"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose"
		>
			<el-input
				v-model="name"
				style="margin-top:10px"
				clearable
				placeholder="菜单名称"
			/>
			<el-input
				v-model="path"
				style="margin-top:20px"
				clearable
				placeholder="菜单路径"
			/>
			<el-input
				v-model="icon"
				style="margin-top:20px"
				clearable
				placeholder="菜单图标"
			/>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button
					type="primary"
					@click="sure"
				>确 定</el-button>
			</span>
		</el-dialog>
		<div
			style="margin-top:10px"
			class="filter-container"
		>
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

			<el-row :gutter="12">
				<el-col
					:span="8"
					v-for="item in data"
				>
					<el-card shadow="always">
						{{item.name}}
					</el-card>
				</el-col>

			</el-row>
		</div>
	</div>

</template>

<script>
import { AddMenu } from "../../api/power";
export default {
	data() {
		return {
			closable: false,
			dialogVisible: false,
			name: null,
			path: null,
			icon: null,
			data: null,
		};
	},
	mounted() {
		this.data = localStorage.getItem("children");
		console.log(this.data);
	},
	methods: {
		add() {
			this.dialogVisible = true;
		},
		handleClose() {
			this.dialogVisible = false;
		},
		async sure() {
			await AddMenu({
				name: this.name,
				icon: this.icon,
				path: this.path,
				pid: this.$route.params.id,
			});
			location.reload();
		},
	},
};
</script>

<style>
</style>
