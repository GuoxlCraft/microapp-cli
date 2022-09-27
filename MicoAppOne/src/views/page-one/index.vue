<template>
  <div class="PageOne page-container">
    <div class="PageOne-left">
      <h4>页面1</h4>
      <span>演示：子应用1的第一个页面。<br />该页面的路由属性noCache为1。因此页面保活。<br />并提供该页面的子页面Page-one-one的跳转按钮。</span>
      <div class="PageOne-left-button" @click="JumpToPage('page-one-one')">跳转到页面1-1</div>
    </div>
    <div class="PageOne-right">
      <label for="inputValue">页面保活测试：</label>
      <input id="inputValue" v-model="inputValue" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MicoAppOnePageOne'
}
</script>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const root: IObj = (getCurrentInstance() as any).proxy
const inputValue = ref('')
function JumpToPage(url) {
  root.$router.push(url)
}
</script>

<style lang="less" scoped>
.PageOne {
  padding: 60px;
  display: flex;
  flex-direction: row;
  &-left {
    flex: 0 0 50%;
    padding: 60px;
    flex-direction: column;
    border-right: 1px solid #f0f0f0;
    h4 {
      font-size: 36px;
      font-weight: bold;
      line-height: 40px;
      margin: 0;
      text-align: right;
    }
    span {
      display: block;
      width: 400px;
      margin: 20px 0;
      margin-left: auto;
      text-align: right;
    }

    &-button {
      margin-left: auto;
      margin-top: 20px;
      width: fit-content;
      padding: 10px;
      line-height: 20px;
      border-radius: 8px;
      color: #999;
      border: 1px solid #999;
      cursor: pointer;
      &:hover {
        color: #666;
        background: #fafafa;
      }
    }
  }
  &-right {
    flex: 0 0 50%;
    padding: 60px;
    flex-direction: column;
    label {
      display: block;
    }
    input {
      margin-top: 20px;
      display: block;
    }
  }
}
</style>
