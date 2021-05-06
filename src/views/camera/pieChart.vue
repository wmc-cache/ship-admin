<template>
	<div
		:class="className"
		:style="{height:height,width:width}"
	/>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
	mixins: [resize],
	props: {
		className: {
			type: String,
			default: "chart",
		},
		width: {
			type: String,
			default: "100%",
		},
		height: {
			type: String,
			default: "300px",
		},
	},
	data() {
		return {
			chart: null,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.initChart();
		});
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		initChart() {
			this.chart = echarts.init(this.$el, "macarons");

			this.chart.setOption({
				// tooltip: {
				// 	trigger: "item",
				// 	formatter: "{a} <br/>{b} : {c} ({d}%)",
				// },
				tooltip: { show: true },
				// legend: {
				// 	left: "center",
				// 	bottom: "10",
				// 	data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"]
				// },
				series: [
					{
						// name: "水质状况统计",
						type: "pie",
						// roseType: "radius",
						// radius: [15, 95],
						// center: ["50%", "38%"],
						data: [
							{ value: 9, name: "正常监控" },
							{ value: 1, name: "异常监控" },
						],
						animationEasing: "cubicInOut",
						animationDuration: 2600,
					},
				],
			});
		},
	},
};
</script>
