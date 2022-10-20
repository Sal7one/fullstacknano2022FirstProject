import supertest from "supertest";
import app from "../src/index";
import path from 'path';
import {resizeImage} from "../src/imageResizer";
import {SpecReporter} from "jasmine-spec-reporter";

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayPending: true,
    },
  })
);

const request = supertest(app);


describe("Image Resizer isolated", (): void => {

  it("Valid Image Resize",  async (): Promise<void> => {
    const corretImageName = "fjord";
    const testImagePath : string =  path.join("assets", corretImageName + ".jpg");
    const testWidth  = 150;
    const testHeight  = 560;
    const testoutputImageName =  `${corretImageName}${testHeight}${testWidth}.jpg`;
    await expectAsync(resizeImage(testImagePath, testWidth, testHeight, testoutputImageName))
    .not.toBeRejectedWithError();
  });
  
 it("invalid Image Resize", async (): Promise<void> => {
      const badImageName = "hello";
      const testImagePath : string =  path.join("assets", badImageName + ".jpg");
      const testWidth  = -1;
      const testHeight  = 55;
      const testoutputImageName  =  `${badImageName}${testHeight}${testWidth}.jpg`;
      
      await expectAsync(resizeImage(testImagePath, testWidth, testHeight, testoutputImageName))
       .toBeRejectedWithError();
    });

    });

describe("Invalid parameters", (): void => {
  it("Response status 400 should be returned when sending bad width", async (): Promise<void> => {
    const response = await request.get(
      `/resizer?filename=fjord&height=123&width=ksa`
    );
    expect(response.status).toEqual(400);
  });

  it("Response status 400 should be returned when sending bad height", async (): Promise<void> => {
    const response = await request.get(
      `/resizer?filename=fjord&height=ddd&width=124`
    );
    expect(response.status).toEqual(400);
  });

  it("Response status 400 should be returned when sending negative width", async (): Promise<void> => {
    const response = await request.get(
      `/resizer?filename=fjord&height=15&width=-855`
    );
    expect(response.status).toEqual(400);
  });
  
  it("Response status 400 should be returned when sending negative height", async (): Promise<void> => {
    const response = await request.get(
      `/resizer?filename=fjord&height=-15&width=124`
    );
    expect(response.status).toEqual(400);
  });

  it("Response status 400 should be returned when sending a radom filename ", async (): Promise<void> => {
    const response = await request.get(
      `/resizer?filename=mynewimage&height=123&width=124`
    );
    expect(response.status).toEqual(400);
  });
});

describe("Correct Request", (): void => { 
  it("Response status 200 should be returned ", async (): Promise<void> => {
    const response = await request.get(
      `/resizer?filename=fjord&height=50&width=255`
    );
    expect(response.status).toEqual(200);
  });
});

describe("Random Page Request", (): void => {
  it("Response status 404 should be returned ", async (): Promise<void> => {
    const response = await request.get(`/randomPage`);
    expect(response.status).toEqual(404);
  });
});