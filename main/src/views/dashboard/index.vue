<template>
  <div class="dashboard page-container">
    <div class="dashboard-header">
      <img src="@/assets/img/logo.png" alt="" />
      <h4>起源微前端框架</h4>
      <span>开箱即用的微前端框架</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Dashboard'
}
</script>
<script setup lang="ts"></script>

<style lang="less" scoped>
.dashboard {
  &-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 120px;
      height: 120px;
      margin: 60px 0 30px;
    }
    h4 {
      font-size: 48px;
      font-weight: bold;
      line-height: 60px;
      margin: 0;
    }
    span{
      line-height: 60px;
      color: #999;
      font-weight: bold;
    }
  }
}
</style>
