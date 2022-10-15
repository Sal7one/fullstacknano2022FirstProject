import express from 'express'
import { promises as fs } from 'fs'

const imageHandler = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  // User Query
  let userQuery = req.query

  // User Data
  let filename = userQuery.filename
  let widthParam: string = req.query.width as string
  let heightParam: string = req.query.height as string

  // Use the data
  let width: number = parseInt(widthParam)
  let height: number = parseInt(heightParam)
  let finalImageName = `${filename}${width}${height}.jpg`

  req.query.finalImageName = finalImageName

  console.log('checking in ' + __dirname)
  fs.stat(__dirname + '\\modified\\' + finalImageName)
    .then(() => {
      console.log('We Manupliated this image before')
      req.query.manipulateImage = 'false'
      next()
    })
    .catch(() => {
      next()
    })
}

export default imageHandler
