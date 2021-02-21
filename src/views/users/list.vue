<template>

	<div class="app-container">
		<el-dialog
			title="新增用户"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose"
		>
			<el-input
				v-model="username"
				clearable
				placeholder="用户名称"
			/>
			<el-input
				v-model="password"
				type="password"
				clearable
				placeholder="密码"
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

		<div class="filter-container">

			<el-button
				class="filter-item"
				type="primary"
				icon="el-icon-edit"
				style="margin-left: 5px"
				@click="handleCreate"
			>
				新增用户
			</el-button>

		</div>
		<!-- 表格 -->
		<el-table
			:key="tableKey"
			:data="userList"
			border
			fit
			highlight-current-row
			style="width: 100%;"
		>

			<el-table-column
				label="id"
				prop="id"
				align="center"
				width="200"
			/>
			<el-table-column
				label="username"
				prop="username"
				align="center"
				width="200"
			/>
			<el-table-column
				label="gmtCreate"
				prop="gmtCreate"
				align="center"
				width="200"
			/>
			<el-table-column
				label="gmtModified"
				prop="gmtModified"
				align="center"
				width="200"
			/>

			<el-table-column
				label="操作"
				align="center"
			>
				<template slot-scope="{ row }">
					<el-button
						type="text"
						icon="el-icon-view"
						style="cursor: pointer;"
					>删除用户
					</el-button>
				</template>
			</el-table-column>

		</el-table>

	</div>

</template>

<script>
import { getUserList, addUser } from "../../api/user";
export default {
	name: "userList",
	data() {
		return {
			userList: null,
			tableKey: 0,
			dialogVisible: false,
			username: null,
			password: null
		};
	},
	mounted() {
		getUserList().then(res => {
			console.log(res);
			this.userList = res.data.items;
		});
	},
	methods: {
		handleCreate() {
			this.dialogVisible = true;
		},
		sure() {
			addUser({
				password: this.password,
				username: this.username
			});
			this.dialogVisible = false;
		}
	}
};
</script>

<style>
</style>
