<template>
  <div class="TopBar">
    <logo v-if="showLogo" />
    <div class="TopBar-toolBar">
      <screenfull />
      <HomeBack />
    </div>
    <div class="TopBar-userBar">
      <div class="TopBar-userBar-icon">
        <img src="@/assets/img/avatar.png" alt="用户头像" />
      </div>
      <div class="TopBar-userBar-text">{{ userName }}</div>
      <div class="TopBar-userBar-button el-icon-switch-button" @click="logout"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TopBar'
})
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { appStore } from '@/store/modules/app'
import Screenfull from '../Screenfull/index.vue'
import HomeBack from '../HomeBack/index.vue'
import { permissionStore } from '@/store/modules/permission'
import Logo from '../Logo/index.vue'
import { useCache } from '_h/web/useCache'

const { wsCache } = useCache()
const userName = ref<String>('用户')
userName.value = wsCache.get(appStore.userInfo)?.user?.name || '用户'

const showLogo = computed(() => appStore.showLogo)
function logout() {
  permissionStore.logout()
}
</script>

<style lang="less" scoped>
.TopBar {
  display: flex;
  padding: 0 23px;
  justify-content: flex-start;
  align-items: center;
  height: @topHeight;
  background-color: @menuTabBg;
  box-sizing: border-box;
  z-index: 2;
  position: relative;
  box-shadow: 2px 0px 8px 0px rgba(115, 117, 136, 0.15);
  &-toolBar {
    color: #818a91;
    cursor: pointer;
    transition: background 0.2s;
    margin-left: auto;
    border-right: 1px solid #e7edf1;
    padding-right: 10px;
    display: flex;
  }
  &-userBar {
    display: flex;
    align-items: center;
    padding-left: 10px;
    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #f5f7fa;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-text {
      white-space: nowrap;
      margin-left: 10px;
      font-size: 14px;
      color: #818a91;
    }
    &-button {
      margin-left: 10px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #f5f7fa;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: background 0.2s;
      &:hover {
        background-color: #e7edf1;
      }
    }
  }
}
</style>
