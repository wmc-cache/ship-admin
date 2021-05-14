<template>
	<div class="app-container">
		<div class="filter-container">
			<el-input
				v-model="listQuery.deviceName"
				clearable
				placeholder="船名"
				style="width: 200px;"
				class="filter-item"
				@clear="handleFilter"
			/>
			<el-input
				v-model="listQuery.position"
				clearable
				placeholder="位置"
				style="width: 200px;"
				class="filter-item"
				@clear="handleFilter"
			/>

			<el-select
				v-model="listQuery.type"
				placeholder="类型"
				clearable
				class="filter-item"
				@clear="handleFilter"
			>
				<el-option
					label="水质监测船"
					value="1"
				/>
			</el-select>

			<el-button
				class="filter-item"
				type="primary"
				icon="el-icon-search"
				style="margin-left: 10px"
				@click="search"
			>
				查询
			</el-button>

		</div>

		<el-dialog
			v-el-drag-dialog
			title="编辑"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose"
		>

			<el-form label-width="100px">
				<el-form-item label="船名">
					<el-input
						v-model="shipName"
						clearable
						placeholder="船名"
					/>
				</el-form-item>

				<el-form-item label="位置">
					<el-input
						v-model="position"
						clearable
						placeholder="位置"
					/>
				</el-form-item>

				<el-form-item label="单位名称">
					<el-input
						v-model="unitName"
						clearable
						placeholder="单位名称"
					/>
				</el-form-item>
				<el-form-item label="平台名称">
					<el-input
						v-model="platformName"
						clearable
						placeholder="平台名称"
					/>
				</el-form-item>
			</el-form>

			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button
					type="primary"
					@click="sureEdit"
				>确 定</el-button>
			</span>
		</el-dialog>

		<el-table
			:key="tableKey"
			v-loading="listLoading"
			:data="DeviceList"
			border
			fit
			highlight-current-row
			style="width: 100%;"
			height="500"
		>

			<el-table-column
				fixed="left"
				label="序号"
				prop="id"
				align="center"
				width="100"
			/>

			<el-table-column
				fixed="left"
				label="类型"
				prop="type"
				width="100"
				align="center"
			>
				<template slot-scope="{row}">
					<span>{{ row.type | valueFilter }}</span>
				</template>
			</el-table-column>

			<el-table-column
				fixed="left"
				label="船名"
				prop="deviceName"
				align="center"
				width="150"
			/>
			<el-table-column
				label="位置"
				prop="position"
				align="center"
				width="200"
			/>
			<el-table-column
				label="加入时间"
				prop="gmtCreate"
				align="center"
				width="200"
			/>

			<el-table-column
				v-if="showID"
				label="设备ID"
				prop="deviceId"
				align="center"
				width="200"
			/>
			<el-table-column
				label="修改时间"
				prop="gmtModified"
				align="center"
				width="200"
			/>
			<el-table-column
				label="平台名称"
				prop="platformName"
				align="center"
				width="200"
			/>
			<el-table-column
				label="单位名称"
				prop="corporateName"
				align="center"
				width="200"
			/>
			<el-table-column
				label="操作"
				align="center"
				width="200"
				fixed="right"
			>
				<template slot-scope="{ row }">

					<el-button
						type="text"
						icon="el-icon-view"
						style="cursor: pointer;"
						@click="goToDetail(row)"
					>详情
					</el-button>
					<el-button
						type="text"
						icon="el-icon-view"
						style="cursor: pointer;"
						@click="selectMap(row)"
					>历史监测数据
					</el-button>
					<el-button
						type="text"
						icon="el-icon-view"
						style="cursor: pointer;"
						@click="edit(row)"
					>编辑
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
import elDragDialog from "@/directive/el-drag-dialog";
import { getDeviceList, searchShip } from "../../api/user";
import { editDevice } from "../../api/ship";
export default {
	components: {
		Pagination,
	},
	directives: { elDragDialog },
	filters: {
		valueFilter(value) {
			if (value == 1) {
				return "水质监测船";
			} else {
				return "暂无";
			}
		},
	},
	data() {
		return {
			total: 90,
			tableKey: 0,
			DeviceList: null,
			listLoading: true,
			showID: true,
			dialogVisible: false,
			shipName: "shipName",
			platformName: "platformName",
			unitName: "unitName",
			position: "position",
			id: "id",
			listQuery: {
				deviceName: null,
				type: null,
				page: 1, // 当前页数
				pageSize: 10, // 每页数量
				position: null,
			},
		};
	},
	mounted() {
		getDeviceList(0, 10).then((res) => {
			this.DeviceList = res.data.items;
			this.total = res.data.total;
			this.listLoading = false;
		});
	},
	methods: {
		// 分页函数
		refresh() {
			// console.log("list", this.listQuery);
			this.listLoading = true;
			getDeviceList(this.listQuery.page, this.listQuery.pageSize).then(
				(res) => {
					this.DeviceList = res.data.items;
					this.total = res.data.total;
					this.listLoading = false;
				}
			);
		},
		// 搜索
		search() {
			for (const index in this.listQuery) {
				//console.log(this.listQuery[index])
				if (this.listQuery[index] == "") {
					this.listQuery[index] = null;
				}
			}
			this.listLoading = true;
			searchShip(0, 10, this.listQuery).then((res) => {
				this.DeviceList = res.data.items;
				this.total = res.data.total;
				this.listLoading = false;
			});
		},
		// 过滤
		handleFilter() {
			this.search();
		},
		edit(row) {
			this.dialogVisible = true;
			this.id = row.id;
			this.position = row.position;
			this.shipName = row.deviceName;
			this.platformName = row.platformName;
			this.unitName = row.corporateName;
		},
		changeShowCover() {
			if (showID) {
				this.showID = false;
			} else {
				this.showID = true;
			}
		},
		handleClose() {
			this.dialogVisible = false;
		},
		async sureEdit(row) {
			await editDevice({
				id: this.id,
				position: this.position,
				platformName: this.platformName,
				deviceName: this.shipName,
				corporateName: this.unitName,
			});
			location.reload();
		},
		goToDetail(row) {
			this.$router.push({
				path: `/ship/operation/${row.deviceId}`,
				query: {
					platformName: row.platformName,
					corporateName: row.corporateName,
				},
			});
		},
		selectMap(row) {
			this.$router.push({
				path: `/equipment/selectMap/${row.deviceId}`,
			});
		},
	},
};
</script>

<style>
</style>
