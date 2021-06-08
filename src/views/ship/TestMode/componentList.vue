<template>
	<div
		v-for="(item, index) in list"
		:key="index"
		class="component-item"
		@click="onItemClick(item)"
	>
	</div>
</template>

<script>
import { cloneDeep } from "lodash-es";
import {  uuidv4 } from "uuid";
export default {
	name: "componentList",
	props: {
		list: {
			type: Array,
			required: true,
		},
	},
	mounted() {},
	methods: {
   	 onItemClick = (props) => {
			props = cloneDeep(props); //深拷贝
			const componentData = {
				name: "w-component",
				id: uuidv4(),
				props,
			};
			context.emit("on-item-click", componentData);
		};
  },
};
</script>

<style>
</style>
