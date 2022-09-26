<template>
  <div> {{ a }} </div>
</template>

<script lang="ts">
export default {
  name: 'Dashboard'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
const a = ref('111')
</script>

<style lang="less" scoped></style>
