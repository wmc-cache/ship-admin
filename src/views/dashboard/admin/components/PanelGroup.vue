<template>
  <!-- 三等分 四等分 五等分 -->
  <!-- <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col"> -->
  <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col"> -->
  <!-- <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
</el-col>

---------------------------------------------------------------------------
<style>
.el-col-lg-4-8 {
		width: 20%;
	}
</style> -->

  <el-row
    :gutter="30"
    class="panel-group"
  >
    <!-- 无人船 -->
    <!-- 无人船 -->
    <!-- 无人船 -->
    <el-col
      :xs="12"
      :sm="12"
      :lg="8"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('/equipment/ship/list')"
      >
        <div class="card-panel-icon-wrapper icon-ship">
          <svg-icon
            icon-class="ship"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            无人船云平台
          </div>
          <!-- <count-to
						:start-val="0"
						:end-val="data.user"
						:duration="2600"
						class="card-panel-num"
					/> -->
        </div>
      </div>
    </el-col>
    <!-- 无人船 -->
    <!-- 无人船 -->
    <!-- 无人船 -->
    <el-col
      :xs="12"
      :sm="12"
      :lg="8"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('/equipment/camera/list')"
      >
        <div class="card-panel-icon-wrapper icon-camera">
          <svg-icon
            icon-class="camera"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            智慧监控云平台
          </div>
          <!-- <count-to
						:start-val="0"
						:end-val="data.book"
						:duration="3000"
						class="card-panel-num"
					/> -->
        </div>
      </div>
    </el-col>

    <el-col
      :xs="12"
      :sm="12"
      :lg="8"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('/equipment/ship/list')"
      >
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon
            icon-class="link"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            环境监测平台
          </div>
          <!-- <count-to
						:start-val="0"
						:end-val="data.rank"
						:duration="2600"
						class="card-panel-num"
					/> -->
        </div>
      </div>
    </el-col>

    <el-col
      :xs="12"
      :sm="12"
      :lg="8"
      class="card-panel-col"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData('/equipment/ship/list')"
      >
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon
            icon-class="guide"
            class-name="card-panel-icon"
          />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            无人机智慧云平台
          </div>
          <!-- <count-to
						:start-val="0"
						:end-val="data.shelf"
						:duration="2600"
						class="card-panel-num"
					/> -->
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { bookHome } from '@/api/book'
import { getProductList } from '../../../../api/user'

export default {
	components: {
		CountTo
	},
	data() {
		return {
			data: { user: 1000, book: 1200, shelf: 1800, rank: 300000 }
		}
	},
	mounted() {
		getProductList(1, 10)
		// bookHome().then(response => {
		// 	this.data = response.data;
		// });
	},
	methods: {
		handleSetLineChartData(link) {
			this.$router.push({ path: `${link}` })
			// this.$emit("handleSetLineChartData", type);
		}
	}
}
</script>

<style lang="scss" scoped>
.panel-group {
	margin-top: 18px;

	.card-panel-col {
		margin-bottom: 32px;
	}

	.card-panel {
		height: 108px;
		cursor: pointer;
		font-size: 12px;
		position: relative;
		overflow: hidden;
		color: #666;
		background: #fff;
		box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
		border-color: rgba(0, 0, 0, 0.05);

		&:hover {
			.card-panel-icon-wrapper {
				color: #fff;
			}

			.icon-ship {
				background: #40c9c6;
			}

			.icon-camera {
				background: #36a3f7;
			}

			.icon-money {
				background: #f4516c;
			}

			.icon-shopping {
				background: #34bfa3;
			}
		}

		.icon-ship {
			color: #40c9c6;
		}

		.icon-camera {
			color: #36a3f7;
		}

		.icon-money {
			color: #f4516c;
		}

		.icon-shopping {
			color: #34bfa3;
		}

		.card-panel-icon-wrapper {
			float: left;
			margin: 14px 0 0 14px;
			padding: 16px;
			transition: all 0.38s ease-out;
			border-radius: 6px;
		}

		.card-panel-icon {
			float: left;
			font-size: 48px;
		}

		.card-panel-description {
			float: right;
			font-weight: bold;
			margin: 26px;
			margin-left: 0px;

			.card-panel-text {
				line-height: 18px;
				color: rgba(0, 0, 0, 0.45);
				font-size: 16px;
				margin-bottom: 12px;
			}

			.card-panel-num {
				font-size: 20px;
			}
		}
	}
}
//小于550px时
@media (max-width: 550px) {
	.card-panel-description {
		display: none;
	}

	.card-panel-icon-wrapper {
		float: none !important;
		width: 100%;
		height: 100%;
		margin: 0 !important;

		.svg-icon {
			display: block;
			margin: 14px auto !important;
			float: none !important;
		}
	}
}
</style>
