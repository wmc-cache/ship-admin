<template>

	<div class="app-container">
		<el-dialog
			title="角色权限编辑"
			:visible.sync="dialogVisible2"
			width="30%"
			:before-close="handleClose"
		>
			<node
				v-if="dialogVisible2"
				:roleId="roleId"
			></node>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="dialogVisible2 = false">取 消</el-button>

			</span>
		</el-dialog>
		<el-dialog
			title="新增角色"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose"
		>
			<el-input
				v-model="rolename"
				style="margin-top:10px"
				clearable
				placeholder="角色名称"
			/>
			<el-input
				v-model="rolecontent"
				style="margin-top:20px"
				clearable
				placeholder="角色描述"
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
		<div>

			<div class="filter-container">
				<el-button
					class="filter-item"
					type="primary"
					icon="el-icon-edit"
					@click="add"
				>新增角色</el-button>
			</div>

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
					label="角色描述"
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
							@click="deleteRole(row.id)"
						>删除角色
						</el-button>
						<el-button
							type="text"
							icon="el-icon-view"
							style="cursor: pointer;"
							@click="RoleDetail(row.id,row.roleName)"
						>角色权限管理
						</el-button>
						<!-- <el-button
							@click="treeRoles(row)"
							type="primary"
						>
							tree
						</el-button> -->
					</template>
				</el-table-column>

			</el-table>

		</div>
	</div>

</template>

<script>
import { getRoleList, addRole, deleteRole } from "../../api/roles";

import node from "../ship/node.vue";
export default {
	components: {
		node,
	},
	data() {
		return {
			roleId: 0,
			roleList: null,
			tableKey: 0,
			dialogVisible: null,
			dialogVisible2: null,
			rolename: null,
			rolecontent: null,
		};
	},
	async mounted() {
		const roleList = await getRoleList(0, 5);
		this.roleList = roleList.data.items;
		console.log("role", this.roleList);
	},
	methods: {
		add() {
			this.dialogVisible = true;
		},
		handleClose() {
			this.dialogVisible = false;
		},
		async deleteRole(id) {
			await deleteRole(id);
			location.reload();
		},
		async sure() {
			await addRole({ roleName: this.rolename, remark: this.rolecontent });
			location.reload();
		},
		RoleDetail(id, name) {
			this.$router.push({ path: `/roles/detail/${id}/${name}` });
		},
		treeRoles(row) {
			//console.log(row);
			this.roleId = row.id;
			this.dialogVisible2 = true;
		},
	},
};
</script>

<style>
</style>
