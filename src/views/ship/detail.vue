<template>

	<!-- <dv-full-screen-container> -->

	<div class="body">
		<div class="content">
			<div class="menu1">数据总览</div>
			<div
				class="menu2"
				@click="goOperation"
				@touchstart="goOperation"
			>设备操作</div>
			<div
				@click="goIndex"
				@touchstart="goIndex"
				class="menu3"
			>返回</div>
			<!-- header -->
			<div class="header">

				<div class="title">
					<div
						class="text"
						style="margin-top:1vh;margin-bottom:-1vw"
					>无人船智能云平台</div>

					<dv-decoration-5 style="width:40vw;height:5vh;" />
				</div>

				<div class="tip-item">

					<div class="item1">
						<div class="text">速度</div>
						<div
							v-if="status_data"
							class="num"
						>{{status_data.speed}}</div>
					</div>
					<div class="item2">
						<div class="text">设备电量</div>
						<div class="num">{{status_data.dump_energy}}</div>
					</div>

					<div class="item3">

						<div class="text">船头方向</div>
						<div class="num">{{status_data.direction}}</div>

					</div>

				</div>

			</div>
			<!-- header -->
			<div class="content-middle">
				<div class="content-left">
					<div class="left1">
						<dv-border-box-10>

							<div class="title">气象数据</div>
							<!-- <div class="time">2002年1月7日 &nbsp&nbsp 星期四 &nbsp&nbsp 10:22:34</div>
							<div class="data-list">
								<div class="data-item">
									<div class="item-state">风速</div>
									<div class="item-num">2级</div>
								</div>
								<div class="data-item">
									<div class="item-state">风速</div>
									<div class="item-num">2级</div>
								</div>
								<div class="data-item">
									<div class="item-state">风速</div>
									<div class="item-num">2级</div>
								</div>
								<div class="data-item">
									<div class="item-state">风速</div>
									<div class="item-num">2级</div>
								</div>
								<div class="data-item">
									<div class="item-state">风速</div>
									<div class="item-num">2级</div>
								</div>
								<div class="data-item">
									<div class="item-state">风速</div>
									<div class="item-num">2级</div>
								</div>
							</div> -->
						</dv-border-box-10>
					</div>
					<div class="left2">
						<dv-border-box-10>
							<div class="title">状态数据</div>
							<div class="icon-list">
								<!-- <div class="icon-item">
									<img
										src="../../assets/1.png"
										alt=""
									>
									<div class="text">液位</div>
									<div class="num">暂无</div>
								</div> -->
								<div class="icon-item">
									<img
										src="../../assets/2.png"
										alt=""
									>
									<div class="text">船头方向</div>
									<div class="num">{{status_data.direction}}</div>
								</div>
								<div class="icon-item">
									<img
										src="../../assets/3.png"
										alt=""
									>
									<div class="text">设备电量</div>
									<div class="num">{{status_data.dump_energy}}</div>
								</div>
								<!-- <div class="icon-item">
									<img
										src="../../assets/1.png"
										alt=""
									>
									<div class="text">液位</div>
									<div class="num">暂无</div>
								</div> -->
								<!-- <div class="icon-item">
									<img
										src="../../assets/1.png"
										alt=""
									>
									<div class="text">液位</div>
									<div class="num">暂无</div>
								</div>
								<div class="icon-item">
									<img
										src="../../assets/1.png"
										alt=""
									>
									<div class="text">液位</div>
									<div class="num">暂无</div>
								</div>
								<div class="icon-item">
									<img
										src="../../assets/1.png"
										alt=""
									>
									<div class="text">液位</div>
									<div class="num">暂无</div>
								</div> -->
								<!-- 分割 -->
								<!-- <div class="icon-item">
									<img
										src="../../assets/1.png"
										alt=""
									>
									<div class="text">液位</div>
									<div class="num">暂无</div>
								</div>
								<div class="icon-item">
									<img
										src="../../assets/1.png"
										alt=""
									>
									<div class="text">液位</div>
									<div class="num">暂无</div>
								</div>
								<div class="icon-item">
									<img
										src="../../assets/1.png"
										alt=""
									>
									<div class="text">液位</div>
									<div class="num">暂无</div>
								</div>
								<div class="icon-item">
									<img
										src="../../assets/1.png"
										alt=""
									>
									<div class="text">液位</div>
									<div class="num">暂无</div>
								</div>
								<div class="icon-item">
									<img
										src="../../assets/1.png"
										alt=""
									>
									<div class="text">液位</div>
									<div class="num">暂无</div>
								</div> -->

							</div>
						</dv-border-box-10>
					</div>
				</div>
				<div class="middle">
					<dv-border-box-8
						:reverse="true"
						style="padding:0.5vh"
					>
						<div
							style="width: 38vw;height: 54vh; margin:auto;"
							id="container"
						>
						</div>

					</dv-border-box-8>

				</div>

				<div class="content-right">
					<div class="right1">
						<dv-border-box-10>
							<div style="width: 25vw;height: 21vh;display:flex;justify-content:center;align-items:center;">
								<video
									style="width:22vw;height: 18vh;"
									id="myPlayer"
									controls
									playsInline
								>
									<source src="rtmp://58.200.131.2:1935/livetv/hunantv" />
								</video>
							</div>
						</dv-border-box-10>
					</div>
					<div class="right2">
						<dv-border-box-10>
							<div class="title">其它数据</div>
							<div class="data-list">
								<!--
								<div class="data-item">
									<dv-border-box-12>
										<div style="	width: 8vw;height: 4vw;display: flex;flex-direction:column;justify-content:center;align-items: center;">
											<div class="item-title">船号</div>
											<div class="item-num">798</div>
										</div>

									</dv-border-box-12>
								</div>
								<div class="data-item">
									<dv-border-box-12>
										<div style="	width: 8vw;height: 4vw;display: flex;flex-direction:column;justify-content:center;align-items: center;">
											<div class="item-title">船号</div>
											<div class="item-num">798</div>
										</div>

									</dv-border-box-12>
								</div>
								<div class="data-item">
									<dv-border-box-12>
										<div style="	width: 8vw;height: 4vw;display: flex;flex-direction:column;justify-content:center;align-items: center;">
											<div class="item-title">船号</div>
											<div class="item-num">798</div>
										</div>

									</dv-border-box-12>
								</div>
								<div class="data-item">
									<dv-border-box-12>
										<div style="	width: 8vw;height: 4vw;display: flex;flex-direction:column;justify-content:center;align-items: center;">
											<div class="item-title">船号</div>
											<div class="item-num">798</div>
										</div>

									</dv-border-box-12>
								</div>
								<div class="data-item">
									<dv-border-box-12>
										<div style="	width: 8vw;height: 4vw;display: flex;flex-direction:column;justify-content:center;align-items: center;">
											<div class="item-title">船号</div>
											<div class="item-num">798</div>
										</div>

									</dv-border-box-12>
								</div>
								<div class="data-item">
									<dv-border-box-12>
										<div style="	width: 8vw;height: 4vw;display: flex;flex-direction:column;justify-content:center;align-items: center;">
											<div class="item-title">船号</div>
											<div class="item-num">798</div>
										</div>

									</dv-border-box-12>
								</div> -->

							</div>
						</dv-border-box-10>
					</div>
				</div>

			</div>
			<div class="bottom">
				<dv-border-box-10>
					<div class="title">水质数据</div>
					<div class="chart-list">

						<line-chart
							title="PH"
							:chart-data="PH"
						/>
						<line-chart
							title="电导"
							:chart-data="ec"
						/>
						<line-chart
							title="浊度"
							:chart-data="td"
						/>
						<line-chart
							title="水温"
							:chart-data="wt"
						/>

						<line-chart
							title="溶解氧"
							:chart-data="DO"
						/>

					</div>

				</dv-border-box-10>
			</div>
		</div>
	</div>

	<!-- </dv-full-screen-container> -->

</template>

<script>
import MQTT from "paho-mqtt";
import LineChart from "@/views/ship/lineChart";
const lineChartData = [8, 19, 29, 19, 12, 13, 13, 11, 22];
export default {
	mounted() {
		//this.initTest();
		this.initMqtt();
		this.initMap();
		this.deviceId = this.$route.params.deviceId;
		this.$nextTick(() => {
			let player = new EZUIPlayer("myPlayer");
		});
		// setInterval(() => {
		// 	if (this.DO) {
		// 		this.DO.push(Math.random() * 100);
		// 	}
		// }, 1000);
	},
	components: {
		LineChart,
	},
	data() {
		return {
			isFirst: true,
			client: null, //MQTT实例
			prePoint: null, //前一刻船图标的位置
			x: null,
			y: null,
			map: null,
			// lineChartData: lineChartData,
			deviceId: null,
			status_data: null,
			status_data: {}, //状态数据
			detect_data: {}, //探测数据
			PH: [],
			ec: [], //电导
			td: [], //浊度
			wt: [], //水温
			DO: [], //溶解氧
		};
	},
	computed: {
		Point() {
			const { x, y } = this;
			return [x, y];
		},
	},
	watch: {
		Point(value) {
			if (value[0] != 114.431408) {
				this.initPoint();
			}
		},
	},
	// computed: {
	// 	status() {
	// 		return this.$store.state.ship.status_data;
	// 	}
	// },
	// watch: {
	// 	status(value) {
	// 		this.status_data = value;
	// 	}
	// },
	methods: {
		//MQTT连接初始化
		initMqtt() {
			const ID = Math.random().toFixed(3);
			this.client = new MQTT.Client("47.97.183.24", Number(8083), ID);
			console.log(this.client);
			this.client.onMessageArrived = this.onMessageArrived;
			this.client.onConnectionLost = this.onConnectionLost;
			this.client.connect({ onSuccess: this.onConnect });
		},
		//MQTT连接成功
		onConnect() {
			console.log("onConnect");
			//订阅状态数据
			this.client.subscribe(`status_data_${this.deviceId}`);
			//订阅探测数据
			this.client.subscribe(`detect_data_${this.deviceId}`);
		},
		//MQTT接收到消息
		onMessageArrived(message) {
			//	console.log(`onMessageArrived:${message.payloadString}`);
			console.log(`"topic" ${message.topic}`);
			//接收状态数据
			if (`${message.topic}` == `status_data_${this.deviceId}`) {
				this.status_data = JSON.parse(message.payloadString);

				console.log(this.status_data);
				if (this.status_data && this.status_data.current_lng_lat) {
					this.x = this.status_data.current_lng_lat[0];
					this.y = this.status_data.current_lng_lat[1];
				}
				if (!this.map) {
					this.initMap();
				}
				// if (this.status_data.home_lng_lat) {
				// 	this.home(
				// 		this.status_data.home_lng_lat[0],
				// 		this.status_data.home_lng_lat[1]
				// 	);
				// }
			}
			//接收探测数据
			if (`${message.topic}` == `detect_data_${this.deviceId}`) {
				this.detect_data = JSON.parse(message.payloadString);
				this.PH.push(this.detect_data.water.ph);
				this.ec.push(this.detect_data.water.ec);
				this.td.push(this.detect_data.water.td);
				this.wt.push(this.detect_data.water.wt);
				this.DO.push(this.detect_data.water.doDo);

				console.log(this.detect_data);
			}
		},
		//MQTT断开连接
		onConnectionLost(responseObject) {
			console.log(responseObject);
			if (responseObject.errorCode !== 0) {
				console.log("onConnectionLost:" + responseObject.errorMessage);
			}
		},
		initMap() {
			if (!this.x && !this.y) {
				this.x = 114.431408;
				this.y = 30.523486;
			}
			var map = new AMap.Map("container", {
				zoom: 13,
				center: [this.x, this.y],
				mapStyle: "amap://styles/001a637581603985681831e1471630a5", //设置地图的显示样式
			});
			this.map = map;
		},
		//实时更新船的位置
		initPoint() {
			if (this.prePoint) {
				this.map.remove(this.prePoint);
			}
			var icon = new AMap.Icon({
				size: new AMap.Size(40, 50), // 图标尺寸
				image: "http://101.37.119.148:3000/ship.png", // Icon的图像
				imageSize: new AMap.Size(40, 50), // 根据所设置的大小拉伸或压缩图片
			});

			// 将 Icon 实例添加到 marker 上:
			var marker = new AMap.Marker({
				position: new AMap.LngLat(this.x, this.y),
				offset: new AMap.Pixel(-25, -25),
				icon: icon,
				title: "行星轮",
				zoom: 13,
			});
			this.prePoint = marker;
			this.map.add(marker);
			if (this.isFirst) {
				this.isFirst = false;
				this.map.setFitView();
			}
		},
		//测试方法
		initTest() {
			this.x = 115.431408;
			this.y = 30.523486;
			setInterval(() => {
				this.x += 0.01;
				this.y += 0.01;
				this.initPoint(this.x, this.y);
			}, 2000);
		},
		goOperation() {
			this.$router.push({
				path: `/ship/operation/${this.deviceId}`,
			});
		},
		goIndex() {
			this.$router.push({
				path: `/equipment/ship/list`,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.body {
	width: 100vw;
	height: 100vh;
	//background-color: #223957;
	background: rgb(29, 29, 29);
	display: flex;
	justify-content: center;
	align-items: center;
	.content {
		width: 99vw;
		height: 99vh;
		border: 1px solid #4081c4;
		position: relative;
		.menu1 {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 18vw;
			top: 2vh;
			background: linear-gradient(0deg, #ffa128 0%, #b57700 50%, #ffa128 100%);
			color: #fff;
			font-size: 1.5vh;
			width: 7vh;
			height: 3vh;
			font-family: Source Han Sans CN;
			font-weight: bold;
			opacity: 0.8;
			text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.6);
			cursor: pointer;
		}
		.menu2 {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 12vw;
			top: 2vh;
			background: #245098;
			border: 1px solid #4081c4;
			color: #fff;
			font-size: 1.5vh;
			width: 7vh;
			height: 3vh;

			font-family: Source Han Sans CN;
			font-weight: bold;
			opacity: 0.8;
			text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.6);
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
			border: 1px solid #4081c4;
			color: #fff;
			font-size: 1.5vh;
			width: 7vh;
			height: 3vh;

			font-family: Source Han Sans CN;
			font-weight: bold;
			opacity: 0.8;
			text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.6);
			cursor: pointer;
		}
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

			.tip-item {
				display: flex;
				justify-content: space-around;
				width: 39vw;
				margin: auto;
				.item1,
				.item2,
				.item3 {
					width: 8vw;
					height: 6vh;
					background: rgba(16, 90, 178, 0.38);
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					.text {
						font-size: 0.5vw;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #0096ff;
					}
					.num {
						font-size: 0.5vw;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #ffffff;
					}
				}
			}
		}
		.content-middle {
			display: flex;
		}
		.left1 {
			width: 26vw;
			height: 22vh;

			//background-color: #009cff;
			margin-top: -11vh;
			margin-left: 2vw;
			position: relative;
			.title {
				position: absolute;
				left: 2vw;
				top: 2vh;
				font-size: 1vw;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #0096ff;
			}
			.time {
				position: absolute;
				left: 9vw;
				top: 5vh;
				font-size: 1vw;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #0096ff;
			}
			.data-list {
				position: absolute;
				left: 9vw;
				top: 8vh;
				width: 15vw;
				height: 10vh;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				.data-item {
					width: 5vw;
					display: flex;
					justify-content: space-around;
					font-size: 1vw;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #0096ff;
					.item-state {
						color: #ffffff;
						opacity: 0.74;
					}
					.item-num {
						color: #ffffff;
					}
				}
			}
		}
		.left2 {
			width: 26vw;
			height: 42vh;
			//background-color: rosybrown;
			margin-top: 3vh;
			margin-left: 2vw;
			position: relative;
			.title {
				position: absolute;
				left: 2vw;
				top: 2vh;
				font-size: 1vw;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #0096ff;
			}
			.icon-list {
				position: absolute;
				left: 2vw;
				top: 4vh;
				width: 22vw;
				height: 32vh;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				.icon-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin: 2vh;

					img {
						width: 4vh;
						height: 4vh;
					}
					.text {
						margin-top: 0.5vh;
						font-size: 1vh;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #ffffff;
					}
					.num {
						margin-top: 0.5vh;
						font-size: 1vh;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #ff8045;
					}
				}
			}
		}
		.middle {
			width: 39vw;
			height: 55vh;
			//background-color: yellowgreen;
			margin-top: 1vh;
			margin-left: 2vw;
		}
		.right1 {
			width: 26vw;
			height: 23vh;
			//background-color: chartreuse;
			margin-top: -7vh;
			margin-left: 2vw;
		}
		.right2 {
			position: relative;
			width: 26vw;
			height: 30vh;
			//background-color: magenta;
			margin-top: 10vh;
			margin-left: 2vw;
			.title {
				position: absolute;
				left: 2vw;
				top: 2vh;
				font-size: 1vw;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #0096ff;
			}
			.data-list {
				position: absolute;
				left: 1vw;
				top: 4vh;
				width: 24vw;
				height: 22vh;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				.data-item {
					width: 8vw;
					height: 4vw;
					display: flex;
					justify-content: center;
					align-items: center;
					.item-title {
						font-size: 1vw;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #a9ddee;
					}
					.item-num {
						font-size: 1vw;
						font-family: DIN;
						font-weight: bold;
						color: #ffffff;
						background: linear-gradient(0deg, #00a8ff 0%, #8fdffe 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}
			}
		}
		.bottom {
			position: relative;
			width: 95vw;
			height: 22vh;
			//background-color: #fff;
			margin: auto;
			margin-top: 2vh;
			.title {
				position: absolute;
				left: 2vw;
				top: 2vh;
				font-size: 1vw;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #0096ff;
			}
			.chart-list {
				width: 95vw;
				height: 22vh;
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
		}
	}
}
</style>
