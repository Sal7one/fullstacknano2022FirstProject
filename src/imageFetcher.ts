import { promises as fs } from 'fs'

async function imageFetcher(finalImageName: String): Promise<Buffer> {
  let imagePath = __dirname + '\\modified\\' + finalImageName;
  let imageBitmap = await fs.readFile(imagePath);
  return imageBitmap;
}

export default imageFetcher
