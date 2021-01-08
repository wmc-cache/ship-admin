<template>
	<container>
		<div class="ship-detail-content">
			<div class="ship-detail-top">
				<div class="ship-detail-logo">
					<div class="ship-detail-logo-title">无人船检测平台</div>
					<div class="ship-detail-logo-bottom">
						<img
							class="ship-detail-logo-image"
							src="../../assets/行星轮科技.png"
							alt=""
						>
						<div class="ship-detail-logo-count">
							<div class="ship-detail-logo-count1">无人船总台数：65</div>
							<div class="ship-detail-logo-count2">无人船运行总台数：65</div>
						</div>
					</div>
				</div>
				<div class="ship-detail-state">
					<div class="ship-detail-state-item1">
						<div class="ship-detail-state-circle" />
						<div class="ship-detail-state-object">
							<div class="ship-detail-state-key">无人船船号</div>
							<div class="ship-detail-state-value">{{status_data.deviceId}}</div>
						</div>
					</div>
					<div class="ship-detail-state-item2">
						<div class="ship-detail-state-circle" />
						<div class="ship-detail-state-object">
							<div class="ship-detail-state-key">速度</div>
							<div class="ship-detail-state-value">{{status_data.speed}}</div>
						</div>
					</div>
					<div class="ship-detail-state-item3">
						<div class="ship-detail-state-circle" />
						<div class="ship-detail-state-object">
							<div class="ship-detail-state-key">当前经纬度</div>
							<div class="ship-detail-state-value">{{status_data.current_lng_lat}}</div>
						</div>
					</div>
					<div class="ship-detail-state-item4">
						<div class="ship-detail-state-circle" />
						<div class="ship-detail-state-object">
							<div class="ship-detail-state-key">电池电量</div>
							<div class="ship-detail-state-value">{{status_data.dump_energy}}</div>
						</div>
					</div>
					<el-button
						style="margin-left:100px"
						@click="operation"
						type="info"
						plain
					>无人船控制</el-button>
				</div>
			</div>

			<div class="ship-detail-middle">
				<div class="ship-detail-data">
					<div class="ship-detail-data-title">状态数据</div>
					<div class="ship-detail-data-item">
						<div class="ship-detail-data-item1">液位:{{status_data.liquid_level|valueFilter}}</div>
						<div class="ship-detail-data-item2">漏水:{{status_data.b_leakage|valueFilter }}</div>
						<div class="ship-detail-data-item3">姿态:{{ status_data.attitude_angle|valueFilter}}</div>
						<div class="ship-detail-data-item4">充电状态:{{status_data.charge_energy|valueFilter}}</div>
						<div class="ship-detail-data-item5">采样深度:{{status_data.sampling_depth|valueFilter}}</div>
						<div class="ship-detail-data-item6">4G卡流量:{{status_data.data_flow|valueFilter}}</div>
						<div class="ship-detail-data-item7">采样量:{{status_data.sampling_count|valueFilter}}</div>
						<div class="ship-detail-data-item8">船舱容量状态:{{status_data.capicity|valueFilter}}</div>
						<div class="ship-detail-data-item9">船头方向:{{status_data.speed|valueFilter}}</div>
						<div class="ship-detail-data-item10">归位状态:{{status_data.b_homing|valueFilter}}</div>
						<div class="ship-detail-data-item11">在线／离线:{{status_data.b_online|valueFilter}}</div>
						<!-- <div class="ship-detail-data-item12">4G卡流量：100G</div> -->
					</div>
				</div>
				<div id="map" />
				<div class="ship-detail-video">

					<video
						class="ship-detail-video-top"
						id="myPlayer"
						controls
						playsInline
						autoplay
					>
						<source src="https://hls01open.ys7.com/openlive/fe78747055f6492ab39474f5b38916fc.m3u8" />
					</video>

				</div>
			</div>

			<div class="ship-detail-bottom">
				<div class="ship-detail-bigData">
					<div class="ship-detail-bigData-title">监测数据</div>
					<div class="ship-detail-bigData-item1">
						<div class="ship-detail-bigData-item1-title">水质数据</div>
						<div class="ship-detail-bigData-item1-content1">酸碱度：21</div>
						<div class="ship-detail-bigData-item1-content2">溶解氧：6</div>
						<div class="ship-detail-bigData-item1-content3">化学需氧量：21</div>
						<div class="ship-detail-bigData-item1-content4"> 电导率：6</div>
						<div class="ship-detail-bigData-item1-content5">浊度 ：21</div>
						<div class="ship-detail-bigData-item1-content6">氨氮 ：6</div>
					</div>
					<div class="ship-detail-bigData-item2">
						<div class="ship-detail-bigData-item2-title">气象数据</div>
						<div class="ship-detail-bigData-item2-content1">风速：21</div>
						<div class="ship-detail-bigData-item2-content2">风向：6</div>
						<div class="ship-detail-bigData-item2-content3">降雨量：21</div>
						<div class="ship-detail-bigData-item2-content4">光照度：6</div>
						<div class="ship-detail-bigData-item2-content5">温度：21</div>
						<div class="ship-detail-bigData-item2-content6">湿度：6</div>
					</div>
				</div>
				<div class="ship-detail-handle">
					<div class="ship-detail-handle-item">一键喊话</div>
					<div class="ship-detail-handle-item">灯</div>
					<div class="ship-detail-handle-item">水泵</div>
					<div class="ship-detail-handle-item">采样深度</div>
					<div class="ship-detail-handle-item">液位</div>
					<div class="ship-detail-handle-item">电机</div>
					<div class="ship-detail-handle-item">充电</div>
					<div class="ship-detail-handle-item">灯</div>
				</div>
			</div>
		</div>

	</container>
</template>

<script>
import Container from "@/components/Container/Container.vue";
import { saveDetectData } from "@/api/ship";
import mqtt from "mqtt";
export default {
	components: {
		Container
	},
	data() {
		return {
			map: null,
			x: null, //当前船的实时位置
			y: null,
			client: null,
			deviceId: null,
			prePoint: null, //前一刻图标的位置
			status_data: {},
			detect_data: {},
			connection: {
				host: "47.97.183.24",
				port: 8083,
				endpoint: "/mqtt",
				clean: true, // 保留会话
				connectTimeout: 4000, // 超时时间
				reconnectPeriod: 4000, // 重连时间间隔
				// 认证信息
				clientId: "",
				username: "wu",
				password: "123"
			}
		};
	},
	filters: {
		valueFilter(value) {
			if (value) {
				return value;
			} else {
				return "暂无";
			}
		}
	},
	created() {},
	mounted() {
		this.connection.clientId = this.$store.state.user.name;
		this.deviceId = this.$route.params.deviceId;
		//this.initTest();
		this.initMqtt();
		if (!this.map) {
			this.initMap();
		}
		let player = new EZUIPlayer("myPlayer");
	},
	unmounted() {},
	methods: {
		initTest() {
			this.x = 114.392999;
			this.y = 30.578571;
			setInterval(() => {
				this.x += 0.0001;
				this.y += 0.0001;
				this.initPoint(this.x, this.y);
			}, 2000);
		},
		initMqtt() {
			const { host, port, endpoint, ...options } = this.connection;
			const id = localStorage.getItem("deviceId");
			const connectUrl = `ws://${host}:${port}${endpoint}`;
			try {
				this.client = mqtt.connect(connectUrl, options);
				console.log("client", this.client);
			} catch (error) {
				console.log("mqtt.connect error", error);
			}
			this.client.on("connect", () => {
				//console.log("Connection succeeded!");
			});
			this.client.on("error", error => {
				console.log("Connection failed", error);
			});
			this.client.on("message", (topic, message) => {
				if (topic == `status_data_${this.deviceId}`) {
					this.status_data = JSON.parse(message);
					//console.log(topic, JSON.parse(message));
					if (this.status_data && this.status_data.current_lng_lat) {
						this.x = this.status_data.current_lng_lat[0];
						this.y = this.status_data.current_lng_lat[1];
					}
					if (!this.map) {
						this.initMap();
					}
					this.initPoint();
				}
				if (topic == `detect_data_${this.deviceId}`) {
					this.detect_data = JSON.parse(message);
				}
			});

			this.client.subscribe(`status_data_${this.deviceId}`, 0, (error, res) => {
				if (error) {
					console.log("Subscribe to topics error", error);
					return;
				}

				console.log(`status_data_${this.deviceId}`, res);
			});
			this.client.subscribe(`detect_data_${this.deviceId}`, 0, (error, res) => {
				if (error) {
					console.log("Subscribe to topics error", error);
					return;
				}

				console.log(`detect_data_${this.deviceId}`, res);
			});
		},
		initMap() {
			if (!this.x && !this.y) {
				this.x = 114.431408;
				this.y = 30.523486;
			}
			var map = new AMap.Map("map", {
				zoom: 13,
				center: [this.x, this.y]
			});

			this.map = map;
			// 同时引入工具条插件，比例尺插件和鹰眼插件
			AMap.plugin(
				["AMap.ToolBar", "AMap.Scale", "AMap.HawkEye", "AMap.MapType"],
				function() {
					// 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
					map.addControl(new AMap.ToolBar());

					// 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
					map.addControl(new AMap.Scale());

					// 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
					map.addControl(new AMap.HawkEye({ isOpen: true }));

					// 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
					map.addControl(new AMap.MapType());
				}
			);
		},
		initPoint() {
			if (this.prePoint) {
				this.map.remove(this.prePoint);
			}
			var icon = new AMap.Icon({
				size: new AMap.Size(40, 50), // 图标尺寸
				image: "http://101.37.119.148:3000/ship.png", // Icon的图像
				imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
			});

			// 将 Icon 实例添加到 marker 上:
			var marker = new AMap.Marker({
				position: new AMap.LngLat(this.x, this.y),
				offset: new AMap.Pixel(-25, -25),
				icon: icon, // 添加 Icon 实例
				title: "北京",
				zoom: 13
			});
			this.prePoint = marker;
			this.map.add(marker);
			if (!this.prePoint) {
				this.map.setFitView();
			}
		},
		operation() {
			//this.map.destroy();
			this.$router.push({
				path: `/ship/operation/${this.deviceId}`
			});
		}
	}
};
</script>

<style lang="scss">
div.v-modal {
	display: none;
}
.ship-detail-content {
	background-color: #434446;
	height: 100%;
}

@media (max-device-width: 1440px) {
	.ship-detail-top {
		width: 1440px;
		height: 100px;
		display: flex;
	}
}
@media (min-device-width: 1441px) {
	.ship-detail-top {
		width: 1920px;
		height: 100px;
		display: flex;
	}
}
.ship-detail-logo {
	width: 20%;
	height: 100%;
	border: 1px solid #1d1d1d;

	&-title {
		margin-top: 10px;
		margin-left: 10px;
		font-size: 21px;
		font-weight: 500;
		color: #ffffff;
	}
	&-bottom {
		display: flex;
	}
	&-image {
		display: block !important;
		width: 180px;
		height: 70px;
		margin-left: -25px;
	}
	&-count {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	&-count1 {
		font-size: 10px;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #ffffff;
		white-space: nowrap;
	}
	&-count2 {
		margin-top: 5px;
		font-size: 10px;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #84a64f;
	}
}
.ship-detail-state {
	width: 80%;
	height: 100px;
	border: 1px solid #1d1d1d;
	display: flex;
	align-items: center;
	&-circle {
		width: 80px;
		height: 80px;
		background: #84a64f;
		border-radius: 50%;
		opacity: 1;
		margin-left: 40px;
	}
	&-item1,
	&-item2,
	&-item3,
	&-item4 {
		display: flex;
	}
	&-object {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 10px;
		color: #fff;
	}
}
@media (max-device-width: 1440px) {
	.ship-detail-middle {
		height: 485px;
		width: 1440px;
		display: flex;
	}
	#map {
		width: 792px;
		height: 100%;
		border: 1px solid #1d1d1d;
	}
}
@media (min-device-width: 1441px) {
	.ship-detail-middle {
		height: 582px;
		width: 1920px;
		display: flex;
	}
	#map {
		width: 1272px;
		height: 100%;
		border: 1px solid #1d1d1d;
	}
}

.ship-detail-data {
	width: 20%;
	height: 100%;
	border: 1px solid #1d1d1d;
	&-title {
		font-size: 13px;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #ffffff;
		margin-left: 15px;
		margin-top: 15px;
	}
	&-item {
		padding: 10px;
		display: flex;
		justify-content: space-around;
		align-items: space-around;
		flex-wrap: wrap;
		height: 100%;
		margin-top: 10px;
	}
	&-item1,
	&-item2,
	&-item3,
	&-item4,
	&-item5,
	&-item6,
	&-item7,
	&-item8,
	&-item9,
	&-item10,
	&-item11,
	&-item12 {
		width: 122px;
		height: 32px;
		font-size: 14px;
		background: #84a64f;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		white-space: nowrap;
	}
}

.ship-detail-video {
	width: 360px;
	height: 100%;
	border: 1px solid #1d1d1d;
	&-top {
		height: 50%;
		width: 100%;
	}
}
@media (max-device-width: 1440px) {
	.ship-detail-bottom {
		display: flex;
		height: 315px;
	}
}
@media (min-device-width: 1441px) {
	.ship-detail-bottom {
		display: flex;
		height: 398px;
	}
}

.ship-detail-bigData {
	border: 1px solid #1d1d1d;
	width: 75%;
	height: 100%;
	&-title {
		margin-left: 15px;
		margin-top: 15px;
		font-size: 13px;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #ffffff;
	}
	&-item1 {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 10px;
		&-title {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 115px;
			height: 32px;
			background: #84a64f;
			// margin-left: 15px;
			// margin-top: 15px;
			color: #fff;
		}
		&-content1,
		&-content2,
		&-content3,
		&-content4,
		&-content5,
		&-content6 {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			width: 115px;
			height: 32px;
		}
	}
	&-item2 {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 30px;
		&-title {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 115px;
			height: 32px;
			background: #84a64f;
			color: #fff;
		}
		&-content1,
		&-content2,
		&-content3,
		&-content4,
		&-content5,
		&-content6 {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			width: 115px;
			height: 32px;
		}
	}
}
.ship-detail-handle {
	border: 1px solid #1d1d1d;
	padding: 20px;
	width: 25%;
	height: 100%;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	&-item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 115px;
		height: 32px;
		background: #84a64f;
		color: #fff;
	}
}
</style>
