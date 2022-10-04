import { AppState } from "../AppState.js"
import { Album } from "../models/Album.js"
import { router } from "../router.js"
import { api } from "./AxiosService.js"

class AlbumsService {

  async getAlbums() {
    const res = await api.get('/api/albums')
    AppState.albums = res.data.map(eh => new Album(eh))
  }

  // TODO get my albums.....

  async getAlbumById(id) {
    const res = await api.get(`/api/albums/${id}`)
    AppState.activeAlbum = new Album(res.data)
  }


  async createAlbum(albumData) {
    const res = await api.post('/api/albums', albumData)
    const album = new Album(res.data)
    AppState.albums = [...AppState.albums, album]
    AppState.activeAlbum = album

    // LETS BE FANCY send me to the newly created album detail page....
    router.push({ name: 'Album', params: { id: album.id } })
  }


  async archiveAlbum(id) {
    await api.delete(`/api/albums/${id}`)
    AppState.albums = AppState.albums.filter(eh => eh.id != id)
    AppState.activeAlbum = null

    router.push({ name: 'Home' })
  }

  async getPictures(albumId) {
    const res = await api.get(`/api/albums/${albumId}/pictures`)
    AppState.pictures = res.data
  }

  async getCollaborators(albumId) {
    const res = await api.get(`/api/albums/${albumId}/collaborators`)
    AppState.collaborators = res.data
  }


  async addCollaborator(albumData) {
    const res = await api.post('api/collaborators', albumData)
    const collaborator = res.data

    AppState.collaborators.push(collaborator)
    // AppState.collaborators = [...AppState.collaborators, collaborator]
  }

  async removeCollaborator(collaboratorId) {
    await api.delete('api/collaborators/' + collaboratorId)
    AppState.collaborators = AppState.collaborators.filter(c => c.id != collaboratorId)
  }

}

export const albumsService = new AlbumsService()
