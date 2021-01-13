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
		<div
			id="map"
			style="width:100px;height:100px"
		></div>
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
		var map = new AMap.Map("map", {
			zoom: 10, //设置地图显示的缩放级别
			center: [116.397428, 39.90923], //设置地图中心点坐标
			mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
			viewMode: "2D", //设置地图模式
			lang: "zh_cn" //设置地图语言类型
		});

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
