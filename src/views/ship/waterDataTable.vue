<template>
	<div>

		<div style="margin-top:30px">
			<el-date-picker
				v-model="date"
				type="daterange"
				range-separator="-"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
			/>
			<FilenameOption v-model="filename" />
			<BookTypeOption v-model="bookType" />
			<el-button
				:loading="downloadLoading"
				style="margin:0 0 20px 20px;"
				type="primary"
				icon="el-icon-document"
				@click="handleDownload"
			>
				导出文件
			</el-button>

		</div>

		<el-table
			:data="waterData"
			border
			fit
			highlight-current-row
			style="width: 100%;"
		>
			<el-table-column
				fixed="left"
				label="序号"
				width="100"
				align="center"
				prop="index"
			>
			</el-table-column>
			<el-table-column
				label="设备ID"
				prop="deviceId"
				align="center"
				width="200"
			/>
			<el-table-column
				label="时间"
				prop="gmtCreate"
				align="center"
				width="100"
			/>
			<el-table-column
				label="湖名"
				prop="mapName"
				align="center"
				width="100"
			/>

			<el-table-column
				label="浊度"
				prop="td"
				align="center"
				width="100"
			>

				<template slot-scope="{row}">

					{{ row.td }}

				</template>
			</el-table-column>

			<el-table-column
				label="PH"
				prop="ph"
				align="center"
				width="100"
			/>
			<el-table-column
				label="水温"
				prop="wt"
				align="center"
				width="100"
			/>
			<el-table-column
				label="溶解氧"
				prop="doDo"
				align="center"
				width="100"
			/>
			<el-table-column
				label="电导"
				prop="ec"
				align="center"
				width="100"
			/>

			<el-table-column
				label="高德地图经纬度"
				prop="gjwd"
				align="center"
				width="200"
			/>
			<el-table-column
				label="经纬度"
				prop="jwd"
				align="center"
				width="200"
			/>

		</el-table>
	</div>
</template>

<script>
import FilenameOption from "./components/FilenameOption";
import AutoWidthOption from "./components/AutoWidthOption";
import BookTypeOption from "./components/BookTypeOption";
import { parseTime } from "@/utils";
import { getDetectData } from "../../api/ship.js";
import { fmt } from "../../utils/date";
export default {
	name: "ShowWaterData",
	components: { FilenameOption, AutoWidthOption, BookTypeOption },
	data() {
		return {
			date: null,
			waterData: null,
			filename: "",
			autoWidth: true,
			bookType: "xlsx",
			downloadLoading: false,
		};
	},
	watch: {
		date(value) {
			const deviceId = this.$route.params.deviceId;
			const mapId = this.$route.params.MapId;
			getDetectData(
				deviceId,
				mapId,
				fmt(value[0]).split(" ")[0],
				fmt(value[1]).split(" ")[0]
			).then((res) => {
				if (res.data.data.water) {
					res.data.data.water.forEach((ele, index) => {
						ele.index = index + 1;
					});
					this.waterData = res.data.data.water;
				}

				// for (i = 0; i < this.waterData.length; i++) {
				// 	console.log(this.waterData[i]);
				// }
			});
			// console.log(fmt(value[0]).split(" ")[0]);
			// console.log(fmt(value[1]).split(" ")[0]);
		},
	},
	mounted() {},
	methods: {
		handleDownload() {
			this.downloadLoading = true;
			import("@/vendor/Export2Excel").then((excel) => {
				const tHeader = [
					"序号",
					"时间",
					"湖名",
					"浊度",
					"PH",
					"水温",
					"溶解氧",
					"电导",
					"高德地图经纬度",
					"经纬度",
				];
				const filterVal = [
					"index",
					"gmtCreate",
					"mapName",
					"td",
					"ph",
					"wt",
					"doDo",
					"ec",
					"gjwd",
					"jwd",
				];
				const data = this.formatJson(filterVal, this.waterData);
				excel.export_json_to_excel({
					header: tHeader,
					data,
					filename: this.filename,
					autoWidth: this.autoWidth,
					bookType: this.bookType,
				});
				this.downloadLoading = false;
			});
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map((v) =>
				filterVal.map((j) => {
					if (j === "timestamp") {
						return parseTime(v[j]);
					} else {
						return v[j];
					}
				})
			);
		},
	},
};
</script>

<style>
</style>
