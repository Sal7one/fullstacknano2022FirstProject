import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import fileFetcher from './fileFetcher';

const imageRepoistory = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const query = req.query;
  const filename = query.filename;

  const height: number = parseInt(req.query.height as string);
  const width: number = parseInt(req.query.width as string);

  const modifiedImageName = `${filename}${width}${height}.jpg`;
  req.query.outputImageName = modifiedImageName;

  const modifiedImagesPath = path.resolve('modified');
  const modifiedImagePath = path.join(modifiedImagesPath, modifiedImageName);

  fs.stat(modifiedImagePath)
    .then(() => {
      // image already modified
      fileFetcher(modifiedImagePath).then((img) => {
        res.status(200).end(img);
      });
    })
    .catch(() => {
      // New image
      next();
    });
};
export default imageRepoistory;
