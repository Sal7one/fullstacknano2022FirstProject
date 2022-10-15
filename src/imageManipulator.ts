import express from 'express'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const imageManipulator = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  if (req.query.manipulateImage == 'false') next()

  // User Query
  let userQuery = req.query

  // User Data
  let filename = userQuery.filename
  let widthParam: string = req.query.width as string
  let heightParam: string = req.query.height as string

  // Use the data
  let width: number = parseInt(widthParam)
  let height: number = parseInt(heightParam)

  // Image name in the file system
  let imageURL = 'src\\images\\' + filename + '.jpg'

  // image name after we finish
  let imageFileName = req.query.finalImageName as string

  const dir = path.resolve(path.join(__dirname, 'modified'))
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)

  sharp(imageURL)
    .resize(width, height)
    .toFile(dir + '\\' + imageFileName, (err, info) => {
      next()
    })
}

export default imageManipulator
