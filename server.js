const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('src'))
// my tailwind css file is in the dist folder
app.use(express.static('dist'))
//this didn't work
// app.use(express.static('src/assets'))



let completedWorkouts = [
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/workout', (req, res) => {

completedWorkouts.push({
  id: completedWorkouts.length + 1,
  date: 'today',
  workout: req.body.workout,
  details:{}
})

  res.send(completedWorkouts)
}
)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})