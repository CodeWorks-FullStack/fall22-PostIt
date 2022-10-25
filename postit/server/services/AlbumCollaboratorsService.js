import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"

class AlbumCollaboratorsService {
  async getCollabsByAccountId(accountId) {
    const collaborators = await dbContext.AlbumMembers.find({ accountId }).populate({
      // NOTE Deep populate
      path: 'album',
      select: 'title coverImg',
      populate: [{
        path: 'albumMemberCount'
      }]
    })
    return collaborators
  }

  async getCollaboratorsByAlbumId(albumId) {
    const collaborators = await dbContext.AlbumMembers.find({ albumId }).populate('profile', 'name picture')
    return collaborators
  }

  async addCollaboratorToAlbum(albumId, accountId) {

    await albumsService.getAlbumIfNotArchived(albumId)


    const isCollaborator = await this.getCollaboratorForAlbum(albumId, accountId)

    if (isCollaborator) {
      return isCollaborator
    }

    const collaborator = await dbContext.AlbumMembers.create({ albumId, accountId })

    await collaborator.populate('profile', 'name picture')
    // await collaborator.populate('album', 'title coverImg')

    return collaborator
  }


  async getCollaboratorForAlbum(albumId, accountId) {
    const collaborator = await dbContext.AlbumMembers.findOne({ albumId, accountId })
      .populate('profile', 'name picture')
      .populate('album', 'title coverImg')

    return collaborator
  }

  //                        v what you have
  async removeCollaborator(collaboratorId, userId) {
    // what i need
    // albumId, creatorId, collaboratorId, userInfo

    const collaborator = await dbContext.AlbumMembers.findById(collaboratorId)

    if (!collaborator) {
      throw new BadRequest('Invalid collaborator Id')
    }

    // NOTE use .toString() when comparing an id from the db to an id from the client

    const album = await albumsService.getAlbumById(collaborator.albumId)
    // @ts-ignore
    const theLoggedInUserIsTheOwner = userId == album.creatorId.toString()
    // @ts-ignore
    const theLoggedInUserIsTheCollaborator = collaborator.accountId.toString() == userId

    // @ts-ignore
    // if (theLoggedInUserIsTheOwner && theLoggedInUserIsTheCollaborator) {
    //   throw new Forbidden('You cannot remove yourself from your own album you must archive it instead...')
    // }

    // @ts-ignore
    if (!theLoggedInUserIsTheCollaborator && !theLoggedInUserIsTheOwner) {
      throw new Forbidden("You cannot remove anyone but yourself...")
    }

    await collaborator.remove()
    return collaborator

  }




}


export const albumCollaboratorsService = new AlbumCollaboratorsService()
