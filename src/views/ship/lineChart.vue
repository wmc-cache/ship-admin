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
			type: Object,
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
				this.setOptions(val);
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
			this.setOptions();
		},
		setOptions() {
			this.chart.setOption({
				title: {
					text: "PH",
					left: "30%",
					top: "10%",
					textStyle: {
						fontSize: 12
						// textBorderWidth: 10,
						// textBorderColor: "#ddd",
						// lineHeight: 40
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
						data: [820, 932, 901, 934, 1290, 1330, 1320]
					}
				]
			});
		}
	}
};
</script>
