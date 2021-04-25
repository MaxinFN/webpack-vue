<template>
  <div class="page-table" :class="className">
    <el-table
      class="st__table"
      v-bind="$attrs"
      v-on="$listeners"
      ref="elTable"
      style="width: 100%"
      :max-height="maxHeight"
      v-loading="loading"
      border
      highlight-current-row
      :data="data"
      :row-key="rowKey"
      :header-row-style="{ height: '50px', color: '#606266' }"
      default-expand-all
    >
      <!--多选-->
      <el-table-column
        v-if="checkBox"
        :key="'selection'"
        type="selection"
        width="55px"
      />
      <!--单选-->
      <el-table-column
        label="选择"
        v-if="radioCheck"
        width="55"
        header-align="center"
        align="center"
        :fixed="columns.some((item) => item.fixed)"
      >
        <template slot-scope="scope">
          <el-radio class="radio" v-model="radio" :label="scope.$index">
            &nbsp;
          </el-radio>
        </template>
      </el-table-column>
      <!-- tabIndex -->
      <el-table-column
        v-if="tabIndex"
        :key="'index'"
        align="center"
        label="序号"
        :width="columns.length === 0 ? '' : 80"
        :fixed="columns.some((item) => item.fixed)"
      >
        <template v-slot="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!-- handle -->
      <el-table-column
        v-if="handle"
        :key="'handle'"
        :fixed="handle.fixed"
        align="center"
        :label="handle.label"
        :width="handle.width"
      >
        <template v-slot="scope">
          <template v-for="(item, index) in handle.btns || []">
            <!-- 自定义操作类型 -->
            <slot
              v-if="item.slot"
              :name="'bt-' + item.event"
              :data="{ item, row: scope.row, $index: scope.$index }"
            />
            <!-- -->
            <slot
              v-if="item.slot"
              name="dy-query-btn"
              :data="{ item, row: scope.row, $index: scope.$index }"
            />
            <!--  -->
            <el-button
              v-if="!item.slot && (!item.ifRender || item.ifRender(scope.row))"
              :key="index"
              size="mini"
              :type="item.type"
              :icon="item.icon"
              :disabled="item.disabled"
              :class="item.class"
              @click.stop="handleClick(item.event, scope.row, scope.$index)"
            >
              {{ item.label }}
            </el-button>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in columns.filter((item) => !item.hidden)"
        header-align="center"
        :key="index"
        :prop="item.value"
        :label="item.label"
        :fixed="item.fixed"
        :align="item.align || 'center'"
        :width="item.width"
        :min-width="item.minWidth || '100px'"
        :show-overflow-tooltip="item.showOverflowTooltip || false"
      >
        <!-- header 自定义气泡 -->
        <template #header="scope">
          <template v-if="item.headerType === 'slot'">
            <slot :name="'header-' + item.value" :item="item" />
            <slot name="dy-query-header" :data="{ item: item }" />
          </template>
          <el-popover
            v-else-if="item.header_bubble"
            trigger="hover"
            placement="top"
            :width="300"
          >
            <span slot="reference">
              {{ item.label }}
              <i class="el-icon-warning"></i>
            </span>
            <span>{{ item.header_bubble_text }}</span>
          </el-popover>
          <template v-else>{{ item.label }}</template>
        </template>
        <!-- col -->
        <template #default="scope">
          <!-- 父级指定模板 自定义 -->
          <template v-if="item.type === 'slot'">
            <slot
              :name="'col-' + item.value"
              :row="scope.row"
              :item="item"
              :$index="scope.$index"
            />
            <slot
              name="dy-query-col"
              :data="{ row: scope.row, item: item, $index: scope.$index }"
            />
          </template>
          <!-- pipe -->
          <span
            v-else-if="item.type === 'pipe'"
            :style="calcuRowColor(item.color)"
          >
            {{
              $options.filters[item.pipe](
                scope.row[item.value],
                item.pipeArg || '',
              )
            }}
          </span>
          <!-- popover-->
          <el-popover
            v-else-if="item.type === 'popover'"
            trigger="hover"
            placement="top"
          >
            <p class="text-c">{{ scope.row[item.value] }}</p>
            <span slot="reference" class="dy-table-popover">
              {{ scope.row[item.value] }}
            </span>
          </el-popover>
          <!-- image -->
          <el-image
            v-else-if="item.type === 'image' && scope.row[item.value]"
            fit="contain"
            style="width: 60px; height: 60px"
            :src="scope.row[item.value]"
            :preview-src-list="[scope.row[item.value]]"
          />
          <!-- tag -->
          <el-tag v-else-if="item.type === 'tag'">
            {{ scope.row[item.value] }}
          </el-tag>
          <!-- id2name  _id2name-->
          <!-- <yjp-id2name v-else-if="item.type === 'id2name'" :code="item.id2name_code" :value="scope.row[item.value]" :type="item.subtype" /> -->
          <span v-else-if="item.type === 'id2name'">
            <el-tag v-if="item.subtype === 'tag'">
              {{ scope.row[item.value + '_id2name'] }}
            </el-tag>
            <el-image
              v-else-if="
                item.subtype === 'image' && scope.row[item.value + '_id2name']
              "
              fit="contain"
              style="width: 60px; height: 60px"
              :src="scope.row[item.value + '_id2name']"
              :preview-src-list="[scope.row[item.value + '_id2name']]"
            />
            <template v-else>{{ scope.row[item.value + '_id2name'] }}</template>
          </span>
          <!-- time -->
          <span v-else-if="item.type === 'time'">
            {{ scope.row[item.value] | parseTime }}
          </span>
          <!-- boolean -->
          <span
            v-else-if="item.type === 'boolean'"
            :style="calcuRowColor(item.color)"
          >
            {{ scope.row[item.value] ? '是' : '否' }}
          </span>
          <!-- default -->
          <span v-else :style="calcuRowColor(item.color)">
            {{ scope.row[item.value] }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <template v-if="pager">
      <div
        v-show="!loading && data.length"
        class="text-c"
        style="margin-top: 20px"
      >
        <el-pagination
          class="flex"
          small
          :current-page.sync="pagination.current"
          :page-size="pagination.size"
          layout="total,prev, pager, next"
          :total="pagination.count"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { debounce, deepClone } from '@/utils/index'
import Sortable from 'sortablejs'
import async from 'async'
export default {
  name: 'st',
  props: {
    // 自定义类名
    className: {
      type: String,
      default: '',
    },
    // 表格字段配置
    columns: {
      type: Array,
      default: () => [],
    },
    // 列表数据
    data: {
      type: Array,
      default: () => [],
    },
    // 是否显示序号
    tabIndex: {
      type: Boolean,
      default: false,
    },
    // 是否有选择框
    checkBox: {
      type: Boolean,
      default: false,
    },
    //是否单选radio
    radioCheck: {
      type: Boolean,
      default: false,
    },
    // 操作栏配置
    handle: {
      type: Object,
      default: null,
    },
    /** *分页 */
    pager: {
      type: Boolean,
      default: false,
    },
    //格式化data
    formatData: {
      type: Function,
      default: (v) => v,
    },
    //行数据的 Key，用来优化 Table 的渲染；显示树形数据时，该属性是必填的。
    rowKey: {
      type: String,
      default: '',
    },
    // 是否支持拖拽
    draggable: {
      type: Boolean,
      default: false,
    },
    // 限制表格高度
    limitMaxHeight: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      TIMES: 0,
      radio: null,
      maxHeight: null,
    }
  },
  computed: {
    data_length() {
      return this.data.length
    },
  },
  created() {},
  mounted() {
    if (this.limitMaxHeight) {
      this.calculateMaxHeight()
      this.__resizeHandler = debounce(this.calculateMaxHeight, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }
  },
  beforeDestroy() {
    this.$emit('update:data', [])
    this.limitMaxHeight &&
      window.removeEventListener('resize', this.__resizeHandler)
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (this.draggable && newVal != oldVal) {
          this.$nextTick(() => {
            this.setSort()
          })
        }
        if (newVal) {
          //this.pagerConfig.loading = true
          const _data = this.formatData(this.data)
          this.batchId2nameForTableData(_data, this.columns, false, (data) => {
            this.afterUpdateTableData()
            //this.pagerConfig.loading = false
          })
          this.$refs.elTable && this.$refs.elTable.doLayout()
        }
      },
      immediate: true,
      deep: true,
    },
    draggable(value) {
      if (!value) {
        return this.sortable.destroy()
      }
      return value && this.data.length && this.setSort()
    },
  },
  methods: {
    calculateMaxHeight() {
      this.maxHeight =
        (document.body.clientHeight || document.documentElement.clientHeight) -
        80 -
        52 -
        50
      this.$nextTick(() => {
        this.$refs.elTable && this.$refs.elTable.doLayout()
      })
    },
    // 派发按钮点击事件
    handleClick(event, row, $index) {
      this.$emit('handleClick', event, row, $index)
    },
    // 跳转某一页
    handleCurrentChange(val) {
      this.$emit('changeCur', val)
    },
    // 为default-row添加色值
    calcuRowColor(colorType) {
      const colrMap = {
        success: '#67C23A',
        warning: '#E6A23C',
        danger: '#F56C6C',
        theme: '#FF4240',
      }
      return { color: colrMap[colorType] || 'inherit' }
    },
    // draggable
    setSort() {
      const el = this.$refs.elTable.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody',
      )[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: (evt) => {
          const targetRow = this.data.splice(evt.oldIndex, 1)[0]
          this.data.splice(evt.newIndex, 0, targetRow)
        },
      })
    },
    batchId2nameForTableData(tableData, columns, forExcel, cb) {
      const _tableData = forExcel ? deepClone(tableData) : tableData // 导出的 直接赋值
      const id2name_items = columns
        .map((item) => {
          if (item.type === 'id2name') {
            return {
              rowKey: item.value,
              id2name_code: item.id2name_code,
            }
          }
          return null
        })
        .filter(Boolean)
      const tasks = []
      id2name_items.forEach((obj) => {
        let { rowKey, id2name_code } = obj
        import('@/dictionary') //当前配置数据字典的目录，如需后端返回需更改
          .then((res) => {
            let options = res[id2name_code]
            if (options && Array.isArray(options)) {
              for (let rows of _tableData) {
                let row = rows[rowKey]
                if (Array.isArray(row)) {
                  let arr = row.filter((v) => {
                    let obj = options.find((o) => o.value == v)
                    return obj && obj.label
                  })
                  arr.length > 0 &&
                    this.$set(rows, rowKey + '_id2name', arr.join(','))
                } else {
                  let obj = options.find((o) => {
                    return o.value == row
                  })
                  obj && this.$set(rows, rowKey + '_id2name', obj.label)
                }
              }
            }
            cb(null)
          })
          .catch((err) => {
            cb(null)
          })
      })
      async.parallel(tasks, (err, result) => {
        cb(_tableData)
      })
    },
    afterUpdateTableData() {
      //hack  alreadyCheckedList
      this.draggable &&
        this.$nextTick(() => {
          this.setSort()
        })
    },
  },
}
</script>

<style lang="scss">
.page-table {
  margin-top: 20px;
}

.st__table .el-table__expanded-cell {
  padding: 10px 50px;
}

.dy-table-popover {
  display: block;
  margin: auto;
  width: 120px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dy-record__selected {
  font-size: 13px;
  line-height: 28px;
  color: #606266;
}

/deep/ .el-table--border,
/deep/ .el-table--border th,
/deep/ .el-table--border td {
  border-color: #ddd !important;
}
</style>
