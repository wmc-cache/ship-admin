<template>
	<div>
		<div id="map"></div>
	</div>
</template>

<script>
export default {
	mounted() {
		var map = new AMap.Map("map", {
			zoom: 10, //设置地图显示的缩放级别
			center: [116.397428, 39.90923], //设置地图中心点坐标
			mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
			viewMode: "2D", //设置地图模式
			lang: "zh_cn" //设置地图语言类型
		});
	}
};
</script>

<style>
</style>
