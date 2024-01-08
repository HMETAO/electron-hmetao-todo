<template>
  <div class="home-container">
    <div>
      <LayoutAsideMenus/>
    </div>
    <div class="home-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.home-container {
  height: 100%;
  display: flex;

  .home-main {
    padding: 20px;
    flex: 1;
  }
}
</style>