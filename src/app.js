import express from 'express'
import indexRouter from './routes/index.routes.js'
import cors from 'cors'
const port = 3000

const app = express()
app.use(express.json())

app.use(cors())
app.use(indexRouter)

app.listen(port, () => {
  console.log(`Running in http://localhost:${port}`)
})
