import express, { Express, Request, Response } from 'express';
import { connectToMongo } from './db';
import propertyRoutes from "./routes/properties"
import cors from "cors";

const app: Express = express();
const port = 5000

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('running on server');
});

app.use('/api/v1/properties' , propertyRoutes);

async function bootstrap(){
  await connectToMongo()
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

bootstrap()
