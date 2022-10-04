<template>
  <div class="collab-card">
    <img :src="collab.profile.picture" :alt="collab.profile.name" :title="collab.profile.name">
  </div>
</template>


<script>
export default {
  props: {
    collab: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>
