<template>
  <div class="container">
    <div class="row">
      <div class="col-8 my-3 m-auto">
        <div class="bg-info p-3 rounded ">
          <input type="text" class="form-control" placeholder="Search...." v-model="editable">
        </div>
        <div class="d-flex justify-content-around my-3">
          <button @click="getAlbumsByType('')" class="btn btn-outline-warning">All</button>
          <button @click="getAlbumsByType('animals')" class="btn btn-outline-warning">Animals</button>
          <button @click="getAlbumsByType('games')" class="btn btn-outline-warning">Games</button>
          <button @click="getAlbumsByType('books')" class="btn btn-outline-warning">Books</button>
          <button @click="getAlbumsByType('misc')" class="btn btn-outline-warning">Misc</button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center gap-4">
      <AlbumCard v-for="a in albums" :key="a.id" :album="a" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';
import AlbumCard from '../components/AlbumCard.vue';

export default {
  setup() {

    const editable = ref('')
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
      editable,
      albums: computed(() => AppState.albums.filter(a => a.title.toUpperCase().includes(editable.value.toUpperCase()))),
      async getAlbumsByType(type) {
        try {
          await albumsService.getAlbums(type)
        } catch (error) {
          Pop.error(error, '[GetAlbumsByType]')
        }
      }
    }
  },
  components: { AlbumCard }
}
</script>

<style scoped lang="scss">

</style>
