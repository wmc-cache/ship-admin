<template>

	<div class="app-container">

		<!-- 表格 -->
		<el-button @click="add">增加</el-button>
		<el-table
			:key="tableKey"
			:data="powerList"
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
					>删除菜单
					</el-button>
				</template>
			</el-table-column>

		</el-table>

		<!-- <pagination
			v-show="total > 0"
			:total="total"
			:page.sync="listQuery.page"
			:limit.sync="listQuery.pageSize"
			@pagination="refresh"
		/> -->
	</div>
	<!-- <div>


	</div> -->

</template>

<script>
import { getMenuList, AddMenu } from "../../api/power";
export default {
	data() {
		return {
			powerList: null,
			tableKey: 0,
		};
	},
	async mounted() {
		const MenuList = await getMenuList();
		this.powerList = MenuList.data.children;
		console.log(this.powerList);
	},
	methods: {
		add() {
			AddMenu({
				name: "角色管理列表",
				icon: "list",
				path: "/roles",
				pid: 0,
			});
		},
	},
};
</script>

<style>
</style>
