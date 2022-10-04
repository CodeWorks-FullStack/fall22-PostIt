<template>
  <div class="container-fluid album-page text-light" v-if="album">

    <div class="row">

      <div class="col-md-4">

        <AlbumCard :album="album" />

        <div class="d-flex flex-wrap" v-if="!album.archived">
          <div class="text-start btn btn-info no-select">
            <div class="my-2">
              {{collaborators.length}}
            </div>
            <h4>Collaborators</h4>
          </div>
          <button class="btn btn-danger text-white" @click="removeCollaborator()" v-if="isCollaborator">
            <i class="mdi mdi-heart fs-4"></i>
            <h4>Un-Collab</h4>
          </button>
          <button class="btn btn-success text-white" @click="addCollaborator()" v-else>
            <i class="mdi mdi-heart fs-4"></i>
            <h4>Collab</h4>
          </button>

        </div>
        <div v-else>
          <div class="bg-warning p-3">
            <i class="mdi mdi-alert"></i>
            This album has been archived
          </div>
        </div>

        <div class="mt-3">
          <div class="bricks">
            <CollabCard v-for="c in collaborators" :key="c.id" :collab="c" />
          </div>
        </div>
      </div>
      <div class="col-md-8">
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
import { AuthService } from '../services/AuthService.js';

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
      account: computed(() => AppState.account),
      album: computed(() => AppState.activeAlbum),
      pictures: computed(() => AppState.pictures),
      collaborators: computed(() => AppState.collaborators),
      isCollaborator: computed(() => AppState.collaborators.find(c => c.accountId == AppState.account.id)),
      async addCollaborator() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect()
          }

          await albumsService.addCollaborator({
            albumId: AppState.activeAlbum.id || route.params.id
          })
          Pop.success('SAWEEEET thanks for joining ma album')
        } catch (error) {
          Pop.error(error, '[AddCollaborator]')
        }
      },
      async removeCollaborator() {
        try {
          const yes = await Pop.confirm('Are you sure you want to leave this album?')
          if (!yes) { return }
          const collaborator = AppState.collaborators.find(c => c.accountId == AppState.account.id && c.albumId == AppState.activeAlbum.id)
          await albumsService.removeCollaborator(collaborator.id)
          Pop.success('Fine Leave.....')
        } catch (error) {
          Pop.error(error, '[removeCollaborator]')
        }
      }
    };
  },
  components: { PictureCard, CollabCard }
}
</script>


<style lang="scss">
.bricks {
  columns: 4;

  img.photo {
    width: 192px;
    margin-top: 1.5rem
  }
}

.no-select {
  cursor: default !important;
}
</style>
