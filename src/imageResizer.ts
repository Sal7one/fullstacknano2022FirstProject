import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const imageResizer = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const query = req.query;
  const imageName = query.filename;
  const imagePath = 'src\\assets\\' + imageName + '.jpg';

  const height: number = parseInt(req.query.height as string);
  const width: number = parseInt(req.query.width as string);

  const modifiedImageDir = path.resolve(path.join(__dirname, 'modified'));
  if (!fs.existsSync(modifiedImageDir)) fs.mkdirSync(modifiedImageDir);

  const outputImageName = req.query.outputImageName as string;
  const outputImagePath = `${modifiedImageDir}\\${outputImageName}`;
  sharp(imagePath)
    .resize(width, height)
    .toFile(outputImagePath, (err, info) => {
      if (err) throw Error('Could not modify image: ' + err);
      next();
    });
};

export default imageResizer;
