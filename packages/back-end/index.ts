import 'dotenv/config'
import express from 'express'
import { db } from './db/connection'
import { urlRoute } from './routes/url.route'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors())

db.connect((error) => {
  if (error) {
    throw new Error(String(error))
  }
  console.log('Connected to database')
})

app.use('/v1', urlRoute())

app.listen(4000, () => console.log('back-end running'))
