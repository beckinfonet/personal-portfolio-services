import mongoose from 'mongoose';
import { env } from './env';

let hasConnected = false;

// RESEARCH Open Question #2: surface driver-level reconnect/drop events in Railway logs.
mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('mongo:', err.message);
});

export const connectToDatabase = async (): Promise<void> => {
  if (hasConnected) {
    return;
  }

  await mongoose.connect(env.mongoUri);
  hasConnected = true;
};
