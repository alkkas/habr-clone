require('dotenv').config()
import handleUnknownError from '@middlewares/errorHandler.js'
import router from '@routes/index'
import 'core-js/stable'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import sequelize from './db.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use(handleUnknownError)

const port = process.env.PORT ?? 5000

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: false })
    app.get('/', (req, res) => {
      res.send('server startasdfased')
    })
    app.listen(port, () => {
      console.log(`server running on port ${port}`)
    })
  } catch (e) {
    console.log(`error ${e}`)
  }
}

start()
