<template>
  <div class="todo-container">
    <div class="todo-list">
      <el-card shadow="never" v-for="item in todoList.data " :key="item">
        <template #header>
          <span>{{ item.date }}</span>
        </template>
        <el-table :data="item.list" :show-header="false" style="width: 100%;">
          <el-table-column type="expand" align="center">
            <template #default="{ row }">
              <el-descriptions title="详细信息" :column="1">
                <el-descriptions-item label="Title">{{ row.title }}</el-descriptions-item>
                <el-descriptions-item label="Description">{{ row.description }}</el-descriptions-item>
                <el-descriptions-item label="EndTime">
                  {{ row.endTime }}
                </el-descriptions-item>
              </el-descriptions>
            </template>
          </el-table-column>
          <el-table-column width="40" prop="isComplete" align="center">
            <template #default="{ row }">
              <el-checkbox v-model="row.isComplete"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="title" align="center">
            <template #default="{ row }">
              <el-text :style="{color:colors[row.id % 3],'font-weight':500}" :tag="row.isComplete? 'del':'span'">
                {{ row.title }}
              </el-text>
            </template>
          </el-table-column>
          <el-table-column prop="endTime" align="center">
            <template #default="{ row }">
              <el-text :style="{color:colors[row.id % 3],'font-weight':500}">{{ row.endTime }}</el-text>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="todo-right">
      <el-row>
        <el-col :span="12" style="display: flex;align-items: center">
          <el-statistic :value="todoList.complete">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                总任务完成
              </div>
            </template>
            <template #suffix>/ {{ todoList.total }}</template>
          </el-statistic>
        </el-col>
        <el-col :span="12">
          <el-progress type="dashboard" :percentage="progressComputed" :color="progressColors"/>
        </el-col>
      </el-row>
      <el-row class="todo-time-box">
        <el-col :span="24" class="todo-time">
          <p>番茄时钟</p>
          <p v-if="!timeSelect.isStart" class="todo-time-select">
            <el-time-select
                v-model="timeSelect.selectVal"
                placeholder="Start time"
                :start='Temporal.Now.plainTimeISO().toString({smallestUnit: "minute"})'
                step="00:15"
                end="23:59"
            />
            <el-button type="success" @click="timeClickEventFunction" text bg>确定</el-button>
          </p>
          <p v-else>
            <el-countdown
                @finish="finishEventFunction"
                title="Time remaining"
                format="HH:mm:ss"
                :value="timeSelect.timeValue"
            />
            <el-button text bg type="warning" style="margin-top: 10px" @click="endEarlyClickEventFunction">提前结束
            </el-button>
          </p>
        </el-col>
      </el-row>
      <el-row style="flex: 1;">
        <el-col :span="24" class="insert-box">
          <el-form>
            <el-form-item label="任务名称">
              <el-input placeholder="请输入任务名称"></el-input>
            </el-form-item>
            <el-form-item label="任务描述">
              <el-input type="textarea" placeholder="请输入任务描述"></el-input>
            </el-form-item>
            <el-form-item label="任务时间">
              <el-time-picker
                  v-model="timeSelect.selectVal"
                  placeholder="选择时间"
                  :start='Temporal.Now.plainTimeISO().toString({smallestUnit: "minute"})'
                  :end="timeSelect.selectVal"
                  :disabled="timeSelect.isStart"
                  :editable="false"
              >
              </el-time-picker>
            </el-form-item>
            <el-form-item label="任务开始">
              <el-button type="success" bg text>开始</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {Todo} from "@/type/todo";
import {Temporal} from "@js-temporal/polyfill";
import {GET_TODO} from "@/constant/channel";

const colors = ['#fc5c65', '#33d9b2', '#ff793f']

const progressColors = [
  {color: '#f56c6c', percentage: 20},
  {color: '#e6a23c', percentage: 40},
  {color: '#5cb87a', percentage: 60},
  {color: '#1989fa', percentage: 80},
  {color: '#6f7ad3', percentage: 100},
]

const todoList = ref<{ total: number, complete: number, data?: Todo[] }>({total: 1, complete: 0})

type TimeSelect = {
  isStart: boolean,
  selectVal?: string,
  timeValue?: number,
}

const timeSelect = ref<TimeSelect>({
  isStart: false,
});

const progressComputed = computed(() => {
  return (todoList.value.complete) / (todoList.value.total) * 100;
})

// 点击确定时间事件回调
const timeClickEventFunction = () => {
  timeSelect.value.isStart = true
  timeSelect.value.timeValue = Date.now() +
      Temporal.Now.plainTimeISO().until(Temporal.PlainTime.from(timeSelect.value.selectVal as string)).total({unit: "milliseconds"})
}

// 倒计时结束事件回调
const finishEventFunction = () => {
  new window.Notification("时间到啦！！！", {body: `到达预定时间${timeSelect.value.selectVal}`})
  timeSelect.value.isStart = false
}

// 点击提前结束事件回调
const endEarlyClickEventFunction = () => {
  timeSelect.value.isStart = false
}

onMounted(async () => {
  todoList.value = await window.ipcRenderer.invoke(GET_TODO)
})

</script>
<style scoped lang="less">
.el-row:nth-child(n + 2) {
  margin-top: 10px;
  border-top: 1px solid var(--el-menu-border-color)
}

.todo-container {
  height: 100%;
  display: flex;
  justify-content: center;

  .el-card {
    --el-card-bg-color: var(--main-bg-card-color);
  }

  .todo-list {
    flex: 1;
    overflow-y: auto;
  }

  .todo-right {
    display: flex;
    border-left: 1px dashed var(--el-menu-border-color);
    padding: 0 10px;
    flex: 1;
    flex-direction: column;
    .el-col {
      display: flex;
      justify-content: center;
    }

    .insert-box {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex: 1;
    }

    .todo-time-box {
      height: 130px;
      display: flex;
      align-items: center;

      .todo-time {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
          margin-top: 10px;
        }

        .todo-time-select {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}

</style>


