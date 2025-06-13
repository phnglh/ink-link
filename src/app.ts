import express from 'express'
import type {Application, Response, Request} from 'express'
import cors from 'cors'
import compression from 'compression';
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(compression({
  level: 6,
  threshold: 100 * 1000
}))

app.get('/', (req: Request, res: Response) => {
   res.json({
    message: 'Hello from the Realtime Collab API!',
  });
});

app.get('/healcheck',(req: Request, res: Response)=> {
  res.json({
    message: "healcheck"
  })
})




export {app}
