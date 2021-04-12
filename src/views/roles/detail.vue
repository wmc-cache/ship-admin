<template>
  <div class="app-container">
    <div>
      <el-tag type="success">全部菜单列表</el-tag>
      <el-table
        :key="tableKey"
        :data="powerList"
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
          label="path"
          prop="path"
          align="center"
          width="200"
        />
        <el-table-column
          label="name"
          prop="name"
          align="center"
          width="200"
        />
        <el-table-column
          label="icon"
          prop="icon"
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
              @click="addRole(row.id)"
            >为该角色添加菜单
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-tag type="success">我的菜单列表</el-tag>
      <el-table
        :key="tableKey2"
        :data="powerList2"
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
          label="path"
          prop="path"
          align="center"
          width="200"
        />
        <el-table-column
          label="name"
          prop="name"
          align="center"
          width="200"
        />
        <el-table-column
          label="icon"
          prop="icon"
          align="center"
          width="200"
        />

        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="{ row }" />
        </el-table-column>

      </el-table>

    </div>
  </div>
</template>

<script>
import { getRolePower, roleAddPower } from '../../api/roles'
import { getMenuList } from '../../api/power'
export default {
	data() {
		return {
			powerList: null,
			powerList2: null,
			tableKey: 0,
			tableKey2: 1
		}
	},
	async mounted() {
		const MenuList = await getMenuList()
		this.powerList = MenuList.data.children
		const RolePower = await getRolePower(this.$route.params.id)
		this.powerList2 = RolePower.data.children
		console.log(this.$route.params.id)
	},
	methods: {
		async addRole(id) {
			await roleAddPower(id, this.$route.params.id)
		}
	}
}
</script>

<style>
</style>
