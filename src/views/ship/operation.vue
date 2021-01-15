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
							<dv-border-box-10></dv-border-box-10>
						</div>
						<div class="left3-right">
							<dv-border-box-10></dv-border-box-10>
						</div>

					</div>
				</div>
				<div class="right">
					<div class="right1">
						<dv-border-box-10></dv-border-box-10>
					</div>
					<div class="right2">
						<dv-border-box-10></dv-border-box-10>
					</div>
					<div class="right3">
						<dv-border-box-10></dv-border-box-10>
					</div>
					<div class="right4">
						<dv-border-box-10></dv-border-box-10>
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
	},
	components: {},
	data() {
		return {
			deviceId: null
		};
	},
	methods: {
		initMap() {
			var map = new AMap.Map("container", {
				zoom: 15, //设置地图显示的缩放级别
				center: [116.397428, 39.90923], //设置地图中心点坐标
				mapStyle: "amap://styles/8606e612dae1dafeb0d7589bb9497bb1" //设置地图的显示样式
			});
		},
		goHome() {
			this.$router.push({
				path: `/ship/detail/${this.deviceId}`
			});
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
			width: 4vw;
			height: 3vh;
			width: 72px;
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
			width: 4vw;
			height: 3vh;
			width: 72px;
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
			width: 4vw;
			height: 3vh;
			width: 72px;
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
						top: 1vh;
						left: 1vw;
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

					.left3-left {
						width: 56vw;
						height: 17vh;
					}
					.left3-right {
						width: 8vw;
						height: 17vh;
						margin-left: 2vw;
						//background-color: seagreen;
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
				}
				.right3 {
					width: 25vw;
					height: 18vh;
					margin-left: 3vw;
					margin-top: 4vh;
					//background-color: #0096ff;
				}
				.right4 {
					width: 25vw;
					height: 18vh;
					margin-left: 3vw;
					margin-top: 4vh;
					//background-color: #0096ff;
				}
			}
		}
	}
}

@media (min-device-width: 1024px) {
}
@media (min-device-width: 1100px) {
}
@media (min-device-width: 1280px) {
}
@media (min-device-width: 1366px) {
}
@media (min-device-width: 1440px) {
}
@media (min-device-width: 1440px) {
}
@media (min-device-width: 1920px) {
	.body {
		width: 100vw;
		height: 100vh;
		background: #223957;
		.content {
			width: 99vw;
			height: 99vh;
			border: 1px solid #4081c4;
		}
	}
}
@media (min-device-width: 2560px) {
}
@media (min-device-width: 4096px) {
}
// 1024*500
// 1024*768(第一阶段)
// 1280*800(第一阶段)
// 1280*1024
// 1280*854
// 1366*768
// 1440*900(第一阶段)
// 1440*1050
// 1600*1024
// 1600*1200
// 1680*1050
// 1920*1200(第一阶段)
// 2560*1440
// 4096×2160
</style>
