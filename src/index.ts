import express from 'express';
import imageRepoistory from './imageRepoistory';
import queryValidator from './validator';
import {imageResizer} from './imageResizer';
import imageFetcher from './fileFetcher';
const app = express();

const port = 3000;

const imagesMiddleWare = [queryValidator, imageRepoistory, imageResizer];
app.get(
  '/resizer',
  imagesMiddleWare,
  (req: express.Request, res: express.Response) => {
    const imageName = req.query.outputImageName as string;
    imageFetcher(imageName).then((imgBuffer) => {
      res.status(200).end(imgBuffer);
    });
  }
);

const jsonErorr = { success: false, message: '404 Not Found' };
app.get('*', (req: express.Request, res: express.Response) => {
  res.status(404).json(jsonErorr);
});

app.listen(port, () => {
  console.log(`localhost:${port} end point is resizer`);
});

export default app;
