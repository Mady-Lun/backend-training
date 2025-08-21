import express from 'express';
import cors from 'cors';

// custom modules
import config from './config';

//types
import type { CorsOptions } from 'cors';

const app = express();

//configure CORS options
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (config.NODE_ENV === 'development' || !origin || config.WHITELIST_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error: ${origin} is not allowed`), false);
    }
    console.log(`CORS error: ${origin} is not allowed`);
  }
};

//apply cors middleware
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello World!',
 });
});

app.listen(config.PORT, () => {
  console.log(`Server running: http://localhost:${config.PORT}`);
});