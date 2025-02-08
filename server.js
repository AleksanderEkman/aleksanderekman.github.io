import express from 'express';
import { handler } from './build/handler.js';

const app = express();

// Add any Express middleware or routes here
app.use(express.json());

app.use((req, res, next) => {
  try {
    decodeURIComponent(req.path);
    next();
  } catch (err) {
    if (err instanceof URIError) {
      // Redirect to home page if URI is malformed
      return res.redirect(301, '/');
    }
    next(err);
  }
});

// Use SvelteKit's handler
app.use(handler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
