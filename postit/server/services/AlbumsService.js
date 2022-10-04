import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { albumCollaboratorsService } from "./AlbumCollaboratorsService.js"

class AlbumsService {
  async archiveAlbum(id, userInfo) {
    const album = await this.getAlbumById(id)

    // @ts-ignore
    if (album.creatorId.toString() != userInfo.id) {
      throw new Forbidden('No Swipping 🦊 albums that are not yours')
    }
    // soft delete
    album.archived = true
    await album.save()
    return album
  }
  async getAlbumById(id) {
    const album = await dbContext.Albums.findById(id).populate('creator', 'name picture')

    // handle bad id
    if (!album) {
      throw new BadRequest('Invalid or Bad Album Id')
    }

    return album
  }
  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator', 'name picture')
    await albumCollaboratorsService.addCollaboratorToAlbum(album.id, albumData.creatorId)
    return album
  }

  async getAllAlbums() {
    const albums = await dbContext.Albums.find({ archived: false }).populate('creator', 'name picture')
    return albums
  }


  async getAlbumIfNotArchived(albumId) {
    const album = await this.getAlbumById(albumId)
    if (album.archived) {
      throw new BadRequest('The album is archived')
    }
    return album
  }

}


export const albumsService = new AlbumsService()
