import { promises as fs } from 'fs';
import path from 'path';

async function fileFetcher(fileName: string): Promise<Buffer> {
  const filePath = path.join(__dirname, 'modified', fileName);
  const bitmap = await fs.readFile(filePath);
  return bitmap;
}

export default fileFetcher;
