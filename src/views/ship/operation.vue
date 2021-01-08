<template>
	<div class="body">
		<div class="container">
			<div id="map">
			</div>

			<div class="operation">
				<div
					class="content"
					v-if="sureMap"
				>
					无人船手动操控设置:
					<el-checkbox-group
						v-model="checkedCities"
						:min="0"
						:max="3"
					>
						<el-checkbox
							v-for="city in cities"
							:label="city"
							:key="city"
						>{{city}}</el-checkbox>
					</el-checkbox-group>
				</div>
				<div
					style="color:#fff"
					v-else
					class="tip"
				>
					请点击湖中心一点确定湖的轮廓
				</div>
				<div class="ship-detail-video-bottom">
					<div class="ship-detail-video-bottom-title">当前方向:{{ tip }}</div>
					<div
						ref="direction"
						class="ship-detail-video-bottom-direction"
					>
						<div
							class="ship-detail-video-bottom-top"
							@touchstart="direction('top1')"
							@mousedown="direction('top1')"
						>
							<div class="ship-detail-video-bottom-top-content" />
						</div>

						<div class="ship-detail-video-bottom-middle">
							<div
								class="ship-detail-video-bottom-left"
								@touchstart="direction('left1')"
								@mousedown="direction('left1')"
							>
								<div class="ship-detail-video-bottom-left-content" />
							</div>
							<div
								class="ship-detail-video-bottom-right"
								@touchstart="direction('right1')"
								@mousedown="direction('right1')"
							>
								<div class="ship-detail-video-bottom-right-content" />
							</div>
						</div>

						<div
							class="ship-detail-video-bottom-bottom"
							@touchstart="direction('bottom1')"
							@mousedown="direction('bottom1')"
						>
							<div class="ship-detail-video-bottom-bottom-content" />
						</div>
					</div>

					<div
						class="ship-detail-video-bottom-title2"
						@click="changeDirection"
					>切换方向</div>
					<button @click="stop">暂停</button>
				</div>
			</div>

		</div>
	</div>

</template>

<script>
const cityOptions = ["多点模式", "自动返航", "定点"];
import mqtt from "mqtt";
import Axios from "axios";
import { getMapList } from "../../api/ship";
export default {
	name: "operation",
	data() {
		return {
			tip: "停止",
			timerTop: null,
			timerLeft: null,
			timerBottom: null,
			timerRight: null,
			directionState: 1,
			deviceId: null,
			checkedCities: [],
			cities: cityOptions,
			map: null,
			client: null,
			x: null, //当前船的实时位置
			y: null,
			prePoint: null, //前一刻图标的位置
			status_data: {},
			detect_data: {},
			pool_info: {},
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
			},
			doubleList: [],
			doublePreX: null,
			doublePreY: null,
			sureMap: false,
			fix_point: 0,
			back_home: 0
		};
	},
	mounted() {
		//const data = await Axios.get("/admin/xxl/map/list", { mapId: "1" });
		//console.log("???", data.data.data.mapList);
		this.connection.clientId = this.$store.state.user.name;
		this.deviceId = this.$route.params.deviceId;
		//this.initTest();
		//this.initDocument();
		this.initMqtt();
		if (!this.map) {
			this.initMap();
		}
	},
	watch: {
		pool_info(value) {
			this.sureMap = true;
			//this.draw(value.pool_lng_lats);
		},
		checkedCities(value) {
			this.back_home = 0;
			this.fix_point = 0;
			value.forEach(ele => {
				if (ele == "定点") {
					this.fix_point = 1;
				}
				if (ele == "自动返航") {
					this.back_home = 1;
				}
			});

			console.log(this.back_home, this.fix_point);
		}
	},

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

				if (topic == `pool_info_${this.deviceId}`) {
					this.pool_info = JSON.parse(message);
					console.log(topic, JSON.parse(message));
					console.log("mapId", this.pool_info.mapId);

					if (this.pool_info.mapId) {
						getMapList(this.pool_info.mapId).then(res => {
							console.log(res.data.mapList.mapData);
							this.draw(res.data.mapList.mapData);
						});
					}
				}
				if (topic == `path_planning_${this.deviceId}`) {
					console.log(topic, JSON.parse(message));
					// JSON.parse(message).sampling_points.forEach(ele => {
					// 	this.icon(ele[0], ele[1]);
					// });
				}
			});

			this.client.subscribe(`status_data_${this.deviceId}`, 0, (error, res) => {
				if (error) {
					console.log("Subscribe to topics error", error);
					return;
				}

				console.log(`status_data_${this.deviceId}`, res);
			});
			this.client.subscribe(
				`pool_info_${this.deviceId}`,
				{ qos: 2 },
				(error, res) => {
					if (error) {
						console.log("Subscribe to topics error", error);
						return;
					}

					console.log(`pool_info_${this.deviceId}`, res);
				}
			);
			this.client.subscribe(`detect_data_${this.deviceId}`, 0, (error, res) => {
				if (error) {
					console.log("Subscribe to topics error", error);
					return;
				}

				console.log(`detect_data_${this.deviceId}`, res);
			});
			this.client.subscribe(
				`path_planning_${this.deviceId}`,
				0,
				(error, res) => {
					if (error) {
						console.log("Subscribe to topics error", error);
						return;
					}

					console.log(`path_planning_${this.deviceId}`, res);
				}
			);
		},
		initMap() {
			if (!this.x && !this.y) {
				this.x = 114.431408;
				this.y = 30.523486;
			}
			var map = new AMap.Map("map", {
				zoom: 13,
				scrollWheel: false,
				center: [this.x, this.y]
			});
			map.on("click", this.clickMap);
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
					//map.addControl(new AMap.HawkEye({ isOpen: true }));

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

			//this.map.setFitView();
		},
		icon(x, y) {
			const planIcon = new AMap.Icon({
				size: new AMap.Size(40, 50), // 图标尺寸
				image: "http://101.37.119.148:3000/money.png", // Icon的图像
				imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
			});
			const planMarker = new AMap.Marker({
				position: new AMap.LngLat(x, y),
				offset: new AMap.Pixel(-30, -30),
				icon: planIcon,
				title: "北京",
				zoom: 13
			});
			this.map.add(planMarker);
		},
		draw(value) {
			const list = JSON.parse(value);
			//console.log("|||||||||", typeof JSON.parse(list));
			list.forEach(ele => {
				ele = new AMap.LngLat(ele[0], ele[1]);
			});
			var polyline1 = new AMap.Polyline({
				path: list
			});
			// 创建覆盖物群组，传入覆盖物组成的数组
			var overlayGroup = new AMap.OverlayGroup([polyline1]);

			// 对此覆盖物群组设置同一属性
			overlayGroup.setOptions({
				strokeColor: "red",
				strokeWeight: 5
			});
			this.map.add(overlayGroup);
			//this.map.setFitView();
		},
		clickMap(e) {
			if (!this.sureMap) {
				this.sendMqtt_pool_click({
					deviceId: this.deviceId,
					lng_lat: [e.lnglat.lng, e.lnglat.lat],
					zoom: e.target.getZoom()
				});
				return;
			}
			console.log(e.lnglat.lng, e.lnglat.lat, e.pixel);
			let double;
			this.checkedCities.forEach(ele => {
				if (ele == "多点模式") {
					double = true;
				}
			});
			if (double) {
				this.double(e);
			} else {
				this.single(e);
			}
		},
		double(e) {
			this.$confirm("继续选点？")
				.then(_ => {
					console.log("double");
					if (!this.doublePreX && !this.doublePreY) {
						this.doublePreX = this.x;
						this.doublePreY = this.y;
					}
					// const planIcon = new AMap.Icon({
					// 	size: new AMap.Size(40, 50), // 图标尺寸
					// 	image: "http://101.37.119.148:3000/ship.png", // Icon的图像
					// 	imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
					// });
					// const planMarker = new AMap.Marker({
					// 	position: new AMap.LngLat(e.lnglat.lng, e.lnglat.lat),
					// 	offset: new AMap.Pixel(-25, -25),
					// 	icon: planIcon,
					// 	title: "北京",
					// 	zoom: 13
					// });
					let List = [
						new AMap.LngLat(this.doublePreX, this.doublePreY),
						new AMap.LngLat(e.lnglat.lng, e.lnglat.lat)
					];
					var polyline1 = new AMap.Polyline({
						path: List
					});
					var overlayGroup = new AMap.OverlayGroup([polyline1]);
					overlayGroup.setOptions({
						strokeColor: "red",
						strokeWeight: 1
					});
					//this.map.add(planMarker);
					this.map.add(overlayGroup);
					this.doublePreX = e.lnglat.lng;
					this.doublePreY = e.lnglat.lat;
					this.doubleList.push([e.lnglat.lng, e.lnglat.lat]);
					console.log(this.doubleList);
				})
				.catch(_ => {
					if (this.doubleList.length != 0) {
						this.$confirm("确认前往这些区域？")
							.then(_ => {
								this.sendMqtt_user_lng_lat({
									deviceId: this.deviceId,
									lng_lat: this.doubleList,
									zoom: e.target.getZoom(),
									meter_pix: e.target.getResolution(),
									config: {
										back_home: this.back_home,
										fix_point: this.fix_point
									}
									//pix_location: [e.pixel.x, e.pixel.y]
								});
							})
							.catch(_ => {
								location.reload();
							});
					}
				});
		},
		single(e) {
			this.$confirm("确认前往该区域？")
				.then(_ => {
					// const planIcon = new AMap.Icon({
					// 	size: new AMap.Size(40, 50), // 图标尺寸
					// 	image: "http://101.37.119.148:3000/ship.png", // Icon的图像
					// 	imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
					// });
					// const planMarker = new AMap.Marker({
					// 	position: new AMap.LngLat(e.lnglat.lng, e.lnglat.lat),
					// 	offset: new AMap.Pixel(-25, -25),
					// 	icon: planIcon,
					// 	title: "北京",
					// 	zoom: 13
					// });
					let List = [
						new AMap.LngLat(this.x, this.y),
						new AMap.LngLat(e.lnglat.lng, e.lnglat.lat)
					];
					var polyline1 = new AMap.Polyline({
						path: List
					});
					var overlayGroup = new AMap.OverlayGroup([polyline1]);
					overlayGroup.setOptions({
						strokeColor: "red",
						strokeWeight: 1
					});
					//this.map.add(planMarker);
					this.map.add(overlayGroup);

					this.sendMqtt_user_lng_lat({
						deviceId: this.deviceId,
						lng_lat: [[e.lnglat.lng, e.lnglat.lat]],
						zoom: e.target.getZoom(),
						meter_pix: e.target.getResolution(),
						config: {
							back_home: this.back_home,
							fix_point: this.fix_point
						}

						//pix_location: [e.pixel.x, e.pixel.y]
					});
					console.log("开始执行命令");
				})
				.catch(_ => {
					console.log("取消");
				});
		},
		sendMqtt_pool_click(data) {
			let payload = JSON.stringify(data);
			let topic = `pool_click_${this.deviceId}`;

			this.client.publish(topic, payload, 0, error => {
				if (error) {
					console.log("Publish error", error);
				}
				console.log(topic);
				console.log(data);
			});
		},
		sendMqtt_control_data(data) {
			let payload = JSON.stringify(data);
			let topic = `control_data_${this.deviceId}`;

			this.client.publish(topic, payload, 0, error => {
				if (error) {
					console.log("Publish error", error);
				}
				console.log(topic);
				console.log(data);
			});
		},
		sendMqtt_user_lng_lat(data) {
			let payload = JSON.stringify(data);
			let topic = `user_lng_lat_${this.deviceId}`;

			this.client.publish(topic, payload, 0, error => {
				if (error) {
					console.log("Publish error", error);
				}
				console.log(topic);
				console.log(data);
			});
		},
		direction(value) {
			if (value == "top1") {
				console.log("按下");
				this.tip = "向前";
				this.sendMqtt_control_data({
					deviceId: this.deviceId,
					move_direction: 0
				});
			}
			if (value == "left1") {
				console.log("按下");
				this.tip = "向左";
				this.sendMqtt_control_data({
					deviceId: this.deviceId,
					move_direction: 90
				});
			}
			if (value == "bottom1") {
				console.log("按下");
				this.tip = "向后";
				this.sendMqtt_control_data({
					deviceId: this.deviceId,
					move_direction: 180
				});
			}
			if (value == "right1") {
				console.log("按下");
				this.tip = "向右";
				this.sendMqtt_control_data({
					deviceId: this.deviceId,
					move_direction: 270
				});
			}
		},
		stop() {
			this.tip = "暂停";
			this.sendMqtt_control_data({
				deviceId: this.deviceId,
				move_direction: -1
			});
		},
		changeDirection() {
			if (this.directionState == 1) {
				this.$refs.direction.style.transform = "rotate(45deg)";
				this.directionState = 2;
				return;
			}
			if (this.directionState == 2) {
				this.$refs.direction.style.transform = "rotate(0)";
				this.directionState = 1;
				return;
			}
		}
	}
};
</script>

<style  lang="scss" scoped>
.body {
	width: 100%;
	height: 100%;
	background-color: #434446;
}
.container {
	width: 1100px;
	margin: auto;
	background-color: #434446;
}
#map {
	width: 1100px;
	height: 400px;
	border: 1px solid #1d1d1d;
}
.content {
	margin-top: 20px;
	color: #fff;
}

.ship-detail-video {
	&-bottom {
		width: 400px;
		&-title {
			color: #fff;
			margin-left: 10px;
		}
		&-title2 {
			color: #fff;
			margin-left: 220px;
			margin-top: -10px;
		}
		&-direction {
			width: 200px;
			height: 200px;
			margin: auto;
		}
		&-middle {
			display: flex;
		}
		&-top,
		&-bottom,
		&-left,
		&-right {
			margin: auto;
			width: 50px;
			height: 50px;
			background: #ffffff;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
		}
		&-top-content {
			width: 0;
			height: 0;
			border: 10px solid;
			border-color: transparent transparent #434446;
			margin-top: -12px;
		}
		&-bottom-content {
			width: 0;
			height: 0;
			border: 10px solid;
			border-color: #434446 transparent transparent transparent;
			margin-bottom: -12px;
		}
		&-left-content {
			width: 0;
			height: 0;
			border: 10px solid;
			border-color: transparent #434446 transparent transparent;
			margin-left: -12px;
		}
		&-right-content {
			width: 0;
			height: 0;
			border: 10px solid;
			border-color: transparent transparent transparent #434446;
			margin-right: -12px;
		}
	}
}
</style>
