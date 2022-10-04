import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumCollaboratorsService } from "../services/AlbumCollaboratorsService.js";
import BaseController from "../utils/BaseController.js";


export class CollaboratorsController extends BaseController {

  constructor() {
    super('/api/collaborators')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addCollaboratorToAlbum)
      .delete('/:collaboratorId', this.removeCollaborator)
  }
  async addCollaboratorToAlbum(req, res, next) {
    try {
      const collaborator = await albumCollaboratorsService.addCollaboratorToAlbum(req.body.albumId, req.userInfo.id)
      res.send(collaborator)
    } catch (error) {
      next(error)
    }
  }

  async removeCollaborator(req, res, next) {
    try {
      const collaborator = await albumCollaboratorsService.removeCollaborator(req.params.collaboratorId, req.userInfo.id)
      res.send(collaborator)
    } catch (error) {
      next(error)
    }
  }






}
