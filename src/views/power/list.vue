<template>

	<div class="app-container">
		<el-dialog
			title="新增菜单"
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
		<el-dialog
			title="新增子菜单"
			:visible.sync="dialogVisible2"
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
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button
					type="primary"
					@click="sure2"
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
			row-key="id"
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
				label="菜单路径"
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

					<el-button
						type="text"
						icon="el-icon-view"
						style="cursor: pointer;"
						@click="add2(row.id)"
					>新增子菜单
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

</template>

<script>
import { getMenuList, AddMenu, removeMenu } from "../../api/power";
export default {
	data() {
		return {
			id: 0,
			powerList: null,
			tableKey: 0,
			dialogVisible: false,
			dialogVisible2: false,
			name: null,
			path: null,
			icon: null,
			pid: null,
		};
	},
	async mounted() {
		const MenuList = await getMenuList();
		this.powerList = MenuList.data.children;
		console.log("this.powerList", this.powerList);
	},
	methods: {
		add() {
			this.dialogVisible = true;
		},
		handleClose() {
			this.dialogVisible = false;
		},
		add2(id) {
			this.pid = id;
			this.dialogVisible2 = true;
		},
		handleClose2() {
			this.dialogVisible2 = false;
		},
		async deleteMenu(id) {
			this.$confirm("是否删除该菜单")
				.then(async () => {
					await removeMenu(id);
					location.reload();
				})
				.catch(() => {});
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
		async sure2() {
			await AddMenu({
				name: this.name,
				icon: this.icon,
				path: this.path,
				pid: this.pid,
			});
			location.reload();
		},
	},
};
</script>

<style>
</style>
