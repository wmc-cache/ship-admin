<template>

	<div class="body">

		<el-button
			class="fixed"
			type="primary"
			@click="openVideo"
		>
			切换视频与地图
		</el-button>

		<el-button
			class="fixed2"
			type="primary"
			@click="openVideo2"
		>
			画中画模式
		</el-button>
		<el-button
			class="fixed3"
			type="danger"
			@click="shipGo"
		>
			启动
		</el-button>

		<el-progress
			v-if="message"
			class="fixed4"
			:percentage="message.progress"
		></el-progress>
		<div
			class="fixed5"
			v-if="message"
			style="color:#0096ff;"
		>
			{{message.distance}}m
		</div>

		<!-- 设置对话框 -->
		<el-dialog
			title="设置"
			:visible.sync="dialogVisible"
			width="50%"
			:before-close="handleClose"
		>
			<el-button
				type="primary"
				@click="reset"
			>重置</el-button>

			<el-button
				type="danger"
				@click="restart"
			>
				重启
			</el-button>

			<el-button
				@click="end"
				type="danger"
			>
				关机
			</el-button>

			<el-alert
				title="时间设置类别"
				type="success"
				:closable="false"
			/>

			pid间隔:

			<el-input
				v-model="height_setting.pid_interval"
				placeholder=""
			/>
			检查船状态间隔:

			<el-input
				v-model="height_setting.check_status_interval"
				placeholder=""
			/>
			检查网络连接状态间隔:

			<el-input
				v-model="height_setting.check_network_interval"
				placeholder=""
			/>
			抽水时间:
			<el-input
				v-model="height_setting.draw_time"
				placeholder=""
			/>
			开机前等待时间:

			<el-input
				v-model="height_setting.start_sleep_time"
				placeholder=""
			/>
			电机初始化时间:
			<el-input
				v-model="height_setting.motor_init_time"
				placeholder=""
			/>
			检测间隔:

			<el-input
				v-model="height_setting.pix_interval"
				placeholder=""
			/>

			<el-alert
				title="电机设置类别"
				type="info"
				:closable="false"
			/>
			电机停转:
			<el-input v-model="height_setting.stop_pwm" />
			电机前进分量:
			<el-input v-model="height_setting.motor_forward" />
			左电机正反桨页设置:
			<el-input v-model="height_setting.left_motor_cw" />
			右电机正反桨页设置:
			<el-input v-model="height_setting.right_motor_cw" />
			kp:
			<el-input v-model="height_setting.kp" />
			ki:
			<el-input v-model="height_setting.ki" />
			kd:
			<el-input v-model="height_setting.kd" />
			电机转弯分量:
			<el-input v-model="height_setting.motor_steer" />
			大于多少米全速前进:
			<el-input v-model="height_setting.full_speed_meter" />
			前进最大速度:
			<el-input v-model="height_setting.max_pwm" />
			后退最大速度:
			<el-input v-model="height_setting.min_pwm" />
			<el-alert
				title="路径设置类别"
				type="warning"
				:closable="false"
			/>
			路径跟踪方式:
			<el-input v-model="height_setting.path_track_type" />
			路径规划方式:
			<el-input v-model="height_setting.path_plan_type" />
			调试标志:
			<el-input v-model="height_setting.home_debug" />
			播放声音:
			<el-input v-model="height_setting.b_play_audio" />
			添加避障方式设置:
			<el-input v-model="height_setting.obstacle_avoid_type" />
			TSP优化路径:
			<el-input v-model="height_setting.b_tsp" />
			查找数量:
			<el-input v-model="height_setting.find_points_num" />

			<el-alert
				title="重要状态设置类别"
				type="error"
				:closable="false"
			/>
			断网返航:
			<el-input v-model="height_setting.network_backhome" />
			剩余电量返航:
			<el-input v-model="height_setting.energy_backhome" />
			断网检查:
			<el-input v-model="height_setting.b_check_network" />
			校准罗盘:
			<el-input v-model="height_setting.calibration_compass" />

			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button
					type="primary"
					@click="settingSure"
				>确 定</el-button>
			</span>
		</el-dialog>
		<!-- 设置对话框 -->

		<div class="content">
			<div
				class="menu1"
				@touchstart="goHome"
				@click="goHome"
			>数据总览</div>
			<div class="menu2">设备操作</div>
			<div
				class="menu3"
				@click="goIndex"
				@touchstart="goIndex"
			> 返回</div>
			<img
				class="menu4"
				src="../../assets/setting.png"
				alt=""
				@click="dialog"
			>
			<div class="menu0">

				<token-img
					v-if="$route.query.img"
					style="width:auto;height:2vh"
					:auth-src="
            `${$route.query.img}`"
				/>
				{{ $route.query.corporateName }}
			</div>

			<!-- header -->
			<div class="header">

				<div class="title">
					<div
						class="text"
						style="margin-top:1vh;margin-bottom:-1vw"
					>{{ $route.query.platformName||"无人船智能云平台" }}</div>

					<dv-decoration-5 style="width:40vw;height:5vh;" />
				</div>

				<div class="tip-item">

					<div
						v-waves
						class="item1"
					>
						<div class="text">设备电量</div>
						<div class="num">{{ status_data.dump_energy|valueFilter }}</div>
					</div>
					<div
						v-waves
						class="item2"
					>
						<div class="text">网络延时</div>
						<div class="num">

							{{ status_data.ping|valueFilter }}ms
						</div>
						<!-- {{status_data.current_lng_lat[0].toFixed(1)}},{{status_data.current_lng_lat[1].toFixed(1)}} -->
					</div>

					<div
						v-waves
						class="item3"
					>

						<div class="text">船头方向</div>
						<div class="num">{{ status_data.direction|valueFilter }}</div>

					</div>
					<div
						v-waves
						class="item4"
					>

						<div class="text">速度</div>
						<div class="num">{{ status_data.speed|valueFilter }}</div>

					</div>

				</div>

				<div
					v-if="message&&message.mapId"
					class="name"
				>
					当前选择位置:{{ base_setting.pool_name|valueFilter }}
					<div
						class="reset"
						@click="rename"
					>重置选择位置</div>

				</div>
				<div
					:class="{backActive:selectBackMode==true}"
					class="selectBack"
					@click="selectBack"
				>选择返航点</div>

			</div>
			<!-- header -->

			<div class="content-middle">
				<div class="left">
					<div
						v-waves
						class="left1"
					>
						<dv-border-box-10>
							<img
								src="../../assets/logo.png"
								class="logo"
							>
							<div class="title">{{ fmt( new Date() ) }}</div>
							<div class="tip">
								<div class="left">

									<div style="display:flex;">
										<div style="	width: 8vw;height: 8vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
											<div class="item-title">里程</div>
											<div class="item-num">{{ status_data.run_distance }}</div>

										</div>
										<div style="	width: 8vw;height: 8vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
											<div class="item-title">总里程</div>
											<div class="item-num">{{ status_data.totle_distance }}</div>

										</div>

									</div>

								</div>
								<div class="right">

									<div style="display:flex;justify-content:center;align-items: center;">
										<div style="	width: 8vw;height: 8vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
											<div class="item-title">时间</div>
											<div class="item-num"> {{ status_data.runtime }}</div>

										</div>
										<div style="	width: 8vw;height: 8vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
											<div class="item-title">总时间</div>
											<div class="item-num">{{ status_data.totle_time }}</div>

										</div>

									</div>

								</div>
							</div>

						</dv-border-box-10>
					</div>
					<div class="left2">
						<dv-border-box-9>
							<div style="width: 66.5vw;height: 58vh;display:flex;justify-content:center;align-items:center;">
								<div id="container" />
							</div>

						</dv-border-box-9>
					</div>
					<div class="left3">
						<div class="left3-left">
							<dv-border-box-10>
								<div style="display:flex;align-items:center;width: 56vw;height: 17vh;">
									<div class="handle">
										<div @click="shadowState = !shadowState;keyShadow++">
											<div v-if="!this.shadowState">方向</div>
											<div v-else>方位</div>
										</div>

									</div>
									<div
										:key="keyShadow"
										class="box"
										:class="{shadow:shadowState}"
									>
										<div
											ref="direction"
											v-waves
											class="bottom"
										>
											<div
												class="top"
												@touchstart="controlDirection('top')"
												@mousedown="controlDirection('top')"
											>
												<div class="top-content" />
											</div>

											<div class="middle">
												<div
													class="left"
													@touchstart="controlDirection('left')"
													@mousedown="controlDirection('left')"
												>
													<div class="left-content" />
												</div>
												<div
													class="right"
													@touchstart="controlDirection('right')"
													@mousedown="controlDirection('right')"
												>
													<div class="right-content" />
												</div>
											</div>

											<div
												class="bottom"
												@touchstart="controlDirection('bottom')"
												@mousedown="controlDirection('bottom')"
											>
												<div class="bottom-content" />
											</div>
										</div>
									</div>
									<div class="auto">
										自动
									</div>

									<div
										class="item"
										:class="{active:options.single}"
										@click="setOptions('single')"
									>
										单点
									</div>

									<div
										class="item"
										:class="{active:options.double}"
										@click="setOptions('double')"
									>
										多点
									</div>

									<div
										class="item"
										:class="{active:options.fixed}"
										@click="setOptions('fixed')"
									>
										定点
									</div>
									<div
										class="item"
										:class="{active:options.cruise}"
										@click="setOptions('cruise')"
									>
										返航
									</div>

									<div
										class="item"
										:class="{active:options.search}"
										@click="setOptions('search')"
									>
										寻点
									</div>
									<!-- <div
										@click="setOptions('ring')"
										class="item"
										:class="{active:options.ring}"
									>
										环湖
									</div> -->

								</div>
							</dv-border-box-10>
						</div>
						<div class="left3-right">
							<dv-border-box-10>
								<div
									v-waves
									style="width: 8vw;height: 17vh; display:flex;flex-direction:column;justify-content:center;align-items:center;"
								>
									<img
										style="width:6.5vh;height:6.5vh"
										src="../../assets/启动.png"
										alt=""
										@click="stop"
									>

									<div class="title">暂停</div>
								</div>

							</dv-border-box-10>
						</div>

					</div>
				</div>
				<div class="right">
					<div class="right1">
						<dv-border-box-10>
							<div style="width: 25vw;height: 21vh;display:flex;justify-content:center;align-items:center;">
								<video
									id="myPlayer"
									ref="video"
									style="width:22vw;height: 18vh;"
									controls
									playsInline
								>
									<source ref="source" />
								</video>
							</div>

						</dv-border-box-10>
					</div>
					<div class="right2">
						<dv-border-box-10>
							<div class="title">
								<div v-if="!sureMap">点击湖中心一点确定湖泊轮廓</div>
								<div
									v-if="options.search"
									class="draw"
									@click="search"
								>开始寻点</div>
								<div v-if="message">距离下一个目标点距离:{{ message.distance }}</div>
								<div v-if="message"> 路径规划提示消息:{{ message.path_info }}</div>
								<div v-if="message">船执行手动控制提示消息:{{ message.control_info }}</div>
								<div v-if="message">低电量状态:{{ message.low_dump_energy_warnning }}</div>
								<div v-if="message">当前偏差角度:{{ message.theta_error }}</div>
								<div v-if="message">遥控器是否启用:{{ message.b_start_remote }}</div>
								<div v-if="message"> 罗盘提示消息:{{ message.compass_notice_info }}</div>
								<div v-if="status_data.lng_lat_error">{{ status_data.lng_lat_error }}m
								</div>
							</div>
						</dv-border-box-10>
					</div>
					<div class="right3">
						<dv-border-box-10>
							<div class="title">控制</div>
							<div class="order-list">
								<div
									v-waves
									class="item"
									@click="controlSwitch('draw_info')"
								>
									<img
										src="https://www.xxlun.com/website/file/水泵.png"
										alt=""
									>
									<span style="color:#fff;font-size:12px;margin-top:1vh">水泵</span>
									<div
										v-if="message"
										class="tip"
									>{{ message.draw_info|switchFilter }}</div>
								</div>
								<div
									v-waves
									class="item"
									@click="controlSwitch('headlight_info')"
								>
									<img
										src="https://www.xxlun.com/website/file/大灯.png"
										alt=""
									>
									<span style="color:#fff;font-size:12px;margin-top:1vh">大灯</span>
									<div
										v-if="message"
										class="tip"
									>{{ message.headlight_info|switchFilter }}</div>

								</div>
								<div
									v-waves
									class="item"
									@click="controlSwitch('audio_light_info')"
								>
									<img
										src="https://www.xxlun.com/website/file/声光报警器.png"
										alt=""
									>
									<span style="color:#fff;font-size:12px;margin-top:1vh">声光报警器</span>
									<div
										v-if="message"
										class="tip"
									>{{ message.audio_light_info|switchFilter }}</div>
								</div>
								<div
									v-waves
									class="item"
									@click="controlSwitch('side_light_info')"
								>
									<img
										src="https://www.xxlun.com/website/file/弦灯.png"
										alt=""
									>
									<span style="color:#fff;font-size:12px;margin-top:1vh">弦灯</span>
									<div
										v-if="message"
										class="tip"
									>{{ message.side_light_info|switchFilter }}</div>
								</div>

							</div>

						</dv-border-box-10>
					</div>
					<div class="right4">
						<dv-border-box-10>
							<div class="title" />

							<div style="position: absolute;left:1vh;top:3.5vh;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;">
								<div style="	width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">行间隔</div>
									<input
										v-model="base_setting.row"
										class="item-num"
										type="text"
										@change="setting"
									>

								</div>
								<div style="	width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">列间隔</div>
									<input
										v-model="base_setting.col"
										class="item-num"
										type="text"
										@change="setting"
									>
								</div>
								<div style="	width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">离岸安全距离</div>
									<input
										v-model="base_setting.secure_distance"
										class="item-num"
										type="text"
										@change="setting"
									>
								</div>
								<div style="	width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">手动速度档位</div>
									<input
										v-model="base_setting.speed_grade"
										class="item-num"
										type="text"
										@change="setting"
									>
								</div>
								<div style="width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">到达范围</div>
									<input
										v-model="base_setting.arrive_range"
										class="item-num"
										type="text"
										@change="setting"
									>
								</div>
								<div style="	width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">保存规划点</div>
									<input
										v-model="base_setting.keep_point"
										class="item-num"
										type="text"
										@change="setting"
									>
								</div>

							</div>

						</dv-border-box-10>
					</div>
				</div>

			</div>

		</div>
	</div>

</template>

<script>
import { Message } from "element-ui";
import { getLonAndLat } from "./map";
import MQTT from "paho-mqtt";
import waves from "@/directive/waves";
import { getMapList } from "../../api/ship";
import { fmt } from "../../utils/date";
import TokenImg from "@/components/token-img.vue";
export default {
	components: { TokenImg },
	directives: { waves },
	filters: {
		valueFilter(value) {
			if (value) {
				return value;
			} else {
				return "暂无";
			}
		},
		switchFilter(value) {
			if (value == 1) {
				return "开启中";
			}
			if (value == 0) {
				return "已关闭";
			}
		},
	},
	data() {
		return {
			startDirection: {
				state: null,
				single: null,
				double: null,
				search: null,
			},
			config: {
				value: 20,
			},
			percentage: 10,
			keyShadow: 1,
			shadowState: false,
			state: "map",
			dialogVideo: false,
			selectBackMode: false,
			distance_info: null, // 障碍物消息话题
			isFirst: true,
			timer: null,
			fmt: fmt, // 时间格式化
			sureMap: false, // 湖泊是否确定
			x: null, // 当前船的实时位置
			y: null, // 当前船的实时位置
			map: null, // 地图实例
			client: null, // MQTT实例
			deviceId: null, // 设备ID
			preCircle: null,
			prePoint: null, // 前一刻船图标的位置
			preBarrier: [],
			status_data: {}, // 状态数据
			detect_data: {}, // 探测数据
			pool_info: {}, // 湖泊信息
			doubleList: [], // 多点列表
			doublePreX: null, // 前一刻多点实时位置
			doublePreY: null, // 前一刻多点实时位置
			currentList: [],
			message: null, // 提示信息
			isSwitch: null, // 开关信息
			dialogVisible: false,
			direction: null, // 船头方向
			base_setting: {
				row: "1", // 行间隔
				col: "2", // 列间隔
				speed_grade: "3", // 手动速度档位
				secure_distance: "4", // 离岸安全距离
				arrive_range: "5", // 到达范围
				keep_point: "6", // 保存规划点
				pool_name: "", // 湖泊名称
				video_url: "",
			},
			height_setting: {
				stop_pwm: 1, // 电机停转
				check_status_interval: 2, // 检查船状态间隔 单位秒
				check_network_interval: 3, // 检查网络连接状态间隔
				find_points_num: 4, // 查找数量
				max_pwm: 5, // 前进最大速度
				min_pwm: 6, // 后退最大速度
				pid_interval: 7, // pid间隔
				network_backhome: 8, // 断网返航
				energy_backhome: 9, // 剩余电量返航
				left_motor_cw: 10, // 左电机正反桨页设置
				right_motor_cw: 11, // 右电机正反桨页设置
				motor_forward: 12, // 电机前进分量
				motor_steer: 13, // 电机转弯分量
				full_speed_meter: 14, // 大于多少米全速前进
				kp: 15, //
				ki: 16, //
				kd: 17, //
				draw_time: 18, // 抽水时间
				start_sleep_time: 19, // 开机前等待时间
				motor_init_time: 20, // 电机初始化时间
				b_check_network: 21, // 断网检查
				b_tsp: 22, //
				home_debug: 23, // 调试标志
				b_play_audio: 24, // 添加避障方式设置
				obstacle_avoid_type: 25, // 路径规划方式
				path_plan_type: 26, // 路径规划方式
				path_track_type: 27, // 路径跟踪方式
				calibration_compass: 28, // 校准罗盘
			},
			// 航行配置
			options: {
				single: true,
				search: false,
				double: false,
				ring: false,
				fixed: false,
				cruise: false,
			},
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
				this.currentList.push(value);
				this.draw(this.currentList);
			}
		},
	},
	mounted() {
		//this.config.lineDash = this.line();
		setInterval(() => {
			this.percentage++;
		}, 1000);
		// this.connection.clientId = this.$store.state.user.name;
		this.deviceId = this.$route.params.deviceId;
		// this.initTest();
		this.initMqtt();

		if (!this.map) {
			this.initMap();
		}
	},
	methods: {
		// MQTT连接初始化
		initMqtt() {
			// QoS 0：消息最多传递一次，如果当时客户端不可用，则会丢失该消息。
			// QoS 1：消息传递至少 1 次。
			// QoS 2：消息仅传送一次。
			const ID = Math.random().toFixed(3);
			this.client = new MQTT.Client("47.97.183.24", Number(8083), ID);
			// console.log(this.client);
			this.client.onMessageArrived = this.onMessageArrived;
			this.client.onConnectionLost = this.onConnectionLost;
			this.client.connect({ onSuccess: this.onConnect });
		},
		// MQTT连接成功
		onConnect() {
			console.log("MQTT连接成功");
			// 订阅状态数据
			this.client.subscribe(`status_data_${this.deviceId}`);
			// 订阅探测数据
			this.client.subscribe(`detect_data_${this.deviceId}`);
			// 订阅湖泊信息
			this.client.subscribe(`pool_info_${this.deviceId}`);
			// 订阅路线规划
			this.client.subscribe(`path_planning_${this.deviceId}`);
			// 订阅提示信息
			this.client.subscribe(`notice_info_${this.deviceId}`);
			// 订阅开关信息
			this.client.subscribe(`switch_${this.deviceId}`);
			// 订阅基础信息
			this.client.subscribe(`base_setting_${this.deviceId}`);
			// 订阅高级信息
			this.client.subscribe(`height_setting_${this.deviceId}`);
			// 订阅采样数据消息
			this.client.subscribe(`sample_data_${this.deviceId}`);
			// 订阅刷新后请求数据消息
			this.client.subscribe(`refresh_${this.deviceId}`);
			// 订阅障碍物消息话题
			this.client.subscribe(`distance_info_${this.deviceId}`);
			// 刷新后请求数据消息
			this.client.send(
				`refresh_${this.deviceId}`,
				JSON.stringify({
					info_type: 1,
				}),
				2
			);
			// 获取基础信息
			this.client.send(
				`base_setting_${this.deviceId}`,
				JSON.stringify({
					info_type: 1,
				}),
				2
			);
			//
		},
		// MQTT接收到消息
		onMessageArrived(message) {
			//	console.log(`onMessageArrived:${message.payloadString}`);
			// console.log(`"topic" ${message.topic}`);
			// 接收状态数据
			if (`${message.topic}` == `status_data_${this.deviceId}`) {
				this.status_data = JSON.parse(message.payloadString);
				this.$store.commit("ship/SET_STATUS_DATA", this.status_data);
				// console.log(this.status_data);
				if (this.status_data && this.status_data.current_lng_lat) {
					this.x = this.status_data.current_lng_lat[0];
					this.y = this.status_data.current_lng_lat[1];
				}
				if (this.status_data && this.status_data.direction) {
					this.direction = this.status_data.direction;
				}
				if (!this.map) {
					this.initMap();
				}
				if (this.status_data.home_lng_lat) {
					this.home(
						this.status_data.home_lng_lat[0],
						this.status_data.home_lng_lat[1]
					);
				}
			}
			// 接收湖泊信息
			if (`${message.topic}` == `pool_info_${this.deviceId}`) {
				this.pool_info = JSON.parse(message.payloadString);
				// console.log("mapId", this.pool_info.mapId);
				if (this.pool_info.mapId) {
					getMapList(this.pool_info.mapId).then((res) => {
						this.draw(JSON.parse(res.data.mapList.records[0].mapData));
						this.sureMap = true;
					});
				}
			}
			// 接收路径规划
			if (`${message.topic}` == `path_planning_${this.deviceId}`) {
				// console.log(JSON.parse(message.payloadString).sampling_points);
				JSON.parse(message.payloadString).sampling_points.forEach((ele) => {
					this.icon(ele[0], ele[1]);
				});
				this.draw2(JSON.parse(message.payloadString).path_points);
				this.doubleList = [];
			}
			// 接收提示信息
			if (`${message.topic}` == `notice_info_${this.deviceId}`) {
				this.message = JSON.parse(message.payloadString);

				// console.log("提示信息", this.message);
			}
			// 接收开关信息
			if (`${message.topic}` == `switch_${this.deviceId}`) {
				this.isSwitch = JSON.parse(message.payloadString);
			}
			// 障碍物消息话题
			if (`${message.topic}` == `distance_info_${this.deviceId}`) {
				//清空最后一次数据
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.preBarrier.forEach((ele) => {
						this.map.remove(ele);
					});
				}, 3000);

				if (!this.x && !this.y) {
					return;
				}
				if (this.x == 114.431408) {
					return;
				}
				if (!this.preBarrier.length == 0) {
					this.preBarrier.forEach((ele) => {
						this.map.remove(ele);
					});
				}
				this.distance_info = JSON.parse(message.payloadString);
				// console.log(this.distance_info)
				const direction = this.distance_info.direction;

				if (this.x && this.y) {
					this.distance_info.distance_info.forEach((ele) => {
						this.addBarrier(
							this.x,
							this.y,
							360 - (ele.angle + direction),
							ele.distance
						);
					});
				}
			}
			if (`${message.topic}` == `height_setting_${this.deviceId}`) {
				// 订阅高级信息
				if (JSON.parse(message.payloadString).info_type == 3) {
					this.height_setting = JSON.parse(message.payloadString);
					// console.log(".........", this.height_setting);
				}
			}
			// 订阅初级信息
			if (`${message.topic}` == `base_setting_${this.deviceId}`) {
				if (JSON.parse(message.payloadString).info_type == 3) {
					this.base_setting = JSON.parse(message.payloadString);
					//动态加载视频
					this.$refs.source.src = this.base_setting.video_url;
					this.$nextTick(() => {
						const player = new EZUIPlayer("myPlayer");
					});
					console.log("初级信息", this.base_setting);
				}
			}
			// 订阅刷新后请求数据消息
			if (`${message.topic}` == `refresh_${this.deviceId}`) {
				if (JSON.parse(message.payloadString).info_type == 2) {
					console.log(
						"订阅刷新后请求数据消息",
						JSON.parse(message.payloadString)
					);
					if (JSON.parse(message.payloadString).mapId) {
						getMapList(JSON.parse(message.payloadString).mapId).then((res) => {
							console.log("getMapList", res);
							this.draw(JSON.parse(res.data.mapList.records[0].mapData));
							this.sureMap = true;
						});
					}
					if (JSON.parse(message.payloadString).sampling_points) {
						JSON.parse(message.payloadString).sampling_points.forEach((ele) => {
							this.icon(ele[0], ele[1]);
						});
					}
					if (JSON.parse(message.payloadString).path_points) {
						this.draw(JSON.parse(message.payloadString).path_points);
						this.doubleList = [];
					}
				}
			}
			//订阅检测数据消息
			if (`${message.topic}` == `detect_data_${this.deviceId}`) {
				let waterData = JSON.parse(message.payloadString).water;
				Message({
					type: "success",
					message: `水质数据:ph:${waterData.ph};水温:${waterData.wt}; 溶解氧:${waterData.doDo};电导率:${waterData.ec};浊度:${waterData.td}`,
					duration: 0,
					showClose: true,
				});
			}
			//采样数据消息
			if (`${message.topic}` == `sample_data_${this.deviceId}`) {
				let current_num = JSON.parse(message.payloadString).current_num;
				Message({
					type: "success",
					message: `当前采样瓶号:${current_num}`,
					duration: 0,
					showClose: true,
				});
			}
		},
		// MQTT断开连接
		onConnectionLost(responseObject) {
			console.log(responseObject);
			if (responseObject.errorCode !== 0) {
				console.log("onConnectionLost:" + responseObject.errorMessage);
			}
		},
		//地图初始化
		initMap() {
			if (!this.x && !this.y) {
				this.x = 114.431408;
				this.y = 30.523486;
			}
			var map = new AMap.Map("container", {
				zoom: 13,
				// scrollWheel: false,
				center: [this.x, this.y],
				mapStyle: "amap://styles/001a637581603985681831e1471630a5", // 设置地图的显示样式
			});
			this.map = map;
			map.on("click", this.clickMap);
			// 同时引入工具条插件，比例尺插件和鹰眼插件
			AMap.plugin(
				["AMap.ToolBar", "AMap.Scale", "AMap.HawkEye", "AMap.MapType"],
				function () {
					// 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
					map.addControl(new AMap.ToolBar());

					// 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
					map.addControl(new AMap.Scale());

					// 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
					// map.addControl(new AMap.HawkEye({ isOpen: true }));

					// 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
					map.addControl(new AMap.MapType());
				}
			);
		},
		//停止
		stop() {
			this.client.send(
				`control_data_${this.deviceId}`,
				JSON.stringify({ deviceId: this.deviceId, move_direction: -1 }),
				2
			);
		},
		// 开关操作
		controlSwitch(type) {
			let messageType;
			if (!this.message) {
				return;
			}
			if (type) {
				if (type === "draw_info") {
					messageType = "b_draw";
				}
				if (type === "headlight_info") {
					messageType = "headlight";
				}
				if (type === "audio_light_info") {
					messageType = "audio_light";
				}
				if (type === "side_light_info") {
					messageType = "side_light";
				}
			}
			// console.log("type", type, { [messageType]: 1 });
			if (type && this.message[type] == 0) {
				this.client.send(
					`switch_${this.deviceId}`,
					JSON.stringify({ [messageType]: 1 }),
					2
				);
				return;
			}
			if (type && this.message[type] == 1) {
				this.client.send(
					`switch_${this.deviceId}`,
					JSON.stringify({ [messageType]: 0 }),
					2
				);
				return;
			}
		},
		//selectBack
		selectBack() {
			this.selectBackMode = !this.selectBackMode;
		},
		//重置湖泊
		rename() {
			this.client.send(
				`reset_pool_${this.deviceId}`,
				JSON.stringify({ reset_pool: 1 }),
				2
			);
			this.sureMap = false;

			setTimeout(() => {
				location.reload();
			}, 1000);
		},
		setting() {
			this.$confirm("是否修改该设置")
				.then(() => {
					console.log("sure");
					this.client.send(
						`base_setting_${this.deviceId}`,
						JSON.stringify({
							info_type: 2,
							row: this.base_setting.row,
							col: this.base_setting.col,
							speed_grade: this.base_setting.speed_grade,
							secure_distance: this.base_setting.secure_distance,
							arrive_range: this.base_setting.arrive_range,
							keep_point: this.base_setting.keep_point,
						}),
						2
					);
				})
				.catch(() => {
					console.log("no");
				});
		},
		reset() {
			this.client.send(
				`height_setting_${this.deviceId}`,
				JSON.stringify({ info_type: 4 }),
				2
			);
			this.dialogVisible = false;
		},
		settingSure() {
			this.client.send(
				`height_setting_${this.deviceId}`,
				JSON.stringify({ ...this.height_setting, info_type: 2 }),
				2
			);
			console.log({ ...this.height_setting, info_type: 2 });
			this.dialogVisible = false;
		},
		// 寻点模式开始
		search() {
			this.options.search = false;
			this.client.send(
				`start_${this.deviceId}`,
				JSON.stringify({ search_pattern: 1 }),
				2
			);
		},
		goHome() {
			this.$router.push({
				path: `/ship/detail/${this.deviceId}`,
				query: { ...this.$route.query },
			});
		},
		goIndex() {
			this.$router.push({
				path: `/equipment/ship/list`,
			});
		},
		//航行设置
		setOptions(value) {
			if (!this.sureMap) {
				Message.error("请先点击湖中心一点确定湖泊轮廓");
				return;
			}
			if (value == "search") {
				if (!this.options.search) {
					//console.log("ok");
					this.client.send(
						`auto_lng_lat_${this.deviceId}`,
						JSON.stringify({
							deviceId: this.deviceId,
							config: {
								row_gap: 50,
							},
						}),
						2
					);
				}
			}
			if (value == "single") {
				this.options.search = false;
				if (this.options[value] == true) {
					this.options[value] = false;
					this.options.double = true;
					return;
				} else {
					this.options[value] = true;
					this.options.double = false;
					return;
				}
			}
			if (value == "double") {
				this.options.search = false;
				if (this.options[value] == true) {
					this.options[value] = false;
					this.options.single = true;
					return;
				} else {
					this.options[value] = true;
					this.options.single = false;
					return;
				}
			}
			if (this.options[value] == true) {
				this.options[value] = false;
			} else {
				this.options[value] = true;
			}
		},
		// 点击地图
		clickMap(e) {
			if (!this.sureMap) {
				console.log({
					deviceId: this.deviceId,
					lng_lat: [e.lnglat.lng, e.lnglat.lat],
					zoom: e.target.getZoom(),
				});
				this.client.send(
					`pool_click_${this.deviceId}`,
					JSON.stringify({
						deviceId: this.deviceId,
						lng_lat: [e.lnglat.lng, e.lnglat.lat],
						zoom: e.target.getZoom(),
					}),
					2
				);
				return;
			}
			// console.log(this.selectBackMode);
			if (this.selectBackMode == true) {
				this.backPoint(e);
				return;
			}
			if (this.options.single == true) {
				this.single(e);
				return;
			}
			if (this.options.double == true) {
				this.double(e);
				return;
			}
			// console.log(e.lnglat.lng, e.lnglat.lat, e.pixel);
		},
		dialog() {
			this.dialogVisible = true;
			// 获取高级信息
			this.client.send(
				`height_setting_${this.deviceId}`,
				JSON.stringify({
					info_type: 1,
				}),
				2
			);
		},
		// 实时更新船的位置
		initPoint() {
			if (this.prePoint) {
				this.map.remove(this.prePoint);
			}
			var icon = new AMap.Icon({
				size: new AMap.Size(20, 30), // 图标尺寸
				imageOffset: new AMap.Pixel(0, 0),
				image: "https://www.xxlun.com/website/file/ship.png", // Icon的图像
				imageSize: new AMap.Size(20, 30), // 根据所设置的大小拉伸或压缩图片
			});

			// 将 Icon 实例添加到 marker 上:
			var marker = new AMap.Marker({
				position: new AMap.LngLat(this.x, this.y),
				offset: new AMap.Pixel(-15, -15),
				angle: 360 - this.direction,
				icon: icon,
				title: "行星轮",
				zoom: 13,
			});
			this.prePoint = marker;
			this.map.add(marker);
			this.addCircle(this.x, this.y);
			if (this.isFirst) {
				this.isFirst = false;
				this.map.setFitView();
			}
		},
		// 点击发送返回点
		backPoint(e) {
			this.$confirm("确认选择该点为返航点？")
				.then((_) => {
					this.client.send(
						`set_home_${this.deviceId}`,
						JSON.stringify({
							lng_lat: [[e.lnglat.lng, e.lnglat.lat]],
						}),
						2
					);
					this.selectBackMode = false;
				})
				.catch((_) => {});
		},
		//重启船
		restart() {
			this.$confirm("确认重启船?")
				.then((_) => {
					console.log("重启");
					this.client.send(
						`poweroff_restart_${this.deviceId}`,
						JSON.stringify({
							poweroff_restart: 2,
						}),
						2
					);
				})
				.catch((_) => {});
		},
		//关机
		end() {
			this.$confirm("确认关机?关机后只能手动开机")
				.then((_) => {
					console.log("关机");
					this.client.send(
						`poweroff_restart_${this.deviceId}`,
						JSON.stringify({
							poweroff_restart: 1,
						}),
						2
					);
				})
				.catch((_) => {});
		},
		// 启动
		shipGo() {
			if (!this.startDirection.state) {
				Message.error("行驶路径未配置");
				return;
			}
			if (this.startDirection.state == "single") {
				this.client.send(
					`user_lng_lat_${this.deviceId}`,
					JSON.stringify(this.startDirection.single),
					2
				);
				this.startDirection = {
					state: null,
					single: null,
					double: null,
					search: null,
				};
				console.log("single");
				return;
			}
			if (this.startDirection.state == "double") {
				this.client.send(
					`user_lng_lat_${this.deviceId}`,
					JSON.stringify(this.startDirection.double),
					2
				);
				this.startDirection = {
					state: null,
					single: null,
					double: null,
					search: null,
				};
				console.log("double");
				return;
			}
		},
		// 单点模式
		single(e) {
			this.$confirm("确认前往该区域？")
				.then((_) => {
					const List = [
						new AMap.LngLat(this.x, this.y),
						new AMap.LngLat(e.lnglat.lng, e.lnglat.lat),
					];
					var polyline1 = new AMap.Polyline({
						path: List,
					});
					var overlayGroup = new AMap.OverlayGroup([polyline1]);
					overlayGroup.setOptions({
						strokeColor: "#4081c4",
						strokeWeight: 1,
					});

					this.map.add(overlayGroup);

					let back_home = this.options.cruise;
					let fix_point = this.options.fixed;

					if (back_home == false) {
						back_home = 0;
					} else {
						back_home = 1;
					}
					console.log(back_home, fix_point);
					if (fix_point == false) {
						console.log(back_home, fix_point);
						fix_point = 0;
					} else {
						fix_point = 1;
					}
					this.startDirection.state = "single";
					this.startDirection.single = {
						deviceId: this.deviceId,
						lng_lat: [[e.lnglat.lng, e.lnglat.lat]],
						zoom: e.target.getZoom(),
						meter_pix: e.target.getResolution(),
						config: {
							back_home: back_home,
							fix_point: fix_point,
						},
					};
				})
				.catch((_) => {
					console.log("取消");
				});
		},
		// 多点模式
		double(e) {
			this.$confirm("继续选点？")
				.then((_) => {
					console.log("double");
					if (!this.doublePreX && !this.doublePreY) {
						this.doublePreX = this.x;
						this.doublePreY = this.y;
					}
					const List = [
						new AMap.LngLat(this.doublePreX, this.doublePreY),
						new AMap.LngLat(e.lnglat.lng, e.lnglat.lat),
					];
					var polyline1 = new AMap.Polyline({
						path: List,
					});
					var overlayGroup = new AMap.OverlayGroup([polyline1]);
					overlayGroup.setOptions({
						strokeColor: "#4081c4",
						strokeWeight: 1,
					});
					this.map.add(overlayGroup);
					this.doublePreX = e.lnglat.lng;
					this.doublePreY = e.lnglat.lat;
					this.doubleList.push([e.lnglat.lng, e.lnglat.lat]);
					// console.log(this.doubleList);
				})
				.catch((_) => {
					if (this.doubleList.length != 0) {
						this.$confirm("确认前往这些区域？")
							.then((_) => {
								let back_home = this.options.cruise;
								let fix_point = this.options.fixed;
								if (back_home == false) {
								} else {
									back_home = 1;
								}
								if (fix_point == false) {
									fix_point = 0;
								} else {
									fix_point = 1;
								}
								this.startDirection.state = "double";
								this.startDirection.double = {
									deviceId: this.deviceId,
									lng_lat: this.doubleList,
									zoom: e.target.getZoom(),
									meter_pix: e.target.getResolution(),
									config: {
										back_home: back_home,
										fix_point: fix_point,
									},
								};

								console.log("开始", {
									deviceId: this.deviceId,
									lng_lat: this.doubleList,
									zoom: e.target.getZoom(),
									meter_pix: e.target.getResolution(),
									config: {
										back_home: back_home,
										fix_point: fix_point,
									},
								});
							})
							.catch((_) => {
								location.reload();
							});
					}
				});
		},
		// 测试方法
		initTest() {
			this.x = 115.431408;
			this.y = 30.523486;
			this.direction = 0;
			setInterval(() => {
				this.x += 0.0001;
				this.y += 0.0001;
				this.direction += 10;
				this.initPoint(this.x, this.y);
				this.addCircle(this.x, this.y);
			}, 1000);
		},
		swap(node1, node2) {
			const afterNode2 = node2.nextElementSibling;
			const parent = node2.parentNode;
			node1.replaceWith(node2);
			parent.insertBefore(node1, afterNode2);
		},
		// 切换视频与地图
		openVideo() {
			console.log(
				document.getElementById("myPlayer"),
				document.getElementById("container")
			);
			if (this.state == "map") {
				this.state = "video";
				document.getElementById("container").style.width = "22vw";
				document.getElementById("container").style.height = "18vh";
				document.getElementById("myPlayer").style.width = "64vw";
				document.getElementById("myPlayer").style.height = "56vh";
			} else {
				this.state = "map";
				document.getElementById("myPlayer").style.width = "22vw";
				document.getElementById("myPlayer").style.height = "18vh";
				document.getElementById("container").style.width = "64vw";
				document.getElementById("container").style.height = "56vh";
			}
			this.swap(
				document.getElementById("myPlayer"),
				document.getElementById("container")
			);
		},
		// 打开画中画
		openVideo2() {
			if (this.$refs.video.requestPictureInPicture) {
				this.$refs.video.requestPictureInPicture();
			} else {
				alert("该浏览器不支持自动调用,请手动调用画中画模式");
			}
		},
		//对话框
		handleClose(done) {
			this.$confirm("确认关闭？")
				.then((_) => {
					done();
				})
				.catch((_) => {});
		},
		//根据经纬坐标点画轨迹
		draw(value) {
			const list = value;
			list.forEach((ele) => {
				ele = new AMap.LngLat(ele[0], ele[1]);
			});
			var polyline1 = new AMap.Polyline({
				path: list,
			});
			// 创建覆盖物群组，传入覆盖物组成的数组
			var overlayGroup = new AMap.OverlayGroup([polyline1]);

			// 对此覆盖物群组设置同一属性
			overlayGroup.setOptions({
				strokeColor: "yellow",
				strokeWeight: 1,
			});
			this.map.add(overlayGroup);
			// this.map.setFitView();
		},
		//根据经纬坐标点画轨迹
		draw2(value) {
			const list = value;
			list.forEach((ele) => {
				ele = new AMap.LngLat(ele[0], ele[1]);
			});
			var polyline1 = new AMap.Polyline({
				path: list,
			});
			// 创建覆盖物群组，传入覆盖物组成的数组
			var overlayGroup = new AMap.OverlayGroup([polyline1]);

			// 对此覆盖物群组设置同一属性
			overlayGroup.setOptions({
				strokeColor: "red",
				strokeWeight: 1,
			});
			this.map.add(overlayGroup);
			// this.map.setFitView();
		},
		// 添加障碍物
		addBarrier(x, y, d, l) {
			const lngLat = getLonAndLat(x, y, d, l);
			// console.log(lngLat);
			var icon = new AMap.Icon({
				size: new AMap.Size(20, 30), // 图标尺寸
				imageOffset: new AMap.Pixel(0, 0),
				image: "https://www.xxlun.com/website/file/barrier.png", // Icon的图像
				imageSize: new AMap.Size(20, 30), // 根据所设置的大小拉伸或压缩图片
			});

			// 将 Icon 实例添加到 marker 上:
			var marker = new AMap.Marker({
				position: new AMap.LngLat(lngLat.lng, lngLat.lat),
				offset: new AMap.Pixel(-15, -15),
				angle: this.direction,
				icon: icon,
				title: "行星轮",
				zoom: 13,
			});
			this.preBarrier.push(marker);
			this.map.add(marker);
		},
		// 绘制避障圆
		addCircle(x, y) {
			if (this.preCircle) {
				this.map.remove(this.preCircle);
			}
			const circle = new AMap.Circle({
				center: new AMap.LngLat(x, y), // 圆心位置
				radius: 10, // 圆半径
				fillOpacity: 0,
				strokeColor: "#1890ff", // 描边颜色
				strokeWeight: 1, // 描边宽度
			});
			this.preCircle = circle;
			this.map.add(circle);
		},
		// 根据单个经纬坐标点画图标
		icon(x, y) {
			const planIcon = new AMap.Icon({
				size: new AMap.Size(4, 5), // 图标尺寸
				image: "//webapi.amap.com/theme/v1.3/markers/b/mark_bs.png", // Icon的图像
				imageSize: new AMap.Size(4, 5), // 根据所设置的大小拉伸或压缩图片
			});
			const planMarker = new AMap.Marker({
				position: new AMap.LngLat(x, y),
				offset: new AMap.Pixel(-4, -5),
				icon: planIcon,
				title: "采样点",
				zoom: 13,
			});

			this.map.add(planMarker);
		},
		// 返航点图标
		home(x, y) {
			const planIcon = new AMap.Icon({
				size: new AMap.Size(40, 50), // 图标尺寸
				image: "https://www.xxlun.com/website/file/home.png", // Icon的图像
				imageSize: new AMap.Size(40, 50), // 根据所设置的大小拉伸或压缩图片
			});
			const planMarker = new AMap.Marker({
				position: new AMap.LngLat(x, y),
				offset: new AMap.Pixel(-20, -20),
				icon: planIcon,
				title: "home",
				zoom: 13,
			});
			this.map.add(planMarker);
		},
		// 船的方向控制
		controlDirection(value) {
			let mode;
			if (this.shadowState) {
				mode = 2;
			} else {
				mode = 1;
			}
			if (value == "top") {
				this.client.send(
					`control_data_${this.deviceId}`,
					JSON.stringify({
						deviceId: this.deviceId,
						move_direction: 0,
						mode: mode,
					}),
					2
				);
				console.log({ deviceId: this.deviceId, move_direction: 0, mode: mode });
			}
			if (value == "left") {
				this.client.send(
					`control_data_${this.deviceId}`,
					JSON.stringify({
						deviceId: this.deviceId,
						move_direction: 90,
						mode: mode,
					}),
					2
				);
			}
			if (value == "bottom") {
				this.client.send(
					`control_data_${this.deviceId}`,
					JSON.stringify({
						deviceId: this.deviceId,
						move_direction: 180,
						mode: mode,
					}),
					2
				);
			}
			if (value == "right") {
				this.client.send(
					`control_data_${this.deviceId}`,
					JSON.stringify({
						deviceId: this.deviceId,
						move_direction: 270,
						mode: mode,
					}),
					2
				);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.shadow {
	box-shadow: 0px 0.6vh 1.8vh 0px rgba(240, 0, 0, 0.6),
		0px -0.6vh 1.8vh 0px rgba(240, 0, 0, 0.6) !important;
}
#container {
	width: 64vw;
	height: 56vh;
}
.draw {
	cursor: pointer;
}

.fixed {
	position: fixed;
	top: 25vh;
	left: 5vw;
	z-index: 1000;
}
.fixed2 {
	position: fixed;
	top: 25vh;
	left: 18vw;
	z-index: 1000;
}

.fixed3 {
	position: fixed;
	top: 25vh;
	left: 28vw;
	z-index: 1000;
}
.fixed4 {
	position: fixed;
	top: 52vh;
	left: 56vw;
	z-index: 1000;
	transform: rotate(-90deg);
	width: 30vh;
}

.fixed5 {
	position: fixed;
	top: 52vh;
	left: 62vw;
	z-index: 1000;
}

.backActive {
	background-color: #0096ff !important;
	color: #fff;
}

.selectBack {
	position: absolute;
	top: 16.5vh;
	left: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #245098;
	margin-top: 0.5vh;
	color: #fff;
	font-size: 1.5vh;
	width: 10vh;
	height: 3vh;
	font-family: Source Han Sans CN;
	font-weight: bold;
	opacity: 0.8;
	text-shadow: 0px 0.1vh 0.1vh rgba(0, 0, 0, 0.6);
	cursor: pointer;
}

.name {
	position: absolute;
	top: 14vh;
	left: 33vw;
	color: #0096ff;
	.reset {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #245098;
		margin-top: 0.5vh;
		color: #fff;
		font-size: 1.5vh;
		width: 10vh;
		height: 3vh;
		font-family: Source Han Sans CN;
		font-weight: bold;
		opacity: 0.8;
		text-shadow: 0px 0.1vh 0.1vh rgba(0, 0, 0, 0.6);
		cursor: pointer;
	}
}

.body {
	overflow: hidden;
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
		border: 0.1vh solid #0096ff;
		position: relative;
		.menu0 {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 2vw;
			top: 0.5vh;
			background: #245098;
			border: 0.1vh solid #4081c4;
			color: #fff;
			font-size: 1.5vh;
			width: 25vw;
			height: 5vh;
			line-height: 5vh;
			font-size: 1vw;
			font-family: Source Han Sans CN;
			font-weight: bold;
			opacity: 0.8;
			text-shadow: 0px 0.1vh 0.1vh rgba(0, 0, 0, 0.6);
			cursor: pointer;
		}
		.menu1 {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 18vw;
			top: 2vh;
			background: #245098;
			border: 0.1vh solid #4081c4;
			color: #fff;
			font-size: 1.5vh;
			width: 7vh;
			height: 3vh;
			font-family: Source Han Sans CN;
			font-weight: bold;
			opacity: 0.8;
			text-shadow: 0px 0.1vh 0.1vh rgba(0, 0, 0, 0.6);
			cursor: pointer;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
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
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
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
			text-shadow: 0px 0.1vh 0.1vh rgba(0, 0, 0, 0.6);
			cursor: pointer;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.menu4 {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 2vw;
			top: 2vh;
			color: #fff;
			font-size: 1.5vh;
			width: 3vh;
			height: 3vh;
			font-family: Source Han Sans CN;
			font-weight: bold;
			opacity: 0.8;
			text-shadow: 0px 0.1vh 0.1vh rgba(0, 0, 0, 0.6);
			cursor: pointer;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
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
				.item3,
				.item4 {
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
			.left {
				display: flex;
				flex-direction: column;
				.left1 {
					width: 25vw;
					height: 15vh;
					margin-left: 2vw;
					margin-top: -9vh;
					position: relative;
					.logo {
						width: 10vw;
						height: 5vh;
						position: absolute;
						top: 2vh;
						left: 3vh;
					}
					.title {
						position: absolute;
						left: 14vw;
						top: 3vh;
						font-size: 1vw;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #0096ff;
					}
					.tip {
						display: flex;
						position: absolute;
						top: 5vh;
						left: 0.5vw;

						.left {
							width: 12vw;
							height: 8vh;
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
						.right {
							width: 12vw;
							height: 8vh;
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
				.left2 {
					width: 66vw;
					height: 58vh;
					margin-left: 2vw;
					margin-top: 1vh;
					//background-color: #ffa128;
				}
				.left3 {
					width: 66vw;
					height: 17vh;
					margin-left: 2vw;
					margin-top: 1vh;
					display: flex;
					position: relative;

					.left3-left {
						width: 56vw;
						height: 17vh;

						.handle {
							margin-left: 2vh;
							font-family: Source Han Sans CN;
							font-weight: 500;
							color: #02f1ee;
						}
						.box {
							margin-left: 2vh;
							width: 13vh;
							height: 13vh;
							background: rgba(12, 51, 103, 0.51);
							box-shadow: 0px 0.6vh 1.8vh 0px rgba(2, 245, 242, 0.6),
								0px -0.6vh 1.8vh 0px rgba(2, 245, 242, 0.6);
							border-radius: 50%;
							display: flex;
							justify-content: center;
							align-items: center;
							.bottom {
								width: 14vh;
								.top,
								.bottom,
								.left,
								.right {
									margin: auto;
									width: 4vh;
									height: 4vh;
									border-radius: 50%;
									display: flex;
									justify-content: center;
									align-items: center;
									cursor: pointer;
								}
								.middle {
									display: flex;
									.left-content {
										width: 0;
										height: 0;
										border: 1vh solid;
										border-color: transparent #02f5f2 transparent transparent;
										margin-left: -1.1vh;
									}
									.right-content {
										width: 0;
										height: 0;
										border: 1vh solid;
										border-color: transparent transparent transparent #02f5f2;
										margin-right: -1.1vh;
									}
								}

								.top-content {
									width: 0;
									height: 0;
									border: 1vh solid;
									border-color: transparent transparent #02f5f2;
									margin-top: -1.1vh;
								}
								.bottom-content {
									width: 0;
									height: 0;
									border: 1vh solid;
									border-color: #02f5f2 transparent transparent transparent;
									margin-bottom: -1.1vh;
								}
							}
						}
						.auto {
							margin-left: 2vh;
							font-family: Source Han Sans CN;
							font-weight: 500;
							color: #02f1ee;
						}
						.item {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 10vh;
							height: 7vh;
							background: rgba(10, 61, 123, 0.25);
							box-shadow: 0px 0.1vh 3vh 0px #1391da,
								0px 0.05vh 0.2vh 0px #095e7c;
							border-radius: 2vh;
							color: #fff;
							margin-left: 1vh;
							cursor: pointer;
							.active {
								background-color: #0096ff;
							}
						}
						.item.active {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 10vh;
							height: 7vh;
							box-shadow: 0px 0.1vh 3vh 0px #1391da,
								0px 0.05vh 0.2vh 0px #095e7c;
							border-radius: 2vh;
							color: #fff;
							margin-left: 1.2vh;
							cursor: pointer;
							background-color: #0096ff;
						}
					}
					.left3-right {
						width: 8vw;
						height: 17vh;
						margin-left: 2vw;
						cursor: pointer;
						.title {
							color: #fff;
							margin-top: 2vh;
						}
					}
				}
			}

			.right {
				.right1 {
					width: 25vw;
					height: 21vh;
					margin-left: 3vw;
					margin-top: -7vh;
					//background-color: #0096ff;
				}
				.right2 {
					width: 25vw;
					height: 21vh;
					margin-left: 3vw;
					margin-top: 4vh;
					//background-color: #0096ff;
					.title {
						position: absolute;
						left: 2vw;
						top: 2vh;
						font-size: 1vw;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #0096ff;
					}
				}
				.right3 {
					width: 25vw;
					height: 18vh;
					margin-left: 3vw;
					margin-top: 4vh;
					//background-color: #0096ff;
					.title {
						position: absolute;
						left: 2vw;
						top: 2vh;
						font-size: 1vw;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #0096ff;
					}
					.order-list {
						display: flex;
						position: absolute;
						left: 3vh;
						top: 4vh;

						.item {
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							width: 5vw;
							height: 7vw;
							cursor: pointer;
							//	background-color: #ffa128;
							img {
								width: 1.5vw;
								height: 1.5vw;
							}
							.tip {
								font-size: 1vh;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #a9ddee;
								margin-top: 1vh;
							}
						}
					}
				}
				.right4 {
					width: 25vw;
					height: 18vh;
					margin-left: 3vw;
					margin-top: 4vh;
					//background-color: #0096ff;
					.title {
						position: absolute;
						left: 2vw;
						top: 2vh;
						font-size: 1vw;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #0096ff;
					}
					.item-title {
						font-size: 1vw;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #a9ddee;
					}
					.item-num {
						margin-top: 0.5vh;
						// border: 0.1vh solid #8fdffe;
						// border-radius: 1vh;

						width: 4vw;
						font-size: 1vw;
						font-family: DIN;
						font-weight: bold;
						color: #ffffff;
						background: linear-gradient(0deg, #00a8ff 0%, #8fdffe 100%);
					}
				}
			}
		}
	}
}
</style>
