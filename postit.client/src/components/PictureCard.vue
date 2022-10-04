<template>
  <div class="picture-card">
    <img :src="picture.imgUrl" alt="some picture" class="photo">
    <div class="text-end on-hover">
      <img :src="picture.creator.picture" alt="" height="30" :title="picture.creator.name">
    </div>
  </div>
</template>


<script>
export default {
  props: {
    picture: {
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
  .picture-card{
    position: relative;
  }
  .text-end{
    position: absolute;
    top: 1rem;
    left: 0;
  }
</style>
