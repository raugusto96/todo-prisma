import { ServerError } from '../errors'
import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const noContent = (): HttpResponse => ({
  statusCode: 200,
  body: null
})
