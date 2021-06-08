<template>
	<div class="body">
		<el-button
			@click="goBack"
			class="title"
			type="primary"
		>
			返回
		</el-button>
		<el-date-picker
			class="date"
			v-model="date"
			type="daterange"
			range-separator="-"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
		/>
		<div
			id="map"
			style="	width: 100vw;
	            height: 100vh;
	            margin: 0;
	            padding: 0;"
		/>
	</div>

</template>

<script>
import { getDetectData } from "../../api/ship.js";
import { fmt } from "../../utils/date";
export default {
	name: "Map3D",
	data() {
		return {
			map: null,
			date: null,
			water: null,
		};
	},
	mounted() {
		this.initMap();
	},
	destroyed() {
		// this.map.destroy();
		// console.log("map destroy");
	},
	watch: {
		date(value) {
			const deviceId = this.$route.params.deviceId;
			const mapId = this.$route.params.MapId;
			getDetectData(
				deviceId,
				mapId,
				fmt(value[0]).split(" ")[0],
				fmt(value[1]).split(" ")[0]
			).then((res) => {
				this.water = res.data.data.water;
				this.water.forEach((ele) => {
					if (ele.gjwd) {
						this.drawIcon(JSON.parse(ele.gjwd)[0], JSON.parse(ele.gjwd)[1]);
					}
				});
			});
		},
	},
	methods: {
		initMap() {
			const map = new AMap.Map("map", {
				zooms: [2, 23],
				zoom: 11.7,
				center: [114.431408, 30.523486],
				pitch: 45,
				// showLabel: false,
				// viewMode: "3D",
				mapStyle: "amap://styles/001a637581603985681831e1471630a5",
			});
			this.map = map;
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
		goBack() {
			this.$router.go(-1);
		},
		drawIcon(x, y) {
			const planIcon = new AMap.Icon({
				size: new AMap.Size(40, 50), // 图标尺寸
				image: "//webapi.amap.com/theme/v1.3/markers/b/mark_bs.png", // Icon的图像
				imageSize: new AMap.Size(40, 50), // 根据所设置的大小拉伸或压缩图片
			});
			const planMarker = new AMap.Marker({
				position: new AMap.LngLat(x, y),
				offset: new AMap.Pixel(-4, -5),
				icon: planIcon,
				title: "采样点",
				zoom: 13,
			});
			planMarker.on("click", this.iconClick);
			this.map.add(planMarker);
		},
		// 摄像头点击事件
		iconClick(e) {
			console.log(e.lnglat.lng, e.lnglat.lat);
			const title = `检测站${e.lnglat.lng},${e.lnglat.lat}`;
			const content = [];
			content.push(
				"<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里"
			);
			content.push("电话：010-64733333");
			// content.push(`<a>详细信息${e.lnglat.lng}</a>`);
			const infoWindow = new AMap.InfoWindow({
				anchor: "bottom-left",
				isCustom: true, // 使用自定义窗体
				content: this.createInfoWindow(title, content.join("<br/>")),
				// offset: new AMap.Pixel(0, -155),
			});

			infoWindow.open(this.map, [`${e.lnglat.lng}`, `${e.lnglat.lat}`]);
		},
		// 构建自定义信息窗体
		createInfoWindow(title, content) {
			const info = document.createElement("div");
			info.style.color = "#fff";
			// 可以通过下面的方式修改自定义窗体的宽高

			info.style.width = "400px";
			info.style.position = "relative";
			// 定义顶部标题

			const top = document.createElement("div");
			const titleD = document.createElement("div");
			const closeX = document.createElement("img");
			closeX.style.position = "absolute";
			closeX.style.right = "0";
			closeX.style.top = "0";
			closeX.style.cursor = "pointer";

			closeX.src = "https://webapi.amap.com/images/close2.gif";
			closeX.onclick = this.closeInfoWindow;
			top.style.backgroundColor = "#245098";
			titleD.innerHTML = title;

			top.appendChild(closeX);
			top.appendChild(titleD);
			info.appendChild(top);

			// 定义中部内容

			const middle = document.createElement("div");
			middle.style.backgroundColor = "#245098";
			middle.innerHTML = content;
			info.appendChild(middle);
			// 定义底部内容

			// const bottom = document.createElement("div");
			// bottom.innerHTML = "详细信息";
			// bottom.style.position = "absolute";
			// bottom.style.right = "0";
			// bottom.style.top = "40px";
			// bottom.style.cursor = "pointer";
			// bottom.onclick = this.detailMessage;
			// info.appendChild(bottom);
			return info;
		},
		closeInfoWindow() {
			this.map.clearInfoWindow();
		},
	},
};
</script>

<style  scoped>
.body {
	position: relative;
}
.title {
	position: fixed;
	top: 2vw;
	left: 2vh;
	width: auto;
	height: auto;
	z-index: 1000;
}
.date {
	position: fixed;
	top: 2vw;
	left: 20vh;
	z-index: 1000;
}
</style>
