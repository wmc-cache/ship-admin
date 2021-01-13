<template>

	<!-- <dv-full-screen-container> -->

	<div class="body">

		<div class="content">
			<!-- header -->
			<div class="header">

				<div class="title">
					<div
						class="text"
						style="margin-top:20px;margin-bottom:-20px"
					>无人船智能云平台</div>

					<dv-decoration-5 style="width:400px;height:50px;" />
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

				</div>

			</div>
			<!-- header -->
			<div class="content-middle">
				<div class="content-left">
					<div class="left1">
						<dv-border-box-1>

							<div class="title">气象数据</div>
							<div class="time">2002年1月7日 星期四 10:22:34</div>
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
							</div>
						</dv-border-box-1>
					</div>
					<div class="left2">
						<dv-border-box-1></dv-border-box-1>
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
						<dv-border-box-1></dv-border-box-1>
					</div>
					<div class="right2">
						<dv-border-box-1></dv-border-box-1>
					</div>
				</div>

			</div>
			<div class="bottom">
				<dv-border-box-1></dv-border-box-1>
			</div>
		</div>
	</div>

	<!-- </dv-full-screen-container> -->

</template>

<script>
export default {
	mounted() {
		this.initMap();
	},
	methods: {
		initMap() {
			var map = new AMap.Map("container", {
				zoom: 15, //设置地图显示的缩放级别
				center: [116.397428, 39.90923], //设置地图中心点坐标
				mapStyle: "amap://styles/8606e612dae1dafeb0d7589bb9497bb1" //设置地图的显示样式
			});
		}
	}
};
</script>

<style lang="scss" scoped>
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

			// background-color: blueviolet;
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
				left: 10vw;
				top: 5vh;
				font-size: 1vw;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #0096ff;
			}
			.data-list {
				position: absolute;
				left: 10vw;
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
			width: 26vw;
			height: 30vh;
			//background-color: magenta;
			margin-top: 10vh;
			margin-left: 2vw;
		}
		.bottom {
			width: 95vw;
			height: 22vh;
			//background-color: tomato;
			margin: auto;
			margin-top: 2vh;
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
</style>
