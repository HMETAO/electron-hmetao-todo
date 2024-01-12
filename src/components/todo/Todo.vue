<template>
  <div class="todo-container">
    <div class="todo-list">
      <el-card shadow="never">
        <template #header>
          <span>2024-01-09</span>
        </template>
        <el-table :data="todoList" :show-header="false" style="width: 100%;">
          <el-table-column type="expand" align="center">
            <template #default="{ row }">
              <el-descriptions title="详细信息" column="1">
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
          <el-statistic :value="138">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                总任务完成
              </div>
            </template>
            <template #suffix>/100</template>
          </el-statistic>
        </el-col>
        <el-col :span="12">
          <el-progress type="circle" :percentage="20" status="success"/>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px;border-top: 1px solid var(--el-menu-border-color)">
        <el-col :span="24" class="todo-time">
          <p>番茄时钟</p>
          <p v-if="!timeSelect.isStart" class="todo-time-select">
            <el-time-select
                v-model="timeSelect.selectVal"
                placeholder="Start time"
                :start="timeSelect.startTime"
                step="00:15"
                end="24:00"
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
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {TodoType} from "@/type/todo";
import {Temporal} from "@js-temporal/polyfill";

const colors = ['#fc5c65', '#33d9b2', '#ff793f']
const todoList = ref<TodoType[]>([
  {
    id: 1,
    isComplete: false,
    title: '吃饭 睡觉 打豆豆',
    endTime: "2024-01-09"
  },
  {
    id: 2,
    isComplete: true,
    title: '爱玩',
    endTime: "2024-01-09"
  },
  {
    id: 3,
    isComplete: true,
    title: '爱谁',
    endTime: "2024-01-09"
  }
])

type TimeSelect = {
  isStart: boolean,
  selectVal?: string,
  timeValue?: number,
  startTime: string
}
const timeSelect = ref<TimeSelect>({
  isStart: false,
  startTime: Temporal.Now.plainTimeISO().toString({smallestUnit: "minute"})
});

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
</script>
<style scoped lang="less">

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
    border-left: 1px dashed var(--el-menu-border-color);
    padding: 0 10px;
    flex: 1;

    .el-col {
      display: flex;
      justify-content: center;
    }

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

</style>


