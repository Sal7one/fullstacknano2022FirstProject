import express from 'express';
import imageHandler from './imageHandler';
import queryValidator from './validator';
import imageManipulator from './imageManipulator';
import imageFetcher from './imageFetcher';
const app = express();

const port = 3000;

const imagesMiddleWare = [queryValidator, imageHandler, imageManipulator];
app.get(
  '/resizer',
  imagesMiddleWare,
  (req: express.Request, res: express.Response) => {
    const imageName = req.query.outputImageName as string;
    imageFetcher(imageName).then(imgBuffer =>{
      res.status(200).end(imgBuffer);
    })
  }
);

app.listen(port, () => {
  console.log(`localhost:${port} end point is resizer`);
});

export default app;
