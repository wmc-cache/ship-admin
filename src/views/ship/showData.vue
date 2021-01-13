<template>
	<div>历史监测数据</div>
</template>

<script>
import { getDetectData } from "../../api/ship.js";
export default {
	async mounted() {
		const deviceId = this.$route.params.deviceId;
		const mapId = this.$route.params.deviceId.mapId;
		const data = await getDetectData(deviceId, mapId);
		console.log("历史监测数据", data.data);
	}
};
</script>

<style>
</style>
