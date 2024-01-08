<template>
  <div class="common-layout">
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
@DefaultColor: #76bbd7;

.common-layout {
  display: flex;
  height: 100vh;
  flex: 1;
  flex-direction: column;
  background-color: var(--main-bg-color);

  .main {
    flex: 1
  }
}


</style>
