<template>
  <div class="dashboard page-container">
    <div class="dashboard-header">
      <img src="@/assets/img/logoBig.png" alt="" />
      <h4>起源微前端框架</h4>
      <span>开箱即用的微前端框架</span>
      <div class="button" @click="openDocswweb()">前往使用文档</div>
    </div>
    <div class="dashboard-body">
      <div class="dashboard-good">
        <div class="dashboard-good-item">
          <div class="dashboard-good-item-icon red">
            <svg-icon icon-class="kxjy" />
          </div>
          <span>开箱即用</span>
        </div>
        <div class="dashboard-good-item">
          <div class="dashboard-good-item-icon blue">
            <svg-icon icon-class="jcws" />
          </div>
          <span>集成完善</span>
        </div>
        <div class="dashboard-good-item">
          <div class="dashboard-good-item-icon green">
            <svg-icon icon-class="kxbh" />
          </div>
          <span>可选保活</span>
        </div>
        <div class="dashboard-good-item">
          <div class="dashboard-good-item-icon yellow">
            <svg-icon icon-class="syxq" />
          </div>
          <span>适用性强</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Dashboard'
}
</script>
<script setup lang="ts">
function openDocswweb() {
  window.open('https://guoxlcraft.github.io/microapp-cli-doc/')
}
</script>

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
    span {
      line-height: 60px;
      color: #999;
      font-weight: bold;
    }
    .button {
      line-height: 30px;
      width: 130px;
      text-align: center;
      color: #666;
      border: 1px solid #999;
      border-radius: 8px;
      cursor: pointer;
      background: #f0f0f0;
      box-shadow: 0px 5px 15px rgba(136, 142, 184, 0.3);
      transition: all ease 0.5s;
      &:hover {
        background: #fff;
        color: #333;
        transform: translateY(-5px);
        box-shadow: 0px 10px 15px rgba(136, 142, 184, 0.3);
      }
    }
  }

  &-good {
    margin: 60px 30%;
    width: 40%;
    display: flex;
    height: 80px;
    &-item {
      flex: 0 0 25%;
      display: flex;
      align-items: center;
      flex-direction: column;
      &-icon {
        padding: 24px;
        color: #fff;
        background: #999;
        border-radius: 10px;
        font-size: 24px;
        &.red {
          background: #ff7268;
        }
        &.yellow {
          background: #bb9d19;
        }
        &.blue {
          background: #687bff;
        }
        &.green {
          background: #2fc05b;
        }
      }
      span {
        line-height: 40px;
      }
    }
  }
}
</style>
