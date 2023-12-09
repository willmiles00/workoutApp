const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

let completedWorkouts = [
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {

  completedWorkouts.push('books')

  res.send(completedWorkouts)
}
)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})