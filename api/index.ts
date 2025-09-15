import { createServer } from '../server/index';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Create the Express server
const app = createServer();

// Handle Vercel serverless function
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Forward all requests to the Express app
  return app(req, res);
}