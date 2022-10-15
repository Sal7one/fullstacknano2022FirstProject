import express from 'express'

const queryValidator = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const userQuery = req.query
  if (
    userQuery.filename == undefined ||
    userQuery.width == undefined ||
    userQuery.height == undefined
  ) {
    res.end('Missing data')
  }
  next()
}

export default queryValidator
