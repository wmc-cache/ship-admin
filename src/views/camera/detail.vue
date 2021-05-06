<template>

  <div class="body">
    <div class="content">
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

              <img
                src="../../assets/logo.png"
                class="logo"
              >

              <div
                :key="fmtKey"
                class="title"
              >{{ fmt( new Date() ) }}</div>

            </dv-border-box-10>
          </div>
          <div class="left2">
            <dv-border-box-10>
              <!-- <div class="title">状态数据</div> -->
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
                  :key="key"
                  style="width:22vw;height: 18vh;"
                  controls
                  playsInline
                  autoplay
                >
                  <source :src="videoSrc">
                </video>
              </div>
            </dv-border-box-10>
          </div>
          <div class="right2">
            <dv-border-box-10>
              <div class="title">操作</div>
              <div class="scroll-data">
                <dv-scroll-board
                  :config="config"
                  style="	width: 26vw;height: 30vh;"
                  @click="scrollBoard"
                />
              </div>

              <!-- <a-button>拍照</a-button> -->

            </dv-border-box-10>
          </div>
        </div>

      </div>
      <div class="bottom">
        <dv-border-box-10>

          <div style="display:flex">
            <div class="tip">方向控制</div>
            <div class="box">
              <el-tooltip
                class="item"
                effect="light"
                content="抬头"
                placement="top-start"
              >
                <i
                  style="color:#4081c4;font-size:40px;"
                  class="el-icon-caret-top pointer"
                />
              </el-tooltip>

              <div class="box-middle">
                <el-tooltip
                  class="item"
                  effect="light"
                  content="左偏"
                  placement="left-start"
                >
                  <i
                    style="color:#4081c4;font-size:40px"
                    class="el-icon-caret-left pointer"
                  />

                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="右偏"
                  placement="right-start"
                ><i
                  style="color:#4081c4;font-size:40px"
                  class="el-icon-caret-right pointer"
                />

                </el-tooltip>

              </div>

              <el-tooltip
                class="item"
                effect="light"
                content="低头"
                placement="bottom-start"
              >
                <i
                  style="color:#4081c4;font-size:40px"
                  class="el-icon-caret-bottom pointer"
                />
              </el-tooltip>

            </div>
            <div class="tip">位置和焦距控制</div>
            <div class="box2">
              <el-tooltip
                class="item"
                effect="light"
                content="上升"
                placement="top-start"
              >
                <i
                  style="color:#4081c4;font-size:40px;"
                  class="el-icon-caret-top pointer"
                />
              </el-tooltip>

              <div class="box-middle">
                <el-tooltip
                  class="item"
                  effect="light"
                  content="减小焦距"
                  placement="left-start"
                >
                  <i
                    style="color:#4081c4;font-size:40px"
                    class="el-icon-caret-left pointer"
                  />

                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="增大焦距"
                  placement="right-start"
                ><i
                  style="color:#4081c4;font-size:40px"
                  class="el-icon-caret-right pointer"
                />

                </el-tooltip>

              </div>

              <el-tooltip
                class="item"
                effect="light"
                content="下降"
                placement="bottom-start"
              >
                <i
                  style="color:#4081c4;font-size:40px"
                  class="el-icon-caret-bottom pointer"
                />
              </el-tooltip>

            </div>

          </div>

        </dv-border-box-10>
      </div>
    </div>
  </div>

</template>

<script>
import { fmt } from '../../utils/date'
import MQTT from 'paho-mqtt'
import PieChart from '@/views/camera/pieChart'
import Axios from 'axios'
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
			deviceId: null,
			fmt: fmt,
			key: 0,
			currentVideo: '摄像头1号',
			fmtKey: 0,
			videoSrc: 'https://www.xxlun.com/website/file/video/video1.mp4',
			config: {
				header: ['摄像头编号', '状态信息', '视频源'],
				data: [
					[
						'摄像头1号',
						'捕捉到车',
						'https://www.xxlun.com/website/file/video/video1.mp4'
					],
					[
						'摄像头2号',
						'捕捉到人',
						'https://www.xxlun.com/website/file/video/video2.mp4'
					],
					[
						'摄像头3号',
						'捕捉到船',
						'https://www.xxlun.com/website/file/video/video3.mp4'
					],
					[
						'摄像头4号',
						'正常',
						'https://www.xxlun.com/website/file/video/video4.mp4'
					],
					['摄像头5号', "<span style='color:#ff0000;'>异常状态</span>"],
					['摄像头6号', '正常'],
					['摄像头7号', '捕捉到人'],
					['摄像头8号', '捕捉到船'],
					['摄像头9号', '正常'],
					['摄像头10号', '正常']
				]
			}
		}
	},
	mounted() {
		this.initMap();
		[
			[114.431408, 30.523486],
			[114.433408, 30.525486],
			[114.433408, 30.527486],
			[114.433408, 30.529486]
		].forEach((ele) => {
			this.icon(ele[0], ele[1])
		})
		setInterval(() => {
			this.fmtKey++
		}, 1000)
		// Axios.get(
		// 	"https://api.seniverse.com/v3/weather/now.json?key=SXinuArqvyJdzO34c&location=beijing&language=zh-Hans&unit=c"
		// ).then((res) => {
		// 	console.log(res);
		// });
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
		// 画摄像头
		icon(x, y) {
			const planIcon = new AMap.Icon({
				size: new AMap.Size(40, 50), // 图标尺寸
				image: 'https://www.xxlun.com/website/file/camera.png', // Icon的图像
				imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
			})
			const planMarker = new AMap.Marker({
				position: new AMap.LngLat(x, y),
				offset: new AMap.Pixel(-20, -20),
				icon: planIcon,
				title: '摄像头',
				zoom: 13
			})
			planMarker.on('click', this.iconClick)

			this.map.add(planMarker)
		},
		// 轮播表点击事件
		scrollBoard(e) {
			if (e.row[2]) {
				this.videoSrc = e.row[2]
				this.key++
			}
		},
		// 摄像头点击事件
		iconClick(e) {
			this.videoSrc = 'https://www.xxlun.com/website/file/video/video2.mp4'
			this.key++
			console.log(e.lnglat.lng, e.lnglat.lat)
			const infoWindow = new AMap.InfoWindow({
				anchor: 'top-left',
				content: `${e.lnglat.lng},${e.lnglat.lat}`
			})
			infoWindow.open(this.map, [`${e.lnglat.lng}`, `${e.lnglat.lat}`])
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
.tip {
	margin-top: 3vw;
	margin-left: 4vw;
	color: #4081c4;
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

			.box {
				display: flex;
				flex-direction: column;
				width: 13vh;
				height: 13vh;
				position: relative;
				margin-left: 50px;
				.el-icon-caret-top {
					position: absolute;
					top: 20px;
					left: 40px;
				}
				.el-icon-caret-left {
					position: absolute;
					top: 60px;
					left: 5px;
				}
				.el-icon-caret-right {
					position: absolute;
					top: 60px;
					left: 75px;
				}
				.el-icon-caret-bottom {
					position: absolute;
					top: 100px;
					left: 40px;
				}
			}

			.box2 {
				display: flex;
				flex-direction: column;
				width: 13vh;
				height: 13vh;
				position: relative;
				margin-left: 100px;

				.el-icon-caret-top {
					position: absolute;
					top: 20px;
					left: 40px;
				}
				.el-icon-caret-left {
					position: absolute;
					top: 60px;
					left: 5px;
				}
				.el-icon-caret-right {
					position: absolute;
					top: 60px;
					left: 75px;
				}
				.el-icon-caret-bottom {
					position: absolute;
					top: 100px;
					left: 40px;
				}
			}
		}
	}
}
</style>
