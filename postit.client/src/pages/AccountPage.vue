<template>
  <div class="about text-center text-light">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>

    <div>

      <div class="d-flex flex-wrap gap-5 p-5 align-items-center justify-content-center">
        <AlbumCard v-for="c in myCollaborations" :key="c.id" :album="c.album" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import Pop from '../utils/Pop.js'
import AlbumCard from '../components/AlbumCard.vue'
export default {
  setup() {
    async function getMyCollabs() {
      try {
        await accountService.getMyCollabs();
      }
      catch (error) {
        Pop.error(error, "[GetMyCollabs]");
      }
    }
    onMounted(() => {
      getMyCollabs();
    });
    return {
      account: computed(() => AppState.account),
      myCollaborations: computed(() => AppState.myCollaborations)
    };
  },
  components: { AlbumCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
