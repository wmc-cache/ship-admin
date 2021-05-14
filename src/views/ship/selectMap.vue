<template>
	<div>

		<el-dialog
			title="修改湖名"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose"
		>
			<el-input
				v-model="name"
				clearable
				placeholder="新湖名"
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
		<el-table
			:data="MapList"
			border
			fit
			highlight-current-row
			style="width: 100%;"
			height="500"
		>
			<el-table-column
				fixed="left"
				label="序号"
				width="100"
				type="index"
				align="center"
				:index="indexMethod"
			>
			</el-table-column>
			</el-table-column>

			<el-table-column
				fixed="left"
				label="湖泊ID"
				prop="id"
				align="center"
				width="200"
			/>
			<el-table-column
				fixed="left"
				label="湖名"
				prop="name"
				align="center"
				width="200"
			/>
			<el-table-column
				label="使用时间"
				prop="gmtCreate"
				align="center"
				width="200"
			/>

			<el-table-column
				label="操作1"
				align="center"
				width="300"
			>
				<template slot-scope="{ row }">

					<el-button
						type="text"
						icon="el-icon-view"
						style="cursor: pointer;"
						@click="goToDetailTable(row)"
					>查看历史监测数据(可导出表格)
					</el-button>

				</template>
			</el-table-column>
			<el-table-column
				label="操作2"
				align="center"
				width="300"
			>
				<template slot-scope="{ row }">

					<el-button
						type="text"
						icon="el-icon-view"
						style="cursor: pointer;"
						@click="goToDetail(row)"
					>查看历史监测数据(可视化)</el-button>

				</template>
			</el-table-column>

			<el-table-column
				label="操作3"
				align="center"
				width="300"
			>
				<template slot-scope="{ row }">

					<el-button
						type="text"
						icon="el-icon-view"
						style="cursor: pointer;"
						@click="goToMap3D(row)"
					>查看湖泊探测数据(可视化)</el-button>

				</template>
			</el-table-column>
			<el-table-column
				label="修改"
				align="center"
				width="300"
			>
				<template slot-scope="{ row }">

					<el-button
						type="text"
						icon="el-icon-view"
						style="cursor: pointer;"
						@click="upDataName(row)"
					>修改湖名
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
import { getMapListShow, postMapName } from "@/api/ship";
import Pagination from "@/components/Pagination";
export default {
	components: {
		Pagination,
	},
	data() {
		return {
			MapList: null,
			dialogVisible: false,
			name: null,
			mapId: null,
			total: 90,
			listQuery: {
				title: "",
				author: "",
				category: "",
				page: 1, // 当前页数
				pageSize: 10, // 每页数量
			},
		};
	},
	async mounted() {
		const deviceId = this.$route.params.deviceId;
		getMapListShow(deviceId, 0, 10).then((res) => {
			this.MapList = res.data.mapList.records;
			this.total = res.data.mapList.total;
			//console.log(this.MapList);
		});
	},
	methods: {
		// 分页函数
		refresh() {
			// console.log("list", this.listQuery);
			const deviceId = this.$route.params.deviceId;
			this.listLoading = true;
			getMapListShow(
				deviceId,
				this.listQuery.page,
				this.listQuery.pageSize
			).then((res) => {
				this.MapList = res.data.mapList.records;
				this.total = res.data.mapList.total;
				this.listLoading = false;
			});
		},
		indexMethod(index) {
			return index * 1 + 1;
		},
		upDataName(row) {
			this.mapId = row.id;
			this.dialogVisible = true;
		},
		sure() {
			postMapName(this.mapId, this.name).then((res) => {
				console.log(res);
				location.reload();
			});
		},
		goToDetail(row) {
			const deviceId = this.$route.params.deviceId;
			this.$router.push({
				path: `/showWaterData/${deviceId}/${row.id}`,
			});
		},
		goToDetailTable(row) {
			const deviceId = this.$route.params.deviceId;
			this.$router.push({
				path: `/waterDataTable/${deviceId}/${row.id}`,
			});
		},
		goToMap3D(row) {
			const deviceId = this.$route.params.deviceId;
			this.$router.push({
				path: `/map3D/${deviceId}/${row.id}`,
			});
		},
		handleClose() {
			this.dialogVisible = false;
		},
	},
};
</script>

<style>
</style>
