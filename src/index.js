import express from 'express'
import 'dotenv/config'
import routers from './apis'
import templateEngineConfig from './config/templateEngine.config'
import errorHandler from './middleware/errorHandler.middleware'

const app = express()

templateEngineConfig(app)

app.use(express.urlencoded())
app.use(express.json())
app.use('/', routers)

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})