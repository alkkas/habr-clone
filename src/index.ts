require('dotenv').config()
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import sequelize from './db.js'
import router from '@routes/index'
import models from '@models/models'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', router)

const port = process.env.PORT ?? 5000

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.get('/', (req, res) => {
      res.send('server started')
    })

    app.listen(port, () => {
      console.log(`server running on port ${port}`)
    })
  } catch (e) {
    console.log(`error ${e}`)
  }
}

start()
