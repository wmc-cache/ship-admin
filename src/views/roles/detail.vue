<template>
	<div class="app-container">
		<div>
			<el-tag type="success">全部菜单列表</el-tag>
			<el-table
				:key="tableKey"
				:data="powerList"
				row-key="id"
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
					label="path"
					prop="path"
					align="center"
					width="200"
				/>
				<el-table-column
					label="name"
					prop="name"
					align="center"
					width="200"
				/>
				<el-table-column
					label="icon"
					prop="icon"
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
						>为该角色添加菜单
						</el-button>
					</template>
				</el-table-column>

			</el-table>
			<el-tag type="success">{{ this.$route.params.name }}拥有的菜单列表</el-tag>
			<el-table
				:key="tableKey2"
				:data="powerList2"
				row-key="id"
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
					label="path"
					prop="path"
					align="center"
					width="200"
				/>
				<el-table-column
					label="name"
					prop="name"
					align="center"
					width="200"
				/>
				<el-table-column
					label="icon"
					prop="icon"
					align="center"
					width="200"
				/>

				<el-table-column
					label="select"
					prop="select"
					align="center"
					width="200"
				/>

				<el-table-column label="操作">
					<template slot-scope="{ row }">
						<el-button
							type="text"
							icon="el-icon-view"
							style="cursor: pointer;"
							@click="deleteRole(row.id)"
						>{{row}}

						</el-button>

					</template>
				</el-table-column>

			</el-table>

		</div>
	</div>
</template>

<script>
import { getRolePower, roleAddPower, roleDeletePower } from "../../api/roles";
import { getMenuList } from "../../api/power";
export default {
	data() {
		return {
			id: 0,
			powerList: null,
			powerList2: null,
			tableKey: 0,
			tableKey2: 1,
		};
	},
	async mounted() {
		this.init();
	},
	methods: {
		async addRole(id, ids) {
			await roleAddPower(id, this.$route.params.id);
			location.reload();
		},
		async deleteRole(id) {
			console.log(id);
		},
		async init() {
			const MenuList = await getMenuList();
			this.powerList = MenuList.data.children;
			const RolePower = await getRolePower(this.$route.params.id);
			this.powerList2 = RolePower.data.children;
			this.powerList2.forEach((ele) => {
				if (ele.select == true) {
					ele.select = "已拥有";
				} else {
					ele.select = "未拥有";
				}
				if (ele.children) {
					ele.children.forEach((ele) => {
						if (ele.select == true) {
							ele.select = "已拥有";
						} else {
							ele.select = "未拥有";
						}
						if (ele.children) {
							ele.children.forEach((ele) => {
								if (ele.select == true) {
									ele.select = "已拥有";
								} else {
									ele.select = "未拥有";
								}
							});
						}
					});
				}
			});
		},
	},
};
</script>

<style>
</style>
