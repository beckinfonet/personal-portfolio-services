import app from './app';
import { connectToDatabase } from './config/database';
import { env } from './config/env';

const start = async (): Promise<void> => {
  await connectToDatabase();

  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Portfolio services listening on ${env.port}`);
  });
};

start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', error);
  process.exit(1);
});
