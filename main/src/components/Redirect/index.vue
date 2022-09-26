<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Redirect',
  setup(_, { root }) {
    const { params, query } = root.$route
    const { path } = params
    root.$router.replace({ path: '/' + path, query }).catch((err: Error) => {
      console.warn(err)
    })

    return () => {}
  }
})
</script>
