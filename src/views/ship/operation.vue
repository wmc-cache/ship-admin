<template>

	<!-- <dv-full-screen-container> -->

	<div class="body">
		<div class="content">
			<div
				class="menu1"
				@click="goHome"
			>首页总览</div>
			<div class="menu2">数据展示</div>
			<div class="menu3">设备操作</div>
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
						<div class="text">设备电量</div>
						<div class="num">98%</div>
					</div>
					<div class="item2">
						<div class="text">河道水深</div>
						<div class="num">2m</div>
					</div>

					<div class="item3">

						<div class="text">紧急预警</div>
						<div class="num">正常</div>

					</div>
					<div class="item4">

						<div class="text">紧急预警</div>
						<div class="num">正常</div>

					</div>

				</div>

			</div>
			<!-- header -->

			<div class="content-middle">
				<div class="left">
					<div class="left1">
						<dv-border-box-10>
							<div class="title">2002年1月7日 星期四 10:22:34</div>
							<div class="tip">
								<div class="left">
									<dv-border-box-12>
										<div style="display:flex;">
											<div style="	width: 8vw;height: 8vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
												<div class="item-title">里程</div>
												<div class="item-num">798</div>

											</div>
											<div style="	width: 8vw;height: 8vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
												<div class="item-title">总里程</div>
												<div class="item-num">798</div>

											</div>

										</div>

									</dv-border-box-12>
								</div>
								<div class="right">
									<dv-border-box-12>
										<div style="display:flex;justify-content:center;align-items: center;">
											<div style="	width: 8vw;height: 8vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
												<div class="item-title">时间</div>
												<div class="item-num">798</div>

											</div>
											<div style="	width: 8vw;height: 8vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
												<div class="item-title">总时间</div>
												<div class="item-num">798</div>

											</div>

										</div>

									</dv-border-box-12>
								</div>
							</div>

						</dv-border-box-10>
					</div>
					<div class="left2">
						<dv-border-box-9>
							<div style="width: 66.5vw;height: 58vh;display:flex;justify-content:center;align-items:center;">
								<div id="container"></div>
							</div>

						</dv-border-box-9>
					</div>
					<div class="left3">
						<div class="left3-left">
							<dv-border-box-10>
								<div style="display:flex;align-items:center;width: 56vw;height: 17vh;">
									<div class="handle">
										手动
									</div>
									<div class="box">
										<div
											ref="direction"
											class="bottom"
										>
											<div
												class="top"
												@touchstart="direction('top')"
												@mousedown="direction('top')"
											>
												<div class="top-content" />
											</div>

											<div class="middle">
												<div
													class="left"
													@touchstart="direction('left')"
													@mousedown="direction('left')"
												>
													<div class="left-content" />
												</div>
												<div
													class="right"
													@touchstart="direction('right')"
													@mousedown="direction('right')"
												>
													<div class="right-content" />
												</div>
											</div>

											<div
												class="bottom"
												@touchstart="direction('bottom')"
												@mousedown="direction('bottom')"
											>
												<div class="bottom-content" />
											</div>
										</div>
									</div>
									<div class="auto">
										自动
									</div>

									<div
										@click="setOptions('single')"
										class="item"
										:class="{active:options.single}"
									>
										单点
									</div>
									<div
										@click="setOptions('search')"
										class="item"
										:class="{active:options.search}"
									>
										寻点
									</div>
									<div
										@click="setOptions('double')"
										class="item"
										:class="{active:options.double}"
									>
										多点
									</div>
									<div
										@click="setOptions('ring')"
										class="item"
										:class="{active:options.ring}"
									>
										环湖
									</div>
									<div
										@click="setOptions('fixed')"
										class="item"
										:class="{active:options.fixed}"
									>
										定点
									</div>
									<div
										@click="setOptions('cruise')"
										class="item"
										:class="{active:options.cruise}"
									>
										返航
									</div>

								</div>
							</dv-border-box-10>
						</div>
						<div class="left3-right">
							<dv-border-box-10>
								<div style="width: 8vw;height: 17vh; display:flex;flex-direction:column;justify-content:center;align-items:center;">
									<img
										style="width:6.5vh;height:6.5vh"
										src="../../assets/启动.png"
										alt=""
									>
									<div class="title">启动</div>
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
									style="width:22vw;height: 18vh;"
									id="myPlayer"
									controls
									playsInline
								>
									<source src="https://hls01open.ys7.com/openlive/fe78747055f6492ab39474f5b38916fc.m3u8" />
								</video>
							</div>

						</dv-border-box-10>
					</div>
					<div class="right2">
						<dv-border-box-10>
							<div class="title">状态</div>
						</dv-border-box-10>
					</div>
					<div class="right3">
						<dv-border-box-10>
							<div class="title">控制</div>
							<div class="order-list">
								<div class="item">
									<img
										src="../../assets/水泵.png"
										alt=""
									>
									<div class="tip">水泵</div>
								</div>
								<div class="item">
									<img
										src="../../assets/水泵.png"
										alt=""
									>
									<div class="tip">水泵</div>
								</div>
								<div class="item">
									<img
										src="../../assets/水泵.png"
										alt=""
									>
									<div class="tip">水泵</div>
								</div>
								<div class="item">
									<img
										src="../../assets/水泵.png"
										alt=""
									>
									<div class="tip">水泵</div>
								</div>

							</div>

						</dv-border-box-10>
					</div>
					<div class="right4">
						<dv-border-box-10>
							<div class="title">设置

							</div>

							<div style="position: absolute;left:1vh;top:3.5vh;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;">
								<div style="	width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">间隔</div>
									<div class="item-num">798</div>
								</div>
								<div style="	width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">安全距离</div>
									<div class="item-num">798</div>
								</div>
								<div style="	width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">船号</div>
									<div class="item-num">798</div>
								</div>
								<div style="	width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">船号</div>
									<div class="item-num">798</div>
								</div>
								<div style="	width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">船号</div>
									<div class="item-num">798</div>
								</div>
								<div style="	width: 8vw;height: 6vh;display: flex;flex-direction:column;justify-content:center;align-items: center;">
									<div class="item-title">船号</div>
									<div class="item-num">798</div>
								</div>

							</div>

						</dv-border-box-10>
					</div>
				</div>

			</div>

		</div>
	</div>

	<!-- </dv-full-screen-container> -->

</template>

<script>
export default {
	mounted() {
		this.initMap();
		this.deviceId = this.$route.params.deviceId;
		this.$nextTick(() => {
			let player = new EZUIPlayer("myPlayer");
		});
	},
	components: {},
	data() {
		return {
			deviceId: null, //设备ID
			options: {
				single: true,
				search: false,
				double: false,
				ring: false,
				fixed: false,
				cruise: false
			} //航行设置
		};
	},
	methods: {
		initMap() {
			var map = new AMap.Map("container", {
				zoom: 10, //设置地图显示的缩放级别
				center: [116.397428, 39.90923], //设置地图中心点坐标
				mapStyle: "amap://styles/001a637581603985681831e1471630a5" //设置地图的显示样式
			});
		},
		goHome() {
			this.$router.push({
				path: `/ship/detail/${this.deviceId}`
			});
		},
		setOptions(value) {
			if (value == "single") {
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
		}
	}
};
</script>

<style lang="scss" scoped>
#container {
	width: 64vw;
	height: 56vh;
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
		.menu1 {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 18vw;
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
					margin-top: -11vh;
					position: relative;
					.title {
						font-size: 1vw;
						font-family: Source Han Sans CN;
						font-weight: bold;
						color: #ffffff;
						position: absolute;
						top: 2vh;
						left: 1vw;
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
					margin-top: 2vh;
					//background-color: #ffa128;
				}
				.left3 {
					width: 66vw;
					height: 17vh;
					margin-left: 2vw;
					margin-top: 2vh;
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
							margin-left: 1.2vh;
							cursor: pointer;
							.active {
								background-color: #0096ff;
							}
							//background-color: #0096ff;
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
					height: 18vh;
					margin-left: 3vw;
					margin-top: 7vh;
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
	}
}
</style>
