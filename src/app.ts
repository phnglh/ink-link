import express from 'express'
import type {Application, Response, Request} from 'express'
import { errorHandle } from './middlewares/errorHandler';
import cors from 'cors'
import compression from 'compression';
import authRoutes from './modules/auth/auth.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
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

app.use('/api/auth', authRoutes)
app.use(errorHandle)

export {app}
