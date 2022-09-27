<template>
  <div class="PageOneOne page-container">
    <div class="PageOneOne-left">
      <h4>页面1-1</h4>
      <span>演示：页面1的子页面。<br />该页面的路由属性noCache为1。因此页面保活。</span>
    </div>
    <div class="PageOneOne-right">
      <label for="inputValue">页面保活测试：</label>
      <input id="inputValue" v-model="inputValue" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MicoAppOnePageOneOne'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref('')
</script>

<style lang="less" scoped>
.PageOneOne {
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
