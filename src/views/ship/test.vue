<template>
	<div>
		<oss-upload />
		<div style="width: 25vw;height: 21vh;display:flex;justify-content:center;align-items:center;">
			<video
				id="myPlayer1"
				ref="video"
				style="width:22vw;height: 18vh;"
				controls
				playsInline
			>
				<source src="https://open.ys7.com/v3/openlive/C99929838_1_2.m3u8?expire=1653183047&id=317957803691556864&t=8989464f3b619e3eac8c0cb01e33e6456189fc781ccdcdf016fa36f586b4d7e3&ev=100">
			</video>
		</div>

	</div>
</template>

<script>
import ossUpload from "@/views/ship/ossUpload";

export default {
	name: "test",
	components: { ossUpload },
	mounted() {
		this.$nextTick(() => {
			const player1 = new EZUIPlayer("myPlayer1");
			const player2 = new EZUIPlayer("myPlayer2");
		});
	},
	methods: {},
};
</script>

<style>
</style>
