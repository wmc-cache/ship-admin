<template>

	<div class="app-container">
		<el-table
			:key="tableKey"
			:data="userList"
			border
			fit
			highlight-current-row
			style="width: 100%;"
		>

			<el-table-column
				label="id"
				prop="id"
				align="center"
				width="200"
			/>
			<el-table-column
				label="username"
				prop="username"
				align="center"
				width="200"
			/>
			<el-table-column
				label="gmtCreate"
				prop="gmtCreate"
				align="center"
				width="200"
			/>
			<el-table-column
				label="gmtModified"
				prop="gmtModified"
				align="center"
				width="200"
			/>

			<el-table-column
				label="操作"
				align="center"
			>
				<template slot-scope="{ row }">
					<el-button
						type="text"
						icon="el-icon-view"
						style="cursor: pointer;"
					>删除用户
					</el-button>
				</template>
			</el-table-column>

		</el-table>

	</div>

</template>

<script>
import { getUserList } from "../../api/user";
export default {
	name: "userList",
	data() {
		return {
			userList: null,
			tableKey: 0
		};
	},
	mounted() {
		getUserList().then(res => {
			console.log(res);
			this.userList = res.data.items;
		});
	}
};
</script>

<style>
</style>
