<template>
	<div>
		<div class="app-container">
			<el-dialog
				v-el-drag-dialog
				title="新增用户"
				:visible.sync="dialogVisible"
				width="30%"
				:before-close="handleClose"
				@dragDialog="handleDrag"
			>
				<el-input
					v-model="username"
					style="margin-top:10px"
					clearable
					placeholder="用户名称"
				/>
				<el-input
					v-model="password"
					style="margin-top:20px"
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
			<el-tag type="success">全部角色列表</el-tag>
			<el-table
				:key="tableKey"
				:data="roleList"
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
					label="角色名"
					prop="roleName"
					align="center"
					width="200"
				/>
				<el-table-column
					label="remark"
					prop="remark"
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
							@click="addRole(row.id)"
						>为用户添加该角色
						</el-button>
					</template>
				</el-table-column>

			</el-table>
			<el-tag type="success">{{ this.$route.params.name }}拥有角色列表</el-tag>
			<el-table
				:key="tableKey2"
				:data="myRoleList"
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
					label="角色名"
					prop="roleName"
					align="center"
					width="200"
				/>
				<el-table-column
					label="remark"
					prop="remark"
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
							@click="addRole(row.id)"
						>为用户删除该角色
						</el-button>
					</template>
				</el-table-column>

			</el-table>
		</div>
	</div>
</template>

<script>
import { addRole } from "@/api/roles";
import { userToRole, userAddRole } from "../../api/user";
export default {
	name: "UserRoleList",
	data() {
		return {
			roleList: null,
			myRoleList: null,
			tableKey: 1,
			tableKey2: 2,
		};
	},
	mounted() {
		//	console.log();
		userToRole(this.$route.params.id).then((res) => {
			this.roleList = res.data.allRolesList;
			this.myRoleList = res.data.assignRoles;
			// console.log("res", res);
		});
	},
	methods: {
		async addRole(id) {
			await userAddRole(id, this.$route.params.id);
			location.reload();
		},
	},
};
</script>

<style>
</style>
