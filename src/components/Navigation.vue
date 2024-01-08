<template>
  <div class="navigation-container">
    <div class="navigation-box">
      <div style="flex-grow: 1;-webkit-app-region: drag;"></div>
      <div>
        <el-button-group >
          <el-button icon="Minus" color="rgba(0, 0, 0, 0)" @click="clickMinimizeEventFunction"></el-button>
          <el-button icon="Close" color="rgba(0, 0, 0, 0)" @click="clickCloseEventFunction"></el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

// 点击关闭nav事件回调
import {NAVIGATION_CLOSE, NAVIGATION_MINIMIZE} from "@/constant/channel";

const clickCloseEventFunction = () => {
  window.ipcRenderer.invoke(NAVIGATION_CLOSE)
}

// 点击最小化nav事件回调
const clickMinimizeEventFunction = () => {
  window.ipcRenderer.invoke(NAVIGATION_MINIMIZE)
}

</script>

<style scoped lang="less">
.navigation-container {
  display: flex;
  height: 32px;
  width: 100%;
  align-items: center;
border-bottom: 1px solid var(--el-menu-border-color);
  .navigation-box {
    flex: 1;
    display: flex;
  }
}
</style>