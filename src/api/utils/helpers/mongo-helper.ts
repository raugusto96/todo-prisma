import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient | null,
  uri: null as string | null,

  async connect(uri: string): Promise<void> {
    try {
      this.uri = uri
      this.client = await MongoClient.connect(uri)
    } catch (error) {
      console.error('Error connecting to MongoDB:', error)
      throw error
    }
  },
  async disconnect(): Promise<void> {
    try {
      if (this.client) {
        await this.client.close()
        this.client = null
      }
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error)
      throw error
    }
  },
  async getCollection(name: string): Promise<Collection> {
    try {
      if (!this.client) {
        await this.connect(this.uri!)
      }
      return this.client!.db().collection(name)
    } catch (error) {
      console.error('Error getting collection from MongoDB:', error)
      throw error
    }
  },

  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
