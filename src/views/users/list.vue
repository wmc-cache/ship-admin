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
					<el-button
						@click="goToDetail(row.id,row.username)"
						type="text"
						icon="el-icon-view"
						style="cursor: pointer;"
					>用户角色管理
					</el-button>
				</template>
			</el-table-column>

		</el-table>

		<pagination
			v-show="total > 0"
			:total="total"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.pageSize"
			@pagination="refresh"
		/>
	</div>

</template>

<script>
import Pagination from "@/components/Pagination";
import { getUserList, addUser, userToRole } from "../../api/user";
export default {
	name: "userList",
	components: {
		Pagination,
	},
	data() {
		return {
			total: 10,
			userList: null,
			tableKey: 0,
			dialogVisible: false,
			username: null,
			password: null,
			listQuery: {
				page: 1, // 当前页数
				pageSize: 5, // 每页数量
			},
		};
	},
	mounted() {
		getUserList(0, 5).then((res) => {
			console.log(res);
			this.userList = res.data.items;
			this.total = res.data.total;
		});
		userToRole(1).then((res) => {
			console.log("res", res);
		});
	},
	methods: {
		handleCreate() {
			this.dialogVisible = true;
		},
		refresh() {
			getUserList(this.listQuery.page, this.listQuery.pageSize).then((res) => {
				this.userList = res.data.items;
				this.total = res.data.total;
			});
		},
		sure() {
			addUser({
				password: this.password,
				username: this.username,
			});
			this.dialogVisible = false;
		},
		handleClose() {},
		goToDetail(id, name) {
			console.log(id, name);
			this.$router.push({
				path: `/user/detail/${id}/${name}`,
			});
		},
	},
};
</script>

<style>
</style>
