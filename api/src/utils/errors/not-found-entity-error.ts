export class NotFoundEntityError extends Error {
  constructor(entityName: string) {
    super(`NotFoundEntity: ${entityName}`)
    this.name = 'NotFoundEntity'
  }
}
