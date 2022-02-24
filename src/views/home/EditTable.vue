<template>
  <el-table
    :data="editTableList"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- 字段 -->
    <el-table-column
      v-for="(item, index) in columnList"
      :key="index"
      :sortable="item.sortable"
      :label="item.label"
      :width="item.width"
      :align="item.align"
      :prop="item.prop"
      :min-width="item.minWidth"
      :class-name="item.className"
      :column-key="item.columnKey"
      :show-overflow-tooltip="item.tooltip"
      :filters="item.filters"
      :filter-multiple="item.filterMultiple"
    >
      <template slot-scope="scope">
        <div v-if="!scope.row.flag">
          <slot
            v-if="$scopedSlots[item.prop]"
            :name="item.prop"
            :row="scope.row"
          />
          <span v-else>
            {{
              item.formatFun && typeof item.formatFun === 'function' ? item.formatFun(scope.row) : scope.row[item.prop]
            }}
          </span>
        </div>
        <div v-else>
          <el-select
            v-if="item.editType === 'select'"
            v-model="scope.row[item.prop]"
            placeholder="请选择"
          >
            <el-option
              v-for="o in item.editList"
              :key="o.value"
              :label="o.label"
              :value="o.value"
            />
          </el-select>
          <el-input
            v-else
            v-model="scope.row[item.prop]"
            type="text"
          />
        </div>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column
      label="操作"
    >
      <template slot-scope="scope">
        <el-button
          v-if="!scope['row']['flag']"
          type="text"
          @click="handleEdit(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-else
          type="text"
          @click="handleEdit(scope.row)"
        >
          保存
        </el-button>
      </template>
    </el-table-column>
    <!-- <el-table-column
      v-if="operatorList.length"
      :label="operatorLabel"
    >
      <template slot-scope="scope">
        <div
          v-for="(item, index) in operatorList"
          :key="index"
          class="pr-10"
          style="display: inline-block;"
        >
          <slot
            v-if="item.actionSlot"
            :name="item.actionSlot"
            :row="scope.row"
          />
          <el-button
            v-else
            :size="item.size || 'medium'"
            :class="item.className"
            :type="item.btnType || 'text'"
            @click.stop="item.click(scope.row)"
          >
            {{ item.name }}
          </el-button>
        </div>
      </template>
    </el-table-column> -->
  </el-table>
</template>
<script>
export default {
  name: 'EditTable',
  props: {
    dataList: {
      type: Array,
      default: () => ([])
    },
    columnList: {
      type: Array,
      default: () => ([])
    },
    operatorList: {
      type: Array,
      default: () => ([])
    },
    operatorLabel: {
      type: String,
      default: '操作'
    }
  },
  data () {
    return {
      editTableList: []
    }
  },
  watch: {
    dataList: {
      handler (val) {
        this.init()
      }
    },
    deep: true,
    immediate: true
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.editTableList = this.dataList.map(item => {
        item.flag = false
        return { ...item }
      })
    },
    handleEdit (row) {
      const newTableList = JSON.parse(JSON.stringify(this.editTableList))
      const targetItemId = row.id
      const targetItem = newTableList.filter(item => item.id === targetItemId)[0] || {}
      targetItem.flag = !targetItem.flag
      // 保存操作才更新数据，编辑不更新
      if (!targetItem.flag) this.$emit('editChange', targetItem)
      this.editTableList = newTableList
    }
  }
}
</script>
