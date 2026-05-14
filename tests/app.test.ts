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

  it('GET /api/experience returns Experience[] shape or 503 when DB not ready', async () => {
    const response = await request(app).get('/api/experience');
    expect([200, 503]).toContain(response.status);
    if (response.status === 200) {
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toEqual(
        expect.objectContaining({
          company: expect.any(String),
          role: expect.any(String),
          period: expect.any(String),
          summary: expect.any(String),
          bullets: expect.any(Array),
          tech: expect.any(Array)
        })
      );
      // bullets and tech are arrays of strings (empty allowed for un-reseeded prod, per spec §9).
      for (const b of response.body[0].bullets) {
        expect(typeof b).toBe('string');
      }
      for (const t of response.body[0].tech) {
        expect(typeof t).toBe('string');
      }
      expect(response.body[0]._id).toBeUndefined();
      expect(response.body[0].startDate).toBeUndefined();   // old shape gone
      expect(response.body[0].highlights).toBeUndefined();  // old shape gone
    }
  });

  it('GET /api/apps returns ShippedApp[] shape or 503 when DB not ready', async () => {
    const response = await request(app).get('/api/apps');
    expect([200, 503]).toContain(response.status);
    if (response.status === 200) {
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          platforms: expect.any(Array),
          role: expect.any(String),
          year: expect.any(String)
        })
      );
      // platforms entries must be 'ios' | 'android'
      for (const p of response.body[0].platforms) {
        expect(['ios', 'android']).toContain(p);
      }
      // Pitfall 5: at least one store URL must be present when the app is on that platform
      if (response.body[0].platforms.includes('ios')) {
        expect(response.body[0].appStoreUrl).toMatch(/^https?:\/\//);
      }
      if (response.body[0].platforms.includes('android')) {
        expect(response.body[0].googlePlayUrl).toMatch(/^https?:\/\//);
      }
      // No legacy keys
      expect(response.body[0].description).toBeUndefined();
      expect(response.body[0].stack).toBeUndefined();
      expect(response.body[0].url).toBeUndefined();
      expect(response.body[0]._id).toBeUndefined();
    }
  });

  it('GET /api/posts returns Writing[] shape or 503 when DB not ready', async () => {
    const response = await request(app).get('/api/posts');
    expect([200, 503]).toContain(response.status);
    if (response.status === 200) {
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          slug: expect.any(String),
          excerpt: expect.any(String),
          date: expect.any(String),
          readTime: expect.any(String),
          link: expect.any(String)
        })
      );
      // Legacy field gone
      expect(response.body[0].publishedAt).toBeUndefined();
      expect(response.body[0]._id).toBeUndefined();
      // link must be HTTPS
      expect(response.body[0].link).toMatch(/^https?:\/\//);
    }
  });

  it('GET /api/posts?limit=1 caps response to 1 entry', async () => {
    const response = await request(app).get('/api/posts?limit=1');
    expect([200, 503]).toContain(response.status);
    if (response.status === 200) {
      expect(response.body.length).toBeLessThanOrEqual(1);
    }
  });

  it('GET /api/projects returns Project[] shape or 503 when DB not ready', async () => {
    const response = await request(app).get('/api/projects');
    expect([200, 503]).toContain(response.status);
    if (response.status === 200) {
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          year: expect.any(String),
          status: expect.any(String),
          summary: expect.any(String),
          tech: expect.any(Array),
          role: expect.any(String),
          link: expect.any(String)
        })
      );
      expect(response.body[0]._id).toBeUndefined();
      expect(response.body[0].link).toMatch(/^https?:\/\//);
    }
  });
});
