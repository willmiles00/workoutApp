let trackBtn = document.querySelector('#trackBtn')
let addNewWorkoutPopout = document.querySelector('#addNewWorkoutPopout')
let newWorkoutForm = document.querySelector('#newWorkoutForm')
let workoutSelect = document.querySelector('#workoutSelect')



let completedWorkouts = [
    
]



// As a user, I can add a date to each workout
//grabs today's date, makes it the default and maximum
let dateSelector = document.querySelector('#dateSelector')
let today = new Date();
let yyyy = today.getFullYear();
let mm = today.getMonth() + 1; 
let dd = today.getDate();
let formattedDate = yyyy + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd);
dateSelector.value = formattedDate
dateSelector.max = formattedDate

// As a user, I can track a new workout
function trackNewWorkout(){
    trackBtn.addEventListener('click', (event)=>{
        newWorkoutForm.reset();
        addNewWorkoutPopout.showModal();
    })
    
}
trackNewWorkout()


function generateFormElements(workoutType) {
    if (workoutType === "weights") {
      // Generate weights form elements
      return `
      <div id="dynamicForm">
        <div id="weightsForm">
          <label for="howHeavy"><br>Weight (in pounds):</label>
          <input class='input input-bordered w-1/2' required type="number" id="howHeavy" name="howHeavy" min="1" max="500" />
  
          <label for="reps"><br>Reps:</label>
          <input class='input input-bordered w-1/2' required type="number" id="reps" name="reps" min="1" max="500" />
  
          <label for="sets"><br>Sets:</label>
          <input class='input input-bordered w-1/2' required type="number" id="sets" name="sets" min="1" max="500" />
        </div>
        </div>
      `;
    } else if (workoutType === "running") {
      // Generate cardio form elements
      return `
      <div id="dynamicForm">
        <div id="runningForm">
          <label for="duration"><br>Duration (in minutes):</label>
          <input class='input input-bordered w-1/2' required type="number" id="duration" name="duration" min="1" max="60" />
  
          <label for="distance"><br>Distance (in miles):</label>
          <input class='input input-bordered w-1/2' required type="number" id="distance" name="distance" min="0" max="100" />
        </div>
        </div>
      `;
    } else {
      // Default form elements for other workout types
      return `
      <div id="dynamicForm">
        <div id="otherWorkoutForm">
          <label for="details"><br>Details:</label>
          <textarea class='input input-bordered w-full' required id="details" name="details" rows="3"></textarea>
        </div>
        </div>
      `;
    }
  }
  
  // Handle workout selection change
  workoutSelect.addEventListener('change', (event) => {
    const selectedWorkoutType = event.target.value;
    const formElementsHTML = generateFormElements(selectedWorkoutType);
  
    // Clear existing form elements
    const existingFormElements = document.getElementById('dynamicForm');
    if (existingFormElements) {
      existingFormElements.parentNode.removeChild(existingFormElements);
    }
  
    // Insert new form elements
    workoutSelect.insertAdjacentHTML('afterend', formElementsHTML);
  });
  

newWorkoutForm.addEventListener('submit', (event)=>{
    event.preventDefault()
    let formData = new FormData(newWorkoutForm)


    for (const entry of formData) {
      console.log(entry);
    }
    console.log(event)
    addNewWorkoutPopout.close()
})




// 4. As a user, I can edit previously submitted workouts
// 5. As a user, I can view previous workouts in a timeline
// 6. As a user, I can delete workouts
// 7. As a user, I can earn badges for completing different exercise goals
// 8. As a user, I can share workouts, badges, and other progress goals
// across various social medias
// 9. As a user, I can set long term workout goals with (e.g. a ‘goal’ would
// be ‘lift weights 20 times’ and progress could be seen on the app ‘3
// out of 20 times completed’)
// 10.As a user, I can generate a workout plan for the day and track my
// progress as I go along.
// 11.As a user, I can log my weight and track progression over time
// 12.As a user, I can log journal entries, and track my mood with each
// entry
// 13.As a user, I can track my water intake.
// 14.As a user, I can view a library of different workouts
// 15.As a user, I can add progress pictures to my timeline 