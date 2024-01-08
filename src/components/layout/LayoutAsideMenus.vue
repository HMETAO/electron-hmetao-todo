<template>
  <div class="layout-aside-menus">
    <el-menu
        class="layout-aside-menus-container"
        :collapse="isCollapse"
        default-active="1"
    >
      <el-menu-item index="1" @click="()=>isCollapse = !isCollapse">
        <el-icon>
          <icon-menu/>
        </el-icon>
        <template #title>缩放</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <setting/>
        </el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>

</template>
<script setup lang="ts">
import {
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import {ref} from "vue";

const isCollapse = ref<boolean>(true);
</script>
<style scoped lang="less">
.layout-aside-menus {
  height: 100%;

  .el-menu {
    height: 100%;
  }
}

.layout-aside-menus-container:not(.el-menu--collapse) {
  width: 200px;
}
</style>