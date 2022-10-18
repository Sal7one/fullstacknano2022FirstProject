import express from 'express';
import imageFetcher from './imageFetcher';
import { promises as fs } from 'fs';
import path from 'path';

const imageHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {

  const query = req.query;
  const filename = query.filename;

  const height: number = parseInt(req.query.height as string);
  const width: number = parseInt(req.query.width as string);

  const finalImageName = `${filename}${width}${height}.jpg`;
  req.query.outputImageName = finalImageName;

  let modifiedImagesPath = path.resolve("modified");
  const modifiedImagePath = `${modifiedImagesPath}\\${finalImageName}`;

  fs.stat(modifiedImagePath)
    .then(() => {
      // Image already modified -> Return it
      imageFetcher(modifiedImagePath).then((img) => {
        res.status(200).end(img);
      });
    })
    .catch(() => {
      next();
    });
};

export default imageHandler;
