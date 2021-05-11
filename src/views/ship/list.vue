<template>
  <div class="app-container">
    <el-dialog
      v-el-drag-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        v-model="shipName"
        style="margin-top:10px"
        clearable
        placeholder="船名"
      />
      <el-input
        v-model="platformName"
        style="margin-top:20px"
        clearable
        placeholder="平台名称"
      />
      <el-input
        v-model="unitName"
        style="margin-top:20px"
        clearable
        placeholder="单位名称"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @clikc="sureEdit"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="DeviceList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      height="500"
    >

      <el-table-column
        fixed="left"
        label="序号"
        prop="id"
        align="center"
        width="100"
      />

      <el-table-column
        label="类型"
        prop="type"
        align="center"
        width="200"
      />
      <el-table-column
        label="船名"
        prop="deviceName"
        align="center"
        width="200"
      />
      <el-table-column
        label="位置"
        prop="position"
        align="center"
        width="200"
      />
      <el-table-column
        label="加入时间"
        prop="gmtCreate"
        align="center"
        width="200"
      />

      <el-table-column
        v-if="showID"
        label="设备ID"
        prop="deviceId"
        align="center"
        width="200"
      />
      <el-table-column
        label="修改时间"
        prop="gmtModified"
        align="center"
        width="200"
      />
      <el-table-column
        label="平台名称"
        prop="platformName"
        align="center"
        width="200"
      />
      <el-table-column
        label="单位名称"
        prop="corporateName"
        align="center"
        width="200"
      />
      <el-table-column
        label="操作"
        align="center"
        width="200"
        fixed="right"
      >
        <template slot-scope="{ row }">

          <el-button
            type="text"
            icon="el-icon-view"
            style="cursor: pointer;"
            @click="goToDetail(row)"
          >详情
          </el-button>
          <el-button
            type="text"
            icon="el-icon-view"
            style="cursor: pointer;"
            @click="selectMap(row)"
          >历史监测数据
          </el-button>
          <el-button
            type="text"
            icon="el-icon-view"
            style="cursor: pointer;"
            @click="edit(row)"
          >编辑
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="refresh"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import elDragDialog from '@/directive/el-drag-dialog'
import { getDeviceList } from '../../api/user'
export default {
	components: {
		Pagination
	},
	directives: { elDragDialog },
	data() {
		return {
			total: 90,
			tableKey: 0,
			DeviceList: null,
			listLoading: true,
			showID: true,
			dialogVisible: false,
			shipName: 'shipName',
			platformName: 'platformName',
			unitName: 'unitName',
			listQuery: {
				title: '',
				author: '',
				category: '',
				page: 1, // 当前页数
				pageSize: 10 // 每页数量
			}
		}
	},
	mounted() {
		getDeviceList(0, 10).then((res) => {
			this.DeviceList = res.data.items
			// console.log(DeviceList);
			this.total = res.data.total
			this.listLoading = false
		})
	},
	methods: {
		// 分页函数
		refresh() {
			// console.log("list", this.listQuery);
			this.listLoading = true
			getDeviceList(this.listQuery.page, this.listQuery.pageSize).then(
				(res) => {
					this.DeviceList = res.data.items
					this.total = res.data.total
					this.listLoading = false
				}
			)
		},
		edit(row) {
			this.dialogVisible = true
			this.shipName = row.deviceName
			this.platformName = row.platformName
			this.unitName = row.corporateName
		},
		changeShowCover() {
			if (showID) {
				this.showID = false
			} else {
				this.showID = true
			}
		},
		handleClose() {
			this.dialogVisible = false
		},
		sureEdit() {},
		goToDetail(row) {
			this.$router.push({ path: `/ship/operation/${row.deviceId}` })
		},
		selectMap(row) {
			this.$router.push({
				path: `/equipment/selectMap/${row.deviceId}`,
				query: { name: 'wu' }
			})
		}
	}
}
</script>

<style>
</style>
