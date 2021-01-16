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
			default: "chart"
		},
		width: {
			type: String,
			default: "20vw"
		},
		height: {
			type: String,
			default: "25vh"
		},
		autoResize: {
			type: Boolean,
			default: true
		},
		chartData: {
			type: Array,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			chart: null,
			x: []
		};
	},
	watch: {
		chartData: {
			deep: true,
			handler(val) {
				this.setOptions(val, this.title);
			}
		}
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
			//	console.log(this.$el);
			this.chart = echarts.init(this.$el, "macarons");
			this.setOptions(this.chartData);
		},
		setOptions(chartData, title) {
			this.chart.setOption({
				title: {
					text: title,
					left: "40%",
					top: "10%",
					textStyle: {
						fontSize: 12
					}
				},
				xAxis: {
					type: "category",
					data: this.x
				},
				yAxis: { type: "value" },
				series: [
					{
						type: "line",
						data: chartData
					}
				]
			});
		}
	}
};
</script>
