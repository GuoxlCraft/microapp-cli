<template>
  <div class="Redirect"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Redirect'
})
</script>
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const root = getCurrentInstance()?.proxy as any
const { params, query } = root.$route
const { path } = params
root.$router.replace({ path: '/' + path, query }).catch((err: Error) => {
  console.warn(err)
})
</script>
