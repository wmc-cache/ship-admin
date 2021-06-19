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

    <!-- <div class="buttons">
			<el-button @click="getCheckedNodes">通过 node 获取</el-button>
			<el-button @click="getCheckedKeys">通过 key 获取</el-button>
			<el-button @click="setCheckedNodes">通过 node 设置</el-button>
			<el-button @click="setCheckedKeys">通过 key 设置</el-button>
			<el-button @click="resetChecked">清空</el-button>
		</div> -->
  </div>

</template>

<script>
// 这个权限树组件写好了，但后端目前没办法删掉权限
import { getRolePower } from '../../api/roles'
import { dfs } from './help'
export default {
	props: {
		roleId: {
			type: String,
			default: true
		}
	},

	data() {
		return {
			data: [
				{
					id: 1,
					label: '一级 1',
					children: [
						{
							id: 4,
							label: '二级 1-1',
							children: [
								{
									id: 9,
									label: '三级 1-1-1'
								},
								{
									id: 10,
									label: '三级 1-1-2'
								}
							]
						}
					]
				},
				{
					id: 2,
					label: '一级 2',
					children: [
						{
							id: 5,
							label: '二级 2-1'
						},
						{
							id: 6,
							label: '二级 2-2'
						}
					]
				},
				{
					id: 3,
					label: '一级 3',
					children: [
						{
							id: 7,
							label: '二级 3-1'
						},
						{
							id: 8,
							label: '二级 3-2'
						}
					]
				}
			],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		}
	},
	async mounted() {
		this.init()
		const data = await getRolePower(this.roleId)
		// console.log(dfs(data));

		this.setCheckedKeys(dfs(data))
		window.dfsArr = []
	},
	methods: {
		getCheckedNodes() {
			console.log(this.$refs.tree.getCheckedNodes())
		},
		getCheckedKeys() {
			console.log(this.$refs.tree.getCheckedKeys())
		},
		setCheckedNodes() {
			this.$refs.tree.setCheckedNodes([
				{
					id: 5,
					label: '二级 2-1'
				},
				{
					id: 9,
					label: '三级 1-1-1'
				}
			])
		},
		setCheckedKeys(arr) {
			// console.log(localStorage.getItem("dfs").split(","));
			this.$refs.tree.setCheckedKeys(arr)
		},
		resetChecked() {
			this.$refs.tree.setCheckedKeys([])
		},
		// 不想递归了,可以参考我其它位置写的
		init() {
			this.data = this.$store.state.permission.permissionMenuList
			this.data.forEach((ele) => {
				ele.label = ele.name
				ele.key = ele.id
				if (ele.children.length != 0) {
					ele.children.forEach((ele) => {
						ele.label = ele.name
						ele.key = ele.id
						if (ele.children.length != 0) {
							ele.children.forEach((ele) => {
								ele.label = ele.name
								ele.key = ele.id
								if (ele.children.length != 0) {
									ele.children.forEach((ele) => {
										ele.label = ele.name
										ele.key = ele.id
										if (ele.children.length != 0) {
											ele.children.forEach((ele) => {
												ele.label = ele.name
												ele.key = ele.id
											})
										}
									})
								}
							})
						}
					})
				}
			})
		}
	}
}
</script>
