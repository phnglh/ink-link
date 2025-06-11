import express from 'express'
import type {Application, Response, Request} from 'express'

const app: Application = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
   res.json({
    message: 'Hello from the Realtime Collab API!',
  });
});


export {app}
