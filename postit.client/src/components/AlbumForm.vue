<template>
  <form @submit.prevent="createAlbum()" class="modal-content">
    <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">New Album</h1>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="form-floating mb-3">
        <input v-model="editable.title" type="text" class="form-control" id="title" placeholder="Title" required>
        <label for="title">Title</label>
      </div>
      <div class="form-floating mb-3">
        <input v-model="editable.coverImg" type="text" class="form-control" id="coverImg" placeholder="Cover Image"
          required>
        <label for="coverImg">Cover Image</label>
      </div>
      <div class="form-floating">
        <select v-model="editable.category" class="form-select" id="category" aria-label="Category" required>
          <option value="animals">Animals</option>
          <option value="games">Games</option>
          <option value="books">Books</option>
          <option value="misc">Misc.</option>
        </select>
        <label for="floatingSelect">Choose a category</label>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>


<script>
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { albumsService } from '../services/AlbumsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createAlbum() {
        try {
          await albumsService.createAlbum(editable.value)
          Modal.getOrCreateInstance('#album-modal').hide()
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>