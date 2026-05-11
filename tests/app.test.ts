import request from 'supertest';
import app from '../src/app';

describe('API routes', () => {
  it('GET /api/health returns ok status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('GET /api/stack returns StackCategory[] shape or 503 when DB not ready', async () => {
    const response = await request(app).get('/api/stack');
    expect([200, 503]).toContain(response.status);
    if (response.status === 200) {
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toEqual(
        expect.objectContaining({
          category: expect.any(String),
          items: expect.any(Array)
        })
      );
      // Pitfall 1: no Mongoose ObjectId leak.
      expect(response.body[0]._id).toBeUndefined();
      expect(response.body[0].__v).toBeUndefined();
    }
  });

  it('GET /api/profile returns Profile shape or 503 when DB not ready', async () => {
    const response = await request(app).get('/api/profile');
    expect([200, 503]).toContain(response.status);
    if (response.status === 200) {
      expect(response.body).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          shortName: expect.any(String),
          initials: expect.any(String),
          role: expect.any(String),
          location: expect.any(String),
          email: expect.any(String),
          resumeUrl: expect.any(String),
          bio: expect.objectContaining({
            short: expect.any(String),
            long: expect.any(Array)
          }),
          highlights: expect.any(Array),
          socials: expect.any(Array)
        })
      );
      // Pitfall 1: no Mongoose ObjectId leak in any sub-doc.
      expect(response.body._id).toBeUndefined();
      expect(response.body.__v).toBeUndefined();
    }
  });
});
