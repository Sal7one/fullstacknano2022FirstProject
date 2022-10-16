import supertest from 'supertest';
import app from "../index"

const request = supertest(app);

  describe('Test bad image width', (): void => {
        it('Response status 400 should be returned when sending bad value', async (): Promise<void> => {
            const response = await request.get(`images`);
            expect(response.status).toEqual(400);
            expect(response.body).toEqual('width or height is invalid');
        });
    });
    
    describe('Test with image that does not exisit', (): void => {
      it('Response status 400 should be returned when sending bad value', async (): Promise<void> => {
          const response = await request.get(`images`);
          expect(response.body).toEqual('Image does not exist');
          expect(response.status).toEqual(400);
      });
  });