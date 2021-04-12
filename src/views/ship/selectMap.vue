<template>
  <div>

    <el-dialog
      title="修改湖名"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        v-model="name"
        clearable
        placeholder="新湖名"
      />

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="sure"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="MapList"
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
        label="name"
        prop="name"
        align="center"
        width="200"
      />

      <el-table-column
        label="操作"
        align="center"
        width="400"
      >
        <template slot-scope="{ row }">

          <el-button
            type="text"
            icon="el-icon-view"
            style="cursor: pointer;"
            @click="goToDetail(row)"
          >查看历史监测数据(可视化)</el-button>
          <el-button
            type="text"
            icon="el-icon-view"
            style="cursor: pointer;"
            @click="goToDetailTable(row)"
          >查看历史监测数据(图表)
          </el-button>

          <el-button
            type="text"
            icon="el-icon-view"
            style="cursor: pointer;"
            @click="upDataName(row)"
          >修改湖名
          </el-button>

        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import { getMapListShow, postMapName } from '@/api/ship'

export default {
	data() {
		return {
			MapList: null,
			dialogVisible: false,
			name: null,
			mapId: null
		}
	},
	async mounted() {
		const deviceId = this.$route.params.deviceId
		getMapListShow(deviceId).then((res) => {
			this.MapList = res.data.mapList
		})
	},
	methods: {
		upDataName(row) {
			this.mapId = row.id
			this.dialogVisible = true
		},
		sure() {
			postMapName(this.mapId, this.name).then((res) => {
				console.log(res)
				location.reload()
			})
		},
		goToDetail(row) {
			const deviceId = this.$route.params.deviceId
			this.$router.push({
				path: `/showWaterData/${deviceId}/${row.id}`
			})
		},
		goToDetailTable(row) {
			const deviceId = this.$route.params.deviceId
			this.$router.push({
				path: `/waterDataTable/${deviceId}/${row.id}`
			})
		},
		handleClose() {
			this.dialogVisible = false
		}
	}
}
</script>

<style>
</style>
