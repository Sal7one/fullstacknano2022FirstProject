import { promises as fs } from 'fs'

async function imageFetcher(finalImageName: String): Promise<Buffer> {
  let imageBitmap = await fs.readFile(
    __dirname + '\\modified\\' + finalImageName
  )
  return imageBitmap
}

export default imageFetcher
