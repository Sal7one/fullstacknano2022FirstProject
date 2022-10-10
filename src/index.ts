import express from 'express';
import fileSystem from 'fs';
import sharp  from 'sharp';

const app = express();
const port = 3000;

app.get('/image', (req, res) => {
    let filename = req.query.filename;

    if(filename){
        let imageURL = "src\\images\\" + filename + ".jpg";
        let widthParam: string = req.query.width as string
        let heightParam: string = req.query.height as string
        let width: number = parseInt(widthParam)
        let height: number = parseInt(heightParam)

        let finalImageName = `${filename}${widthParam}${height}.png`
        sharp(imageURL)
            .resize(width, height)
            .toFile(finalImageName, (err, info) => {
                fileSystem.readFile(finalImageName, function(err, data) {
                    if (err) throw err
                      res.writeHead(200, {'Content-Type': 'image/jpeg'})
                      res.end(data) 
                  })
           });
    }

    // 1 - Change image size 
         // Check if processed image already exsitis: ksa125125.png
        // a: use file system to get the image by name
        // b: change the image size
        // c: save the image in file system with the new size and name!!!
    // 3 - Responed with new image
});

app.listen(port, ()=> {
    console.log(`server started at localhost:${port}`)
   });
