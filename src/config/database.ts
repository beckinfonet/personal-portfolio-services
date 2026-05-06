import mongoose from 'mongoose';
import { env } from './env';

let hasConnected = false;

export const connectToDatabase = async (): Promise<void> => {
  if (hasConnected) {
    return;
  }

  await mongoose.connect(env.mongoUri);
  hasConnected = true;
};
