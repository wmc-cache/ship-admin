<template>
	<div>
		<el-tree
			ref="tree"
			:data="data"
			show-checkbox
			default-expand-all
			node-key="id"
			highlight-current
			:props="defaultProps"
		/>
	</div>

</template>

<script>
// 这个权限树组件写好了，但后端目前没办法删掉权限
import { getRolePower } from "../../api/roles";
import { dfs } from "../roles/help";
export default {
	props: {
		roleId: {
			type: String,
			default: true,
		},
	},

	data() {
		return {
			data: [],
			defaultProps: {
				children: "children",
				label: "label",
			},
		};
	},
	async mounted() {
		this.init();
		const data = await getRolePower(this.roleId);
		this.setCheckedKeys(dfs(data));
		window.dfsArr = [];
	},
	methods: {
		setCheckedKeys(arr) {
			this.$refs.tree.setCheckedKeys(arr);
		},
		// 不想写递归了,可以参考我其它位置写的
		init() {
			this.data = this.$store.state.permission.permissionMenuList;
			this.data.forEach((ele) => {
				ele.label = ele.name;
				ele.key = ele.id;
				if (ele.children.length != 0) {
					ele.children.forEach((ele) => {
						ele.label = ele.name;
						ele.key = ele.id;
						if (ele.children.length != 0) {
							ele.children.forEach((ele) => {
								ele.label = ele.name;
								ele.key = ele.id;
								if (ele.children.length != 0) {
									ele.children.forEach((ele) => {
										ele.label = ele.name;
										ele.key = ele.id;
										if (ele.children.length != 0) {
											ele.children.forEach((ele) => {
												ele.label = ele.name;
												ele.key = ele.id;
											});
										}
									});
								}
							});
						}
					});
				}
			});
		},
	},
};
</script>
