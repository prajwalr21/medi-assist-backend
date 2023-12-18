import express from 'express'
import { cors } from './middleware/cors'
import { getAnswerHandler } from './handlers/getAnswerHandler'
import { classifier } from './handlers/classifier'

const app = express()
app.use(express.json())
app.use(cors)

app.post('/', classifier, getAnswerHandler)

app.listen(4000, () => {
    console.log('listening on 4000')
})