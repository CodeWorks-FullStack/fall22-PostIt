import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import { picturesService } from "../services/PicturesService.js";
import BaseController from "../utils/BaseController.js";

export class PicturesController extends BaseController {

  constructor() {
    super('api/pictures')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.addPictureToAlbum)
  }

  async addPictureToAlbum(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id // BE YO SELF
      const picture = await picturesService.addPictureToAlbum(req.body)
      res.send(picture)
    } catch (error) {
      next(error)
    }

  }

}
