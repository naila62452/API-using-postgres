import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import client from './database';
import { MythicalWorldStore } from './models/mythical-wolrd';

const app: express.Application = express();
const address: string = "http://localhost:3000";

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  client.query(`SELECT * FROM books`, (err, result) => {
    if (!err) {
      res.send(result.rows)
    } else {
      console.log(`Something went wrong ${err}`)
    };
  });
  client.end;
})
client.connect;

app.get('/users', (req, res) => {
    res.send(MythicalWorldStore);
})

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
export default app;