import express from 'express';

const queryValidator = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const userQuery = req.query;
  if (
    userQuery.filename == undefined ||
    userQuery.width == undefined ||
    userQuery.height == undefined
  ) {
    res.end('Missing data');
  }
  const widthParam: string = req.query.width as string;
  const heightParam: string = req.query.height as string;
  const width: number = parseInt(widthParam);
  const height: number = parseInt(heightParam);

  if (isNaN(width) || isNaN(width)) res.end('width or height is invalid');
  next();
};

export default queryValidator;
