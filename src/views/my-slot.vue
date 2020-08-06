<template>
  <div
    class="item-wrap"
  >
    <div
      v-for="(config, index) in todos"
      :key="index"
      class="inner"
    >
      <el-form-item
        v-if="config.field"
        :prop="config.field"
      >
        <template slot="label">
          {{ config.fieldName }}
          <el-popover
            v-if="config.remark"
            placement="top-start"
            title="标题："
            width="160"
            trigger="hover"
          >
            <div v-html="config.remark" />
            <el-button slot="reference">
              提示
            </el-button>
          </el-popover>
          ：
        </template>
      </el-form-item>
      <slot
        v-if="config.field === 'themeTypeId' && false"
        name="themeTypeIdGov"
      >
        1231313131312312
        <el-input
          v-model="formData[config.field]"
          :disabled="true"
          type="text"
          @input="handleInput"
        />
      </slot>
      <!-- 输入框 -->
      <el-input
        v-if="config.formType === 'elInput'"
        v-model="formData[config.field]"
        type="text"
        @input="handleInput"
      />
      <!-- 联动 -->
      <el-cascader
        v-else-if="config.formType === 'cascader'"
        :options="showRootSections"
        :show-all-levels="false"
      />
      <!-- 开关 -->
      <el-switch
        v-else-if="config.formType === 'switch'"
        v-model="formData[config.field]"
      />
      <slot
        v-if="config.field === 'themeTypeId' && false"
        name="themeTypeIdisGov"
      >
        <el-input type="number" />
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MySlot',
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    todos: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      showRootSections: []
    }
  },
  mounted () {
    console.log('$xss-----', this.$xss)
  },
  methods: {
    handleInput (val) {
      console.log(val, this.formData)
    }
  }
}
</script>
