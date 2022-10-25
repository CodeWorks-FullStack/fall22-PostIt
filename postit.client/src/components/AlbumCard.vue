<template>
  <div class="album-card my-3 rounded-top p-0">
    <router-link :to="{name: 'Album', params: {id: album.id}}">
      <img class="rounded-top" :src="album.coverImg" :alt="album.title" :title="album.title">
    </router-link>
    <div class="rounded-bottom card-body text-center" :class="getRandomBg()">
      <h4 class="clip-text">{{album.title}}</h4>
      <div class="my-2 d-flex gap-2 align-items-center justify-content-center">
        <span>{{album.albumMemberCount}}</span>
        <i class="mdi mdi-heart"></i>
      </div>
    </div>
  </div>
</template>


<script>
import { Album } from '../models/Album.js';

export default {
  props: {
    album: { type: Album, required: true }
  },
  setup() {
    const bgs = [
      'bg-success',
      'bg-danger',
      'bg-warning',
      'bg-info',
      'bg-primary',
      'bg-secondary'
    ]
    return {
      getRandomBg() {
        return bgs[Math.floor(bgs.length * Math.random())]
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.album-card {
  width: 154px;

  img {
    height: 154px;
    width: 100%;
    object-fit: cover;
  }
}
</style>
