<template>
  <el-tooltip effect="dark" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
    <div class="screenfull-button" @click="click">
      <img src="@/assets/img/icon/fullScreen.png" alt="全屏" />
    </div>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Screenfull'
})
</script>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useFullscreen } from '_h/web/useFullscreen'
const { sf } = useFullscreen()
const root = (getCurrentInstance() as any).proxy

const isFullscreen = ref<boolean>(false)

function click() {
  if (!sf.isEnabled) {
    root.$message({
      message: 'you browser can not work',
      type: 'warning'
    })
    return false
  }
  sf.toggle()
}

function init() {
  if (sf.isEnabled) {
    sf.on('change', () => {
      isFullscreen.value = sf.isFullscreen
    })
  }
}

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
.screenfull {
  &-button {
    padding: 0 5px;
    font-size: 20px;
    cursor: pointer;
    img {
      display: block;
      height: 14px;
      width: 14px;
    }
  }
}
</style>
