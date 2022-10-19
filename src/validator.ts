import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const queryValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const query = req.query;
  const height: number = parseInt(req.query.height as string);
  const width: number = parseInt(req.query.width as string);
  const jsonErorr = { success: false, message: '' };

  if (query.filename != undefined) {
    const folderPath = path.resolve('src\\assets');
    const fileList = await fs.readdir(folderPath);

    if (!fileList.includes(`${query.filename}.jpg`)) {
      jsonErorr.message = 'Image does not exist';
      res.status(400).json(jsonErorr);
      return;
    }
  } else {
    jsonErorr.message = 'Please send an Image name';
    res.status(400).json(jsonErorr);
    return;
  }

  if (isNaN(height) || height < 0) {
    jsonErorr.message = 'height is invalid';
    res.status(400).json(jsonErorr);
    return;
  }
  if (isNaN(width) || width < 0) {
    jsonErorr.message = 'width is invalid';
    res.status(400).json(jsonErorr);
    return;
  }

  next();
};

export default queryValidator;
