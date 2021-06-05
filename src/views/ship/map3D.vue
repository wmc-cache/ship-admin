<template>
	<div class="body">
		<el-button
			@click="goBack"
			class="title"
			type="primary"
		>
			返回
		</el-button>
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
export default {
	name: "Map3D",
	data() {
		return {
			map: null,
		};
	},
	mounted() {
		this.initMap();
	},
	destroyed() {
		// this.map.destroy();
		// console.log("map destroy");
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
	},
};
</script>

<style  scoped>
.body {
	position: relative;
}
.title {
	position: absolute;
	top: 2vw;
	left: 2vh;
	width: auto;
	height: auto;
	z-index: 1000;
}
</style>
