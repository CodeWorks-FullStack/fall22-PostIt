export class Album {
  constructor (data) {
    this.id = data.id
    this.title = data.title
    this.coverImg = data.coverImg
    this.category = data.category
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.archived = data.archived
    this.albumMemberCount = data.albumMemberCount
  }
}
