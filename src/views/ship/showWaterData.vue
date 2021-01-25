<template>

	<!-- <dv-full-screen-container> -->

	<div class="body">
		<div class="content">

			<!-- header -->
			<div class="header">

				<div class="title">
					<div
						class="text"
						style="margin-top:1vh;margin-bottom:-1vw"
					>无人船智能云平台</div>

					<dv-decoration-5 style="width:40vw;height:5vh;" />
				</div>
				<img
					src="../../assets/logo.png"
					class="logo"
				>
			</div>
			<!-- header -->

			<div
				class="data-content"
				style="display:flex"
			>
				<div class="left">
					<div class="left1">
						<dv-border-box-10>
							<div style="height: 18vh;width: 26vw;display:flex;flex-wrap:wrap;justify-content:center;align-items: center;">
								<el-date-picker
									v-model="date"
									type="daterange"
									range-separator="-"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
								>
								</el-date-picker>
							</div>

						</dv-border-box-10>
					</div>
					<div class="left2">
						<dv-border-box-10>
							<pie-chart
								className="pie"
								height="23vh"
								width="23vw"
							></pie-chart>
						</dv-border-box-10>

					</div>
					<div class="left3">
						<dv-border-box-10>
							<div style="height:33vh;width: 26vw;display:flex;flex-wrap:wrap;justify-content:center;align-items: center;">
								<line-chart
									title="PH"
									:chart-data="lineChartData"
								/>
							</div>

						</dv-border-box-10>
					</div>

				</div>
				<div class="middle">
					<div class="middle1">
						<dv-border-box-10>
						</dv-border-box-10>
					</div>
					<div class="middle2">
						<dv-border-box-10>
							<div style="width: 46.5vw;height: 61vh;display:flex;flex-wrap:wrap;justify-content:center;align-items: center;">
								<line-chart
									title="PH"
									:chart-data="lineChartData"
								/>
								<line-chart
									title="CO2"
									:chart-data="lineChartData"
								/>
								<line-chart
									title="PM10"
									:chart-data="lineChartData"
								/>
								<line-chart
									title="O2"
									:chart-data="lineChartData"
								/>

							</div>

						</dv-border-box-10>
					</div>
				</div>

				<div class="right">

					<dv-border-box-10>
						<div style="	width: 22vw;height: 84vh;display:flex;flex-wrap:wrap;justify-content:center;align-items: center;">
							<line-chart
								title="PH"
								:chart-data="lineChartData"
							/>
							<line-chart
								title="CO2"
								:chart-data="lineChartData"
							/>
							<line-chart
								title="PM10"
								:chart-data="lineChartData"
							/>
						</div>

					</dv-border-box-10>
				</div>
			</div>

		</div>
	</div>

	<!-- </dv-full-screen-container> -->

</template>

<script>
const lineChartData = [8, 19, 29, 19, 12, 13, 13, 11, 22];
import LineChart from "@/views/ship/lineChart";
import PieChart from "@/views/ship/pieChart";
import { getDetectData } from "../../api/ship.js";
export default {
	name: "showWaterData",
	data() {
		return {
			lineChartData: lineChartData,
			date: null
		};
	},
	components: {
		PieChart,
		LineChart
	},
	watch: {
		date(value) {
			console.log(value);
		}
	},
	async mounted() {
		const deviceId = this.$route.params.deviceId;
		const mapId = this.$route.params.deviceId.mapId;
		const data = await getDetectData(deviceId, mapId);
		setInterval(() => {
			lineChartData.push(Math.random() * 100);
		}, 1000);
		console.log("历史监测数据", data.data);
	}
};
</script>

<style lang="scss" scoped>
.logo {
	width: 10vw;
	height: 5vh;
	position: absolute;
	top: 4vh;
	left: 2vh;
}
.pie {
	position: absolute;
	top: 6vh;
}
.body {
	width: 100vw;
	height: 100vh;
	background-color: #223957;
	display: flex;
	justify-content: center;
	align-items: center;
	.content {
		width: 99vw;
		height: 99vh;
		border: 1px solid #4081c4;
		position: relative;
		.header {
			height: 15vh;
			width: 100%;
			.title {
				font-family: PingFang SC;
				font-weight: 500;
				font-size: 1.5vw;
				color: #ffffff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background: linear-gradient(180deg, #56d5ff 0%, #56d5ff 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}
		.left {
			.left1 {
				height: 18vh;
				width: 26vw;
				//background-color: #56d5ff;
				margin-top: -4vh;
				margin-left: 2vh;
			}
			.left2 {
				height: 29vh;
				width: 26vw;

				margin-top: 2vh;
				margin-left: 2vh;
				position: relative;
			}
			.left3 {
				height: 33vh;
				width: 26vw;
				//background-color: darkblue;
				margin-top: 2vh;
				margin-left: 2vh;
			}
		}
		.middle {
			.middle1 {
				width: 46.5vw;
				height: 21vh;
				//	background-color: yellowgreen;
				margin-top: -4vh;
				margin-left: 2vh;
			}
			.middle2 {
				width: 46.5vw;
				height: 61vh;
				//background-color: #56d5ff;
				margin-top: 2vh;
				margin-left: 2vh;
			}
		}
		.right {
			width: 22vw;
			height: 84vh;
			//background-color: fuchsia;
			margin-top: -4vh;
			margin-left: 2vh;
		}
	}
}
</style>


