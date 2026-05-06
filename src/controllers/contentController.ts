import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { App } from '../models/App';
import { Experience } from '../models/Experience';
import { Post } from '../models/Post';
import { Profile } from '../models/Profile';
import { Skill } from '../models/Skill';
import {
  placeholderApps,
  placeholderExperience,
  placeholderPosts,
  placeholderProfile,
  placeholderSkills
} from '../seed/placeholders';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({ status: 'ok' });
};

export const getProfile = async (_req: Request, res: Response): Promise<void> => {
  if (mongoose.connection.readyState !== 1) {
    res.status(200).json(placeholderProfile);
    return;
  }

  try {
    const profile = await Profile.findOne().lean();
    res.status(200).json(profile ?? placeholderProfile);
  } catch {
    res.status(200).json(placeholderProfile);
  }
};

export const getSkills = async (_req: Request, res: Response): Promise<void> => {
  if (mongoose.connection.readyState !== 1) {
    res.status(200).json(placeholderSkills);
    return;
  }

  try {
    const skills = await Skill.find().lean();
    res.status(200).json(skills.length > 0 ? skills : placeholderSkills);
  } catch {
    res.status(200).json(placeholderSkills);
  }
};

export const getExperience = async (_req: Request, res: Response): Promise<void> => {
  if (mongoose.connection.readyState !== 1) {
    res.status(200).json(placeholderExperience);
    return;
  }

  try {
    const experience = await Experience.find().lean();
    res.status(200).json(experience.length > 0 ? experience : placeholderExperience);
  } catch {
    res.status(200).json(placeholderExperience);
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
