<template>
  <router-link class="app-logo" to="/">
    <div class="app-logo-imgContainer">
      <img :src="require('@/assets/img/logo.png')" />
    </div>
    <div class="app-logo-titContainer">
      <div class="app-logo-title">{{ logoTitle }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Logo'
})
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { appStore } from '@/store/modules/app'

const logoTitle = computed(() => appStore.logoTitle)
</script>

<style lang="less" scoped>
.app-logo {
  display: flex;
  width: 100%;
  height: @topHeight;
  cursor: pointer;
  background-color: @menuTabBg;
  align-items: center;

  &-imgContainer {
    display: flex;
    justify-content: center;

    img {
      width: 35px;
      height: 35px;
    }
  }

  .app-logo-title {
    margin-left: 12px;
    font-size: 20px;
    font-weight: bold;
    color: @topLogoText;
    animation: showing 0.5s ease-in-out;
  }
}

@keyframes showing {
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: 12px;
  }
}
</style>
