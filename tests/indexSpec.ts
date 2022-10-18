import supertest from 'supertest';
import app from "../src/index"

    const request = supertest(app);

    describe('Invalid parameters', ():void =>{

        it('Response status 400 should be returned when sending bad value', async (): Promise<void> => {
            const response = await request.get(`/resizer?filename=fjord&height=123&width=ksa`);
            expect(response.status).toEqual(400);
        });
    
      it('Response status 400 should be returned when sending bad value', async (): Promise<void> => {
          const response = await request.get(`/resizer?filename=mynewimage&height=123&width=124`);
          expect(response.status).toEqual(400);
      });
    it('Response status 200 should be returned ', async (): Promise<void> => {
        const response = await request.get(`/resizer?filename=fjord&height=50&width=255`);
        expect(response.status).toEqual(200);
});

    it('Response status 404 should be returned ', async (): Promise<void> => {
        const response = await request.get(`/randomPage`);
        expect(response.status).toEqual(404);
    });

});