import 'dotenv/config'
import cors from 'cors'
import express from 'express'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'EDUAI API' })
})

app.listen(port, () => {
  console.log(`EDUAI API is ready on http://localhost:${port}`)
})
