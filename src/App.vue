<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
	name: 'App',

	// watch: {
	// 	Point(value) {
	// 		if (value[0] != 114.431408) {
	// 			this.initPoint();
	// 			this.currentList.push(value);
	// 			this.draw(this.currentList);
	// 		}
	// 	},
	// },
	mounted() {}
}
</script>

<style scoped>
html,
body,
#app {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
}
</style>
