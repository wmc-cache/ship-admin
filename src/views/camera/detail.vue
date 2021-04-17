<template>

  <div class="body">
    <div class="content">
      <div class="menu1">数据总览</div>
      <div
        class="menu2"
        @click="goOperation"
        @touchstart="goOperation"
      >设备操作</div>
      <div
        class="menu3"
        @click="goIndex"
        @touchstart="goIndex"
      >返回</div>
      <!-- header -->
      <div class="header">

        <div class="title">
          <div
            class="text"
            style="margin-top:1vh;margin-bottom:-1vw"
          >水质监控系统</div>

          <dv-decoration-5 style="width:40vw;height:5vh;" />
        </div>

        <div class="tip-item" />

      </div>
      <!-- header -->
      <div class="content-middle">
        <div class="content-left">
          <div class="left1">
            <dv-border-box-10>

              <div class="title">气象数据</div>

            </dv-border-box-10>
          </div>
          <div class="left2">
            <dv-border-box-10>
              <div class="title">状态数据</div>
              <pie-chart
                class-name="pie"
                height="23vh"
                width="23vw"
              />
            </dv-border-box-10>
          </div>
        </div>
        <div class="middle">
          <dv-border-box-8
            :reverse="true"
            style="padding:0.5vh"
          >
            <div
              id="container"
              style="width:38vw;height:54vh;"
            />
          </dv-border-box-8>

        </div>

        <div class="content-right">
          <div class="right1">
            <dv-border-box-10>
              <div style="width: 25vw;height: 21vh;display:flex;justify-content:center;align-items:center;">
                <video
                  id="myPlayer"
                  style="width:22vw;height: 18vh;"
                  controls
                  playsInline
                >
                  <source src="https://hls01open.ys7.com/openlive/fe78747055f6492ab39474f5b38916fc.m3u8">
                </video>
              </div>
            </dv-border-box-10>
          </div>
          <div class="right2">
            <dv-border-box-10>
              <div class="title">操作</div>

              <!-- <a-button>拍照</a-button> -->

            </dv-border-box-10>
          </div>
        </div>

      </div>
      <div class="bottom">
        <dv-border-box-10>
          <div class="title">方向操作</div>

        </dv-border-box-10>
      </div>
    </div>
  </div>

</template>

<script>
import MQTT from 'paho-mqtt'
import PieChart from '@/views/camera/pieChart'
export default {
	components: {
		PieChart
	},
	data() {
		return {
			client: null, // MQTT实例
			x: null,
			y: null,
			map: null,
			deviceId: null
		}
	},
	mounted() {
		this.initMap()
	},
	methods: {
		initMap() {
			if (!this.x && !this.y) {
				this.x = 114.431408
				this.y = 30.523486
			}
			const map = new AMap.Map('container', {
				zoom: 13,
				viewMode: '3D',
				center: [this.x, this.y],
				mapStyle: 'amap://styles/001a637581603985681831e1471630a5' // 设置地图的显示样式
			})
			this.map = map
		},
		direction(value) {
			if (value == 'lookup') {
				console.log(value)
			}
		},
		goOperation() {
			this.$router.push({
				path: `/ship/operation/${this.deviceId}`
			})
		},
		goIndex() {
			this.$router.push({
				path: `/equipment/ship/list`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.pie {
	position: absolute;
	top: 6vh;
	left: 2vh;
}

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

			// .box {
			// 	// position: absolute;
			// 	// left: 8vh;
			// 	// top: 3vw;
			// 	width: 13vh;
			// 	height: 13vh;
			// 	background: rgba(12, 51, 103, 0.51);
			// 	box-shadow: 0px 0.6vh 1.8vh 0px rgba(2, 245, 242, 0.6),
			// 		0px -0.6vh 1.8vh 0px rgba(2, 245, 242, 0.6);
			// 	border-radius: 50%;
			// 	display: flex;
			// 	justify-content: center;
			// 	align-items: center;
			// }
		}
	}
}
</style>
