<template>
  <div>
    {{ desc }}
    <el-button
      type="primary"
      size="small"
      @click="inputChange"
    >
      确认
    </el-button>
    <el-form>
      <el-row>
        <el-col :span="8">
          <el-form-item label="账号">
            <template slot="label">
              账号：
            </template>
            <el-input
              v-model="input"
              size="small"
              type="text"
              placeholder="请输入"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      desc: '组件',
      input: ''
    }
  },
  methods: {
    inputChange () {
      console.log('输入框', this.input)
    }
  }
}
</script>
