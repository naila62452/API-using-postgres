import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import client from './database';
import books_route from './handler/book';
import { ArticleStore, Article } from './models/article';
import articleRoutes from './handler/article'
import mythical_routes from './handler/mythical_world_handler';
import user_routes from './handler/user';

const app: express.Application = express();
const address: string = "http://localhost:3000";

app.use(bodyParser.json());

books_route(app);
articleRoutes(app);
mythical_routes(app);
user_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
export default app;