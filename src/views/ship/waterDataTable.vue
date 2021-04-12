<template>
	<div>
		<el-date-picker
			v-model="date"
			type="daterange"
			range-separator="-"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
		>
		</el-date-picker>
		<div>
			<FilenameOption v-model="filename" />
			<!-- <AutoWidthOption v-model="autoWidth" /> -->
			<BookTypeOption v-model="bookType" />
			<el-button
				:loading="downloadLoading"
				style="margin:0 0 20px 20px;"
				type="primary"
				icon="el-icon-document"
				@click="handleDownload"
			>
				Export Excel
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
				label="deviceId"
				prop="deviceId"
				align="center"
				width="200"
			/>
			<el-table-column
				label="td"
				prop="td"
				align="center"
				width="100"
			/>
			<el-table-column
				label="ph"
				prop="ph"
				align="center"
				width="100"
			/>
			<el-table-column
				label="wt"
				prop="wt"
				align="center"
				width="100"
			/>
			<el-table-column
				label="doDo"
				prop="doDo"
				align="center"
				width="100"
			/>
			<el-table-column
				label="ec"
				prop="ec"
				align="center"
				width="100"
			/>

			<el-table-column
				label="操作"
				align="center"
				width="400"
			>

			</el-table-column>

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
	components: { FilenameOption, AutoWidthOption, BookTypeOption },
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
				this.waterData = res.data.data.water;
			});
			console.log(fmt(value[0]).split(" ")[0]);
			console.log(fmt(value[1]).split(" ")[0]);
		},
	},
	mounted() {
		const deviceId = this.$route.params.deviceId;
		const mapId = this.$route.params.MapId;
		getDetectData(deviceId, mapId).then((res) => {
			console.log(res);
		});
	},
	methods: {
		handleDownload() {
			this.downloadLoading = true;
			import("@/vendor/Export2Excel").then((excel) => {
				const tHeader = ["deviceId", "td", "ph", "wt", "doDo"];
				const filterVal = ["deviceId", "td", "ph", "wt", "doDo"];
				//const list = this.list;
				const data = this.formatJson(filterVal, this.waterData);
				//console.log(this.date, data);
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
