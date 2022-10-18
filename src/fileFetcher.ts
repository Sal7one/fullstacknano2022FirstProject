import { promises as fs } from 'fs';

async function fileFetcher(fileName: string): Promise<Buffer> {
  const bitmap = await fs.readFile(__dirname + '\\modified\\' + fileName);
  return bitmap;
}

export default fileFetcher;
