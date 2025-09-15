import { createServer } from '../server/index';

// Create the Express server
const app = createServer();

// Export the API handler for Vercel
export default app;