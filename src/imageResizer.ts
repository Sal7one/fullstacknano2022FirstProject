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
  const imagePath = path.join('src', 'assets', imageName + '.jpg');

  const height: number = parseInt(req.query.height as string);
  const width: number = parseInt(req.query.width as string);

  const modifiedImageDir = path.resolve(path.join(__dirname, 'modified'));
  if (!fs.existsSync(modifiedImageDir)) fs.mkdirSync(modifiedImageDir);

  const outputImageName = req.query.outputImageName as string;
  const outputImagePath = path.join(modifiedImageDir, outputImageName);

  resizeImage(imagePath, height, width, outputImagePath)
    .then(() => {
      next();
    })
    .catch((err) => {
      const jsonErorr = {
        success: false,
        message: 'Error resizing image',
        details: `${err}`
      };
      res.status(400).json(jsonErorr);
    });
};

async function resizeImage(
  imagePath: string,
  width: number,
  height: number,
  outputImagePath: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    sharp(imagePath)
      .resize(height, width)
      .toFile(outputImagePath, (err, info) => {
        if (err) reject(err);
        resolve();
      });
  });
}

export { imageResizer, resizeImage };
