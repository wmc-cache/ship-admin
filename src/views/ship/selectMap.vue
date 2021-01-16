<template>
	<div>
		<el-table
			:data="MapList"
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
				label="longitudeLatitude"
				prop="longitudeLatitude"
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
					>查看历史监测数据
					</el-button>

				</template>
			</el-table-column>

		</el-table>

	</div>
</template>

<script>
import { getMapList } from "@/api/ship";

export default {
	data() {
		return {
			MapList: null
		};
	},
	async mounted() {
		const deviceId = this.$route.params.deviceId;
		getMapList(deviceId).then(res => {
			console.log(res.data);
			this.MapList = res.data.mapList;
		});
	},
	methods: {
		goToDetail(row) {
			const deviceId = this.$route.params.deviceId;
			this.$router.push({ path: `/equipment/showData/${deviceId}/${row.id}` });
		}
	}
};
</script>

<style>
</style>
