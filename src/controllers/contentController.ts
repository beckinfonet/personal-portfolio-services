import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { App } from '../models/App';
import { Experience } from '../models/Experience';
import { Post } from '../models/Post';
import { Profile } from '../models/Profile';
import { Stack } from '../models/Stack';
import {
  placeholderApps,
  placeholderExperience,
  placeholderPosts,
  placeholderProfile,
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
  if (mongoose.connection.readyState !== 1) {
    res.status(200).json(placeholderApps);
    return;
  }

  try {
    const apps = await App.find().lean();
    res.status(200).json(apps.length > 0 ? apps : placeholderApps);
  } catch {
    res.status(200).json(placeholderApps);
  }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  const limit = Number(req.query.limit ?? 3);
  const queryLimit = Number.isFinite(limit) && limit > 0 ? limit : 3;

  if (mongoose.connection.readyState !== 1) {
    res.status(200).json(placeholderPosts.slice(0, queryLimit));
    return;
  }

  try {
    const posts = await Post.find().sort({ publishedAt: -1 }).limit(queryLimit).lean();
    if (posts.length > 0) {
      res.status(200).json(posts);
      return;
    }
  } catch {
    res.status(200).json(placeholderPosts.slice(0, queryLimit));
    return;
  }

  res.status(200).json(placeholderPosts.slice(0, queryLimit));
};
