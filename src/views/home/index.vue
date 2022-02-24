<!--
 * @Author: your name
 * @Date: 2021-07-27 11:14:36
 * @LastEditTime: 2021-07-27 11:14:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m\src\views\home\index.vue
-->
<template>
  <div class="home">
    <div class="home-content">
      <img
        :src="imgSrc"
        alt="666"
      >
      <el-button
        type="primary"
        size="small"
        style="width:120px"
        @click="handleClick"
      >
        点击
      </el-button>
      <el-table
        :data="demo"
        stripe
        highlight-current-row
        size="small"
        border
        @row-dblclick="handleEdit"
      >
        <el-table-column
          label="姓名"
        >
          <template slot-scope="scope">
            <div v-if="!scope.row.flag">
              {{ scope.row.name }}
            </div>
            <el-input
              v-else
              v-model="scope['row']['name']"
              type="text"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="年龄"
        >
          <template slot-scope="scope">
            <div v-if="!scope.row.flag">
              {{ scope.row.age }}
            </div>
            <el-input
              v-else
              v-model="scope['row']['age']"
              type="text"
            />
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="操作"
        >
          <template slot-scope="scope">
            <div>
              <el-button
                v-if="!scope.row.flag"
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
            </div>
          </template>
        </el-table-column>
      </el-table>
      <my-table
        border
        stripe
        highlight-current-row
        :data-list="demo1"
        :column-list="columnList"
        @editChange="editChange"
      />
    </div>
  </div>
</template>
<script>
import png from './test.jpg'
import MyTable from './EditTable'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    MyTable
  },
  data () {
    return {
      imgSrc: png,
      demo: [
        {
          id: '123',
          name: '张三',
          age: '18',
          flag: false
        },
        {
          id: '124',
          name: '李思',
          age: '19',
          flag: false
        },
        {
          id: '12345',
          name: '王五',
          age: '21',
          flag: false
        }
      ],
      demo1: [
        {
          id: '123',
          name: '张三',
          age: '18',
          sex: '男'
        },
        {
          id: '124',
          name: '李思',
          age: '19',
          sex: '男'
        },
        {
          id: '12345',
          name: '王五',
          age: '21',
          sex: '男'
        }
      ],
      columnList: [
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '年龄',
          prop: 'age'
        },
        {
          label: '性别',
          prop: 'sex',
          editType: 'select',
          editList: [
            {
              label: '男',
              value: '男'
            },
            {
              label: '女',
              value: '女'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState(['demo/a'])
  },
  created () {
    this.handle()
  },
  methods: {
    ...mapMutations({
      update: 'demo/UPDATE_A'
    }),
    handle () {
      this.update(3)
      console.log('aaaa', this.a)
    },
    handleEdit (row) {
      const currentId = row.id
      if (!currentId) return
      this.demo = this.demo.map(item => {
        if (item.id === currentId) item.flag = !item.flag
        return item
      })
    },
    handleClick () {
      this.demo1.push({
        id: '1234578',
        name: '阿三',
        age: '211',
        sex: '男'
      })
    },
    async editChange () {
      console.log('修改了')
      await Promise.resolve(1)
      alert('修改成功')
    }
    // handleEdit (row) {
    //   const currentId = row.id
    //   if (!currentId) return
    //   this.demo = this.demo.map(item => {
    //     if (item.id === currentId) item.flag = !item.flag
    //     return item
    //   })
    // }
  }
}
</script>
<style lang="scss">
  .home {
    .home-content {
      display: flex;
      flex-direction: column;
      img {
        width: 100px;
      }
    }
  }
</style>
