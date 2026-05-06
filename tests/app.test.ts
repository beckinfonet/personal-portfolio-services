import request from 'supertest';
import app from '../src/app';

describe('API routes', () => {
  it('GET /api/health returns ok status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('GET /api/skills returns array with expected shape', async () => {
    const response = await request(app).get('/api/skills');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        category: expect.any(String),
        level: expect.any(String)
      })
    );
  });
});
