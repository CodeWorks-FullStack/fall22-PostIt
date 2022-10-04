import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"

class PicturesService {
  async getPicturesByAlbumId(albumId) {
    const pictures = await dbContext.Pictures.find({ albumId }).populate('creator', 'name picture')
    return pictures
  }

  async addPictureToAlbum(pictureData) {

    // TODO sanity checks....

    // verify there is an album and the album is not archived
    const album = await albumsService.getAlbumById(pictureData.albumId)
    if (album.archived) {
      throw new BadRequest('This album has been archived.... You can no longer add pictures')
    }

    // verify user is a collaborator...
    const isMember = await dbContext.AlbumMembers
      .findOne({
        albumId: pictureData.albumId,
        accountId: pictureData.creatorId
      })
      .lean() // gives you a POJO

    if (!isMember) {
      throw new Forbidden('Stop collaborate and listen... to add a brand new addition')
    }

    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator', 'name picture')
    return picture
  }
}


export const picturesService = new PicturesService()
