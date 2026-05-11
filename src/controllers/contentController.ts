import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { App } from '../models/App';
import { Experience } from '../models/Experience';
import { Post } from '../models/Post';
import { Profile } from '../models/Profile';
import { Project } from '../models/Project';
import { Stack } from '../models/Stack';
import {
  placeholderApps,
  placeholderExperience,
  placeholderPosts,
  placeholderProfile,
  placeholderProjects,
  placeholderStack
} from '../seed/placeholders';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({ status: 'ok' });
};

export const getProfile = async (_req: Request, res: Response): Promise<void> => {
  // Pitfall 8 / RESEARCH Open Question disposition: return 503 when Mongo isn't ready;
  // portfolio-web/lib/api.ts:30 converts non-2xx to silent fallback (DATA-04 / D-02).
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: 'service warming' });
    return;
  }
  try {
    const doc = await Profile.findOne().lean();
    if (!doc) {
      res.status(503).json({ error: 'profile not seeded' });
      return;
    }
    // Pitfall 1 / RESEARCH §Code Examples: strip Mongoose-injected fields.
    const { _id, __v, createdAt, updatedAt, ...clean } = doc as Record<string, unknown>;
    void _id; void __v; void createdAt; void updatedAt;
    res.status(200).json(clean);
  } catch {
    res.status(503).json({ error: 'fetch failed' });
  }
};

export const getStack = async (_req: Request, res: Response): Promise<void> => {
  // Pitfall 8 / RESEARCH Open Question disposition: return 503 when Mongo isn't ready;
  // portfolio-web/lib/api.ts:30 converts non-2xx to silent fallback (DATA-04 / D-02).
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: 'service warming' });
    return;
  }
  try {
    const docs = await Stack.find().lean();
    // Pitfall 1 / RESEARCH §Code Examples: strip Mongoose-injected fields per entry.
    const clean = docs.map((d) => {
      const { _id, __v, createdAt, updatedAt, ...rest } = d as Record<string, unknown>;
      void _id; void __v; void createdAt; void updatedAt;
      return rest;
    });
    res.status(200).json(clean.length > 0 ? clean : placeholderStack);
  } catch {
    res.status(503).json({ error: 'fetch failed' });
  }
};

export const getExperience = async (_req: Request, res: Response): Promise<void> => {
  // Pitfall 8 / RESEARCH Open Question disposition: return 503 when Mongo isn't ready;
  // portfolio-web/lib/api.ts:30 converts non-2xx to silent fallback (DATA-04 / D-02).
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: 'service warming' });
    return;
  }
  try {
    const docs = await Experience.find().lean();
    // Pitfall 1 / RESEARCH §Code Examples: strip Mongoose-injected fields per entry.
    const clean = docs.map((d) => {
      const { _id, __v, createdAt, updatedAt, ...rest } = d as Record<string, unknown>;
      void _id; void __v; void createdAt; void updatedAt;
      return rest;
    });
    res.status(200).json(clean.length > 0 ? clean : placeholderExperience);
  } catch {
    res.status(503).json({ error: 'fetch failed' });
  }
};

export const getApps = async (_req: Request, res: Response): Promise<void> => {
  // Pitfall 8 / RESEARCH Open Question disposition: return 503 when Mongo isn't ready;
  // portfolio-web/lib/api.ts:30 converts non-2xx to silent fallback (DATA-04 / D-02).
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: 'service warming' });
    return;
  }
  try {
    const docs = await App.find().sort({ year: -1 }).lean();
    // Pitfall 1 / RESEARCH §Code Examples: strip Mongoose-injected fields per entry.
    const clean = docs.map((d) => {
      const { _id, __v, createdAt, updatedAt, ...rest } = d as Record<string, unknown>;
      void _id; void __v; void createdAt; void updatedAt;
      return rest;
    });
    res.status(200).json(clean.length > 0 ? clean : placeholderApps);
  } catch {
    res.status(503).json({ error: 'fetch failed' });
  }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  const limit = Number(req.query.limit ?? 3);
  const queryLimit = Number.isFinite(limit) && limit > 0 ? limit : 3;

  // Pitfall 8 / RESEARCH Open Question disposition: return 503 when Mongo isn't ready;
  // portfolio-web/lib/api.ts:30 converts non-2xx to silent fallback (DATA-04 / D-02).
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: 'service warming' });
    return;
  }
  try {
    const docs = await Post.find().sort({ date: -1 }).limit(queryLimit).lean();
    // Pitfall 1 / RESEARCH §Code Examples: strip Mongoose-injected fields per entry.
    const clean = docs.map((d) => {
      const { _id, __v, createdAt, updatedAt, ...rest } = d as Record<string, unknown>;
      void _id; void __v; void createdAt; void updatedAt;
      return rest;
    });
    res.status(200).json(clean.length > 0 ? clean : placeholderPosts.slice(0, queryLimit));
  } catch {
    res.status(503).json({ error: 'fetch failed' });
  }
};

export const getProjects = async (_req: Request, res: Response): Promise<void> => {
  // Pitfall 8 / RESEARCH Open Question disposition: return 503 when Mongo isn't ready;
  // portfolio-web/lib/api.ts:30 converts non-2xx to silent fallback (DATA-04 / D-02).
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: 'service warming' });
    return;
  }
  try {
    const docs = await Project.find().sort({ year: -1 }).lean();
    // Pitfall 1 / RESEARCH §Code Examples: strip Mongoose-injected fields per entry.
    const clean = docs.map((d) => {
      const { _id, __v, createdAt, updatedAt, ...rest } = d as Record<string, unknown>;
      void _id; void __v; void createdAt; void updatedAt;
      return rest;
    });
    res.status(200).json(clean.length > 0 ? clean : placeholderProjects);
  } catch {
    res.status(503).json({ error: 'fetch failed' });
  }
};
