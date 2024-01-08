<template>
  <div class="navigation-container">
    <div class="navigation-box">
      <div style="flex-grow: 1;-webkit-app-region: drag;"></div>
      <div>
        <el-button-group size="small">
          <el-button icon="Minus" color="rgba(0, 0, 0, 0)" @click="clickMinimizeEventFunction"></el-button>
          <el-button icon="Close" color="rgba(0, 0, 0, 0)" @click="clickCloseEventFunction"></el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {NAVIGATION_CLOSE, NAVIGATION_MINIMIZE} from "../../electron/constants/channelConstant";

// 点击关闭nav事件回调
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
  height: 24px;
  width: 100%;
  align-items: center;

  .navigation-box {
    flex: 1;
    display: flex;
  }
}
</style>