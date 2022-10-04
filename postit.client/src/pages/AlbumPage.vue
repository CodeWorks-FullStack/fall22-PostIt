<template>
  <div class="container-fluid album-page text-light" v-if="album">
    <div class="row">

      <div class="col-md-3">


        <AlbumCard :album="album" />


        <hr>
        <div>
          <CollabCard v-for="c in collaborators" :key="c.id" :collab="c" />
        </div>
      </div>
      <div class="col-md-9">
        <div class="bricks">
          <PictureCard v-for="p in pictures" :key="p.id" :picture="p" />
        </div>
      </div>

    </div>
  </div>
  <div v-else>
    🦆 ....
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';
import PictureCard from '../components/PictureCard.vue';
import CollabCard from '../components/CollabCard.vue';

export default {
  setup() {
    const route = useRoute();
    async function getAlbumById() {
      try {
        await albumsService.getAlbumById(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[GetAlbum]");
      }
    }
    async function getPicturesByAlbumId() {
      try {
        await albumsService.getPictures(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[GetPictures]");
      }
    }
    async function getCollaboratorsByAlbumId() {
      try {
        await albumsService.getCollaborators(route.params.id);
      }
      catch (error) {
        Pop.error(error, "[GetCollaborators]");
      }
    }
    onMounted(() => {
      getAlbumById();
      getPicturesByAlbumId();
      getCollaboratorsByAlbumId();
    });
    return {
      album: computed(() => AppState.activeAlbum),
      pictures: computed(() => AppState.pictures),
      collaborators: computed(() => AppState.collaborators),
    };
  },
  components: { PictureCard, CollabCard }
}
</script>


<style lang="scss">
.bricks {
  columns: 4;
  img.photo{
    width: 192px;
    margin-top: 1.5rem
  }
}
</style>
