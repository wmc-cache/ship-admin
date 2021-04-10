<template>
	<div class="app-container">
		<!-- <div class="filter-container">
			<el-input
				v-model="listQuery.title"
				clearable
				placeholder="设备名称"
				style="width: 200px;"
				class="filter-item"
				@keyup.enter.native="handleFilter"
				@clear="handleFilter"
				@blur="handleFilter"
			/>

			<el-select
				v-model="listQuery.category"
				placeholder="分类"
				clearable
				class="filter-item"
				@change="handleFilter"
			>
				<el-option
					v-for="item in categoryList"
					:key="item.value"
					:label="item.label"
					:value="item.label"
				/>
			</el-select>
			<el-button
				v-waves
				class="filter-item"
				type="primary"
				icon="el-icon-search"
				style="margin-left: 10px"
				@click="forceRefresh"
			>
				查询
			</el-button>
			<el-button
				class="filter-item"
				type="primary"
				icon="el-icon-edit"
				style="margin-left: 5px"
				@click="handleCreate"
			>
				新增
			</el-button>
			<el-checkbox
				v-model="showID"
				class="filter-item"
				style="margin-left:5px;"
				@change="changeShowCover"
			>
				显示设备ID
			</el-checkbox>
		</div> -->
		<el-table
			:key="tableKey"
			v-loading="listLoading"
			:data="DeviceList"
			border
			fit
			highlight-current-row
			style="width: 100%;"
		>

			<el-table-column
				label="id"
				prop="id"
				align="center"
				width="100"
			/>
			<el-table-column
				label="uid"
				prop="uid"
				align="center"
				width="100"
			/>
			<el-table-column
				v-if="showID"
				label="设备ID"
				prop="deviceId"
				align="center"
				width="200"
			/>

			<el-table-column
				label="设备名称"
				prop="deviceName"
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
				width="200"
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
import { getDeviceList } from "../../api/user";
export default {
	components: {
		Pagination,
	},
	data() {
		return {
			total: 90,
			tableKey: 0,
			DeviceList: null,
			listLoading: true,
			showID: true,
			listQuery: {
				title: "",
				author: "",
				category: "",
				page: 1, // 当前页数
				pageSize: 5, // 每页数量
			},
		};
	},
	mounted() {
		getDeviceList(0, 5).then((res) => {
			this.DeviceList = res.data.items;
			this.total = res.data.total;

			this.listLoading = false;
		});
	},
	methods: {
		// 分页函数
		refresh() {
			console.log("list", this.listQuery);
			getDeviceList(this.listQuery.page, this.listQuery.pageSize).then(
				(res) => {
					this.DeviceList = res.data.items;
					this.total = res.data.total;
				}
			);
		},
		changeShowCover() {
			if (showID) {
				this.showID = false;
			} else {
				this.showID = true;
			}
		},
		goToDetail(row) {
			this.$router.push({ path: `/ship/operation/${row.deviceId}` });
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
