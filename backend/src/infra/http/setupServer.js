import express from 'express'
import cors from 'cors'
import accessEnv from '../../helpers/accessEnv'
import setupRoutes from './routes/index.js'

const port = accessEnv('PORT', 4003)
const app = express()

app.use(
  cors({
    origin: (origin, callback) => {
      const originsAllowed = process.env.CORS_ORIGIN_ALLOWED
      if (
        originsAllowed === '*' ||
        originsAllowed.split(',').indexOf(origin) !== -1
      ) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    optionsSuccessStatus: 200,
  })
)
app.set('trust proxy', true)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

setupRoutes(app)

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})
