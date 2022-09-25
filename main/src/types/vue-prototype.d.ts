import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    // 全局mixin时，扩展vue的类型
    // 例： $splitNum: Function
  }
}
