<template>
  <el-tooltip effect="dark" content="前往首页" placement="bottom">
    <div class="HomeBack-svg" @click="toHome">
      <img src="@/assets/img/icon/home.png" alt="前往首页" />
    </div>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HomeBack'
})
</script>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const root = (getCurrentInstance() as any).proxy

function toHome() {
  root.$router.push('/')
}
</script>

<style lang="less" scoped>
.HomeBack-svg {
  padding: 0 5px;
  cursor: pointer;
  img {
    display: block;
    height: 14px;
    width: 14px;
  }
}
</style>
