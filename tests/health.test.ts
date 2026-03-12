import request from 'supertest';
import app from '../src/app';

describe('Health Check API', () => {
  it('should return 200 and a success message', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'Server is running properly');
  });
});
