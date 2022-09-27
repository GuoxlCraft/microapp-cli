<template>
  <div class="MicoAppTwo-app">
    <keep-alive :include="['Layout']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<style lang="less">
.size {
  height: 100%;
  min-width: @minWidth;
}

html,
body {
  height: 100%;
  min-width: @minWidth;
  padding: 0;
  margin: 0;
}

.MicoAppTwo-app {
  .size;
}
</style>
