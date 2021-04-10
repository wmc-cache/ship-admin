<template>

	<div class="app-container">
		<div>
			<el-button
				type="primary"
				@click="add"
			>增加</el-button>
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
							@click="deleteRole(row.id)"
							type="text"
							icon="el-icon-view"
							style="cursor: pointer;"
						>删除角色
						</el-button>
						<el-button
							@click="RoleDetail(row.id,row.roleName)"
							type="text"
							icon="el-icon-view"
							style="cursor: pointer;"
						>角色权限管理
						</el-button>
					</template>
				</el-table-column>

			</el-table>

		</div>
	</div>

</template>

<script>
import { getRoleList, addRole, deleteRole } from "../../api/roles";
export default {
	data() {
		return {
			roleList: null,
			tableKey: 0,
		};
	},
	async mounted() {
		const roleList = await getRoleList(0, 5);
		this.roleList = roleList.data.items;
		console.log("role", this.roleList);
	},
	methods: {
		add() {
			addRole({ roleName: "吴梦成", remark: "开发者" });
		},
		async deleteRole(id) {
			await deleteRole(id);
			location.reload();
		},
		RoleDetail(id, name) {
			this.$router.push({ path: `/roles/detail/${id}/${name}` });
		},
	},
};
</script>

<style>
</style>
