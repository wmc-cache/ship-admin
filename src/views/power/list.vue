<template>

	<div class="app-container">
		<el-dialog
			title="新增菜单"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose"
		>
			<el-input
				style="margin-top:10px"
				v-model="name"
				clearable
				placeholder="菜单名称"
			/>
			<el-input
				style="margin-top:20px"
				v-model="path"
				clearable
				placeholder="菜单路径"
			/>
			<el-input
				style="margin-top:20px"
				v-model="icon"
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

		<!-- 表格 -->
		<div class="filter-container">
			<el-button
				class="filter-item"
				type="primary"
				icon="el-icon-edit"
				@click="add"
			>新增菜单</el-button>
		</div>
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
				label="菜单标签"
				prop="path"
				align="center"
				width="200"
			/>
			<el-table-column
				label="菜单名称"
				prop="name"
				align="center"
				width="200"
			/>
			<el-table-column
				label="菜单图标"
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
						@click="deleteMenu(row.id)"
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
import { getMenuList, AddMenu, removeMenu } from "../../api/power";
export default {
	data() {
		return {
			powerList: null,
			tableKey: 0,
			dialogVisible: false,
			name: null,
			path: null,
			icon: null,
		};
	},
	async mounted() {
		const MenuList = await getMenuList();
		this.powerList = MenuList.data.children;
		console.log(this.powerList);
	},
	methods: {
		add() {
			this.dialogVisible = true;
		},
		handleClose() {
			this.dialogVisible = false;
		},
		async deleteMenu(id) {
			await removeMenu(id);
			location.reload();
		},
		async sure() {
			await AddMenu({
				name: this.name,
				icon: this.icon,
				path: this.path,
				pid: 0,
			});
			location.reload();
		},
	},
};
</script>

<style>
</style>
