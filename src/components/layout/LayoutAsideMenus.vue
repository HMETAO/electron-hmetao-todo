<template>
  <div class="layout-aside-menus">
    <el-menu
        class="layout-aside-menus-container"
        :collapse="isCollapse"
        default-active="/todo"
        router
    >
      <el-menu-item @click="()=>isCollapse = !isCollapse">
        <el-icon>
          <icon-menu/>
        </el-icon>
        <template #title>Collapse</template>
      </el-menu-item>
      <el-menu-item index="/todo">
        <el-icon>
          <EditPen/>
        </el-icon>
        <template #title>Todo</template>
      </el-menu-item>
    </el-menu>
  </div>

</template>
<script setup lang="ts">
import {
  Menu as IconMenu,
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