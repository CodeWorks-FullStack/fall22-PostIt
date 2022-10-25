import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { albumCollaboratorsService } from '../services/AlbumCollaboratorsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor () {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/collaborators', this.getMyCollabAlbums)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }


  async getMyCollabAlbums(req, res, next) {
    try {
      const collabs = await albumCollaboratorsService.getCollabsByAccountId(req.userInfo.id)
      res.send(collabs)
    } catch (error) {
      next(error)
    }

  }





}
