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
				tooltip: { show: true },
				series: [
					{
						type: "pie",

						data: [
							{ value: 320, name: "正常状态" },
							{ value: 40, name: "异常状态" },
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
