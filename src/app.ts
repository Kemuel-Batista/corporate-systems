import express from 'express'
import { router } from './routes'

const app = express()

app.use(express.json({ limit: '100mb' }))

app.use(router)

export { app }
