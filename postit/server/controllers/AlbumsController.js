import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";

export class AlbumsController extends BaseController {

  constructor() {
    super('api/albums')
    this.router
      .get('', this.getAllAlbums)
      .get('/:id', this.getAlbumById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
      .delete('/:id', this.deleteAlbum)
  }


  async getAllAlbums(req, res, next) {
    try {
      const albums = await albumsService.getAllAlbums()
      res.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async getAlbumById(req, res, next) {
    try {
      const album = await albumsService.getAlbumById(req.params.id)
      res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async createAlbum(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id // FORCES THE USER TO BE THEMSELVES
      const album = await albumsService.createAlbum(req.body)
      res.send(album)
    } catch (error) {
      next(error)
    }
  }


  async deleteAlbum(req, res, next) {
    try {
      const album = await albumsService.deleteAlbum(req.params.id, req.userInfo)
      res.send(album)
    } catch (error) {
      next(error)
    }

  }



}
