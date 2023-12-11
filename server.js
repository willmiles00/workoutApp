const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('src'))


// my tailwind css file is in the dist folder
app.use(express.static('dist'))



let completedWorkouts = [

]

// gets all workouts from completedWorkouts array in server.js
app.get('/api/workouts', (req, res) => {
  res.send(completedWorkouts)
});


app.post('/api/workout', (req, res) => {
  // add a new workout
  completedWorkouts.push({
    id: completedWorkouts.length + 1,
    date: req.body.date,
    workout: req.body.workout,
    details: req.body.details
  });
  res.send(completedWorkouts)
  })


  app.put('/api/workouts/:id', (req, res) => {
    // Get the workout id from the request parameters
    const id = parseInt(req.params.id);
  
    // Get the updated workout data from the request body
    const updatedWorkout = req.body;
  
    // Find the workout with the given id in the completedWorkouts array
    const workout = completedWorkouts.find(workout => workout.id === id);
  
    if (workout) {
      // Update the workout with the new data
      Object.assign(workout, updatedWorkout);
  
      // Respond with the updated workout
      res.json(workout);
    } else {
      // Respond with an error if the workout was not found
      res.status(404).json({ message: 'Workout not found' });
    }
  });

  //delete a workout
  app.delete('/api/workouts/:id', (req, res) => {
    // Get the workout id from the request parameters
    const id = parseInt(req.params.id);
  
    // Find the index of the workout with the given id in the completedWorkouts array
    const index = completedWorkouts.findIndex(workout => workout.id === id);
  
    if (index !== -1) {
      // Remove the workout from the completedWorkouts array
      completedWorkouts.splice(index, 1);
    }
  
    // Respond with an empty object
    res.status(204).json({});
  });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



