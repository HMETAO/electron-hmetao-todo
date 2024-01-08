<template>
  <div class="app-container">
    <div class="navigation">
      <Navigation></Navigation>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">

import Navigation from "@/components/Navigation.vue";
</script>
<style scoped lang="less">

.app-container {
  display: flex;
  height: 100vh;
  flex: 1;
  flex-direction: column;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  .main {
    flex: auto;
    height: 0;
  }
}


</style>
