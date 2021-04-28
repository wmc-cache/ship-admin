<template>

	<div
		id="map"
		style="	width: 100%;
	            height: 100%;
	            margin: 0;
	            padding: 0;"
	></div>

</template>

<script>
export default {
	name: "map3D",
	data() {
		return {
			map: null,
		};
	},
	mounted() {
		this.initMap();
	},
	destroyed() {
		//this.map.destroy();
		//console.log("map destroy");
	},
	methods: {
		initMap() {
			let map = new AMap.Map("map", {
				zooms: [6, 23],
				zoom: 11.7,
				center: [114.431408, 30.523486],
				pitch: 45,
				//showLabel: false,
				viewMode: "3D",
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
	},
};
</script>

<style  scoped>
.demo-title {
	position: absolute;
	top: 25px;
	left: 25px;
	z-index: 1;
}

h1 {
	font-size: 18px;
	margin: 0;
	color: rgb(180, 180, 190);
}

h3 {
	font-size: 12px;
	font-weight: normal;
	margin-top: 5px;
	color: rgb(150, 150, 150);
}
</style>
