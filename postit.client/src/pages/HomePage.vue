<template>
  <div class="container">
    <div class="row justify-content-center gap-4">
      <AlbumCard v-for="a in albums" :key="a.id" :album="a" />
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';
import AlbumCard from '../components/AlbumCard.vue';

export default {
  setup() {
    async function getAlbums() {
      try {
        await albumsService.getAlbums();
      }
      catch (error) {
        Pop.error(error, "[getAlbums]");
      }
    }
    onMounted(() => {
      getAlbums();
    });
    return {
      albums: computed(() => AppState.albums)
    };
  },
  components: { AlbumCard }
}
</script>

<style scoped lang="scss">

</style>
