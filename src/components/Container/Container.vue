<template>
	<div
		ref="container"
		class="container"
	>
		<slot />
	</div>
</template>

<script>
let resize;
export default {
	props: {
		options: Object
	},
	data() {
		return {
			width: 0,
			height: 0,
			originalWidth: 0,
			originalHeight: 0
		};
	},
	mounted() {
		this.init();
		this.updateSize();
		this.updateScale();
		resize = () => {
			this.init();
			this.updateScale();
		};
		window.addEventListener("resize", resize);
		console.log(
			this.width,
			this.height,
			this.originalWidth,
			this.originalHeight
		);
	},
	unMounted() {
		window.removeEventListener("resize", resize);
	},
	methods: {
		init() {
			if (this.options && this.options.width && this.options.height) {
				this.width = this.options.width;
				this.height = this.options.height;
			} else {
				this.width = this.$refs.container.clientWidth;
				this.height = this.$refs.container.clientHeight;
			}
			if (!this.originalWidth || !this.originalHeight) {
				this.originalWidth = window.screen.width;
				this.originalHeight = window.screen.height;
			}
		},
		updateSize() {
			if (this.width && this.height) {
				this.$refs.container.style.width = `${this.width}px`;
				this.$refs.container.style.height = `${this.height}px`;
			} else {
				this.$refs.container.style.width = `${this.originalWidth}px`;
				this.$refs.container.style.height = `${this.originalHeight}px`;
			}
		},
		updateScale() {
			const currentWidth = document.body.clientWidth;
			const currentHeight = document.body.clientHeight;
			const realWidth = this.width || this.originalWidth;
			const realHeight = this.Height || this.originalHeight;
			const widthScale = currentWidth / realWidth;
			const heightScale = currentHeight / realHeight;
			this.$refs.container.style.transform = `scale(${widthScale},${heightScale})`;
		}
	}
};
</script>

<style scoped>
.container {
	position: fixed;
	top: 0;
	left: 0;
	overflow: hidden;
	transform-origin: left top;
	z-index: 999;
}
</style>
