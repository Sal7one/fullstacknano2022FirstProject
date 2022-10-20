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
  const imagePath = path.join('assets', imageName + '.jpg');

  const height: number = parseInt(req.query.height as string);
  const width: number = parseInt(req.query.width as string);

  const outputImageName = req.query.outputImageName as string;

  resizeImage(imagePath, height, width, outputImageName)
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
  outputImageName: string
): Promise<void> {
  const outputDir = path.resolve(path.join(__dirname, 'modified'));
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  return new Promise<void>((resolve, reject) => {
    sharp(imagePath)
      .resize(height, width)
      .toFile(path.join(outputDir, outputImageName), (err, info) => {
        if (err) reject(err);
        resolve();
      });
  });
}

export { imageResizer, resizeImage };
