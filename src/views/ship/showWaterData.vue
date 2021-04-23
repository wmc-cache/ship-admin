<template>

	<!-- <dv-full-screen-container> -->

	<div class="body">
		<div class="content">
			<!-- <div class="menu2"></div> -->
			<div
				class="menu3"
				@click="goIndex"
			> 返回</div>
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
								/>
							</div>

						</dv-border-box-10>
					</div>
					<div class="left2">
						<dv-border-box-10>
							<pie-chart
								class-name="pie"
								height="23vh"
								width="23vw"
							/>
						</dv-border-box-10>

					</div>
					<div class="left3">
						<dv-border-box-10>
							<div style="height:33vh;width: 26vw;display:flex;flex-wrap:wrap;justify-content:center;align-items: center;">
								<line-chart
									title="水温"
									:chart-data="wt"
								/>
							</div>

						</dv-border-box-10>
					</div>

				</div>
				<div class="middle">
					<div class="middle1">
						<dv-border-box-10>
							<div class="ID1">
								船ID:{{ deviceId }}

							</div>

							<div class="ID2">
								湖泊ID:{{ MapId }}
							</div>

						</dv-border-box-10>
					</div>
					<div class="middle2">
						<dv-border-box-10>
							<div style="width: 46.5vw;height: 61vh;display:flex;flex-wrap:wrap;justify-content:center;align-items: center;">
								<line-chart
									title="电导率"
									:chart-data="ec"
								/>
								<line-chart
									title="浊度"
									:chart-data="td"
								/>
								<line-chart
									title="PH"
									:chart-data="ph"
								/>
								<line-chart
									title="溶解氧"
									:chart-data="DO"
								/>

							</div>

						</dv-border-box-10>
					</div>
				</div>

				<div class="right">

					<dv-border-box-10>
						<div style="	width: 22vw;height: 84vh;display:flex;flex-wrap:wrap;justify-content:center;align-items: center;">
							<!-- <line-chart
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
							/> -->
						</div>

					</dv-border-box-10>
				</div>
			</div>

		</div>
	</div>

	<!-- </dv-full-screen-container> -->

</template>

<script>
const lineChartData = ["8", "19", "29", "19", "12", "13", "13", "11", "22"];
import LineChart from "@/views/ship/lineChart";
import PieChart from "@/views/ship/pieChart";
import { getDetectData } from "../../api/ship.js";
import { fmt } from "../../utils/date";
export default {
	name: "ShowWaterData",
	components: {
		PieChart,
		LineChart,
	},
	data() {
		return {
			lineChartData: lineChartData,
			date: null,
			water: null,
			MapId: null,
			deviceId: null,
			ph: [],
			ec: [], // 电导
			td: [], // 浊度
			wt: [], // 水温
			DO: [], // 溶解氧
		};
	},
	watch: {
		date(value) {
			const deviceId = this.$route.params.deviceId;
			const mapId = this.$route.params.MapId;
			this.ph = [];
			this.ec = [];
			this.td = [];
			this.wt = [];
			this.DO = [];
			getDetectData(
				deviceId,
				mapId,
				fmt(value[0]).split(" ")[0],
				fmt(value[1]).split(" ")[0]
			).then((res) => {
				console.log(res);
				this.water = res.data.data.water;
				this.water.forEach((ele) => {
					this.ph.push(ele.ph);
					this.ec.push(ele.ec);
					this.td.push(ele.td);
					this.wt.push(ele.wt);
					this.DO.push(ele.doDo);
				});
				console.log("ph", this.ph);
			});
			console.log(fmt(value[0]).split(" ")[0]);
			console.log(fmt(value[1]).split(" ")[0]);
		},
	},
	mounted() {
		this.MapId = this.$route.params.MapId;
		this.deviceId = this.$route.params.deviceId;
		// setInterval(() => {
		// 	lineChartData.push(Math.random() * 100);
		// }, 1000);
	},
	methods: {
		goIndex() {
			this.$router.push({
				path: `/equipment/ship/list`,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.menu2 {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 12vw;
	top: 2vh;
	background: linear-gradient(0deg, #ffa128 0%, #b57700 50%, #ffa128 100%);
	//border: 0.1vh solid #4081c4;
	color: #fff;
	font-size: 1.5vh;
	width: 7vh;
	height: 3vh;
	font-family: Source Han Sans CN;
	font-weight: bold;
	opacity: 0.8;
	text-shadow: 0px 0.1vh 0.1vh rgba(0, 0, 0, 0.6);
	cursor: pointer;
}
.menu3 {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 6vw;
	top: 2vh;
	background: #245098;
	color: #fff;
	font-size: 1.5vh;
	width: 7vh;
	height: 3vh;
	font-family: Source Han Sans CN;
	font-weight: bold;
	opacity: 0.8;
	border: 0.1vh solid #4081c4;
	text-shadow: 0px 0.1vh 0.1vh rgba(0, 0, 0, 0.6);
	cursor: pointer;
}
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
				position: relative;
				.ID1 {
					position: absolute;
					left: 2vw;
					top: 2vh;
					font-size: 1vw;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #0096ff;
				}
				.ID2 {
					position: absolute;
					left: 2vw;
					top: 5vh;
					font-size: 1vw;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #0096ff;
				}
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

