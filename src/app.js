//DOM Elements
let trackBtn = document.querySelector('#trackBtn')
let addNewWorkoutPopout = document.querySelector('#addNewWorkoutPopout')
let newWorkoutForm = document.querySelector('#newWorkoutForm')
let workoutSelect = document.querySelector('#workoutSelect')
let workoutTimeline = document.querySelector('#workoutTimeline')
let editWorkoutPopout = document.querySelector('#editWorkoutPopout')
let deleteWorkoutPopout = document.querySelector('#deleteWorkoutPopout')


let completedWorkouts = [
    {
      id: 1,
      date: "2023-11-30",
      workout: "running",
      details: {
        duration: 30,
        distance: 30,
      }
    },
    {
      id: 2,
      date: "2023-12-03",
      workout: "weights",
      details: {
        howHeavy: 30,
        reps: 15,
        sets: 3,
      },
    },
    // ... other completed workouts
];

completedWorkouts = completedWorkouts.map((workout, index) => {
  return { ...workout, id: index + 1 };
});

const workoutTypeMapping = {
  weights: {
    fields: ['howHeavy', 'reps', 'sets'],
    properties: ['howHeavy', 'reps', 'sets'],
    displayNames: {
      howHeavy: 'Weight (in pounds)',
      reps: 'Reps',
      sets: 'Sets'
    }
  },
  running: {
    fields: ['duration', 'distance'],
    properties: ['duration', 'distance'],
    displayNames: {
      duration: 'Duration (in minutes)',
      distance: 'Distance (in miles)'
    }
  },
  default: {
    fields: ['details'],
    properties: ['details'],
    displayNames: {
      details: 'Details'
    }
  }
};



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
  

  //submit workout event listener
newWorkoutForm.addEventListener('submit', (event)=>{
  event.preventDefault();
  submitWorkout()
});

function submitWorkout(){
  let formData = new FormData(newWorkoutForm);
  let selectedWorkoutType = workoutSelect.value;
  
  //Creates a New Workout using the data gathered using submit
  let newWorkout = {
      id: completedWorkouts.length + 1,
      date: formData.get('dateSelector'),
      workout: selectedWorkoutType,
      details:{}
  };

  //grabs the mapping details defined at the top of the JS document
  const workoutType = workoutTypeMapping[selectedWorkoutType];


  //if else statement checks if workout is a defined workout, or a generic one
  if (workoutType && workoutType.fields.length > 0) {
    workoutType.properties.forEach(property => {
      newWorkout.details[property] = formData.get(property);
    });
  } else {
    // For "other" workout types, assuming it's a single details field
    newWorkout.details = formData.get('details');
  }
 
  //pushes to the completedWorkouts array
  completedWorkouts.push(newWorkout);
  console.log(completedWorkouts);
  addNewWorkoutPopout.close();
  viewWorkouts(completedWorkouts)
}


// 4. As a user, I can view previous workouts in a timeline
function viewWorkouts(completedWorkouts){

// Sort the completedWorkouts array based on the date
completedWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // clears out previously submitted workouts
  workoutTimeline.innerHTML = "";

completedWorkouts.forEach((workout)=>{

  //Quite literally what creates the HTML element for the details array
  let detailsHTML = '';

  const workoutType = workoutTypeMapping[workout.workout];

  if (workoutType) {
    detailsHTML = workoutType.fields
    .map((field, index) => {
      const value = workout.details[field];
      const propertyName = workoutType.displayNames[field] || field; // Use display name if available, otherwise use the field name
      return `<div>${propertyName}: ${value}</div>`;
    })
    .join('');
  } else {
    detailsHTML = `<div>Details: ${JSON.stringify(workout.details)}</div>`;
  }
  
// builds a new item on the Workout Timeline
const li= `<li>
<div class="timeline-middle">
<i class="fa-solid fa-circle" style="color: #ffffff;"></i>
</div>
<div class="bg-gray-400 bg-opacity-25 p-9 rounded-xl  w-60 timeline-start md:text-end mb-10">
  <time class="font-mono italic">${workout.date}</time>
  <div class="text-lg  font-black">Workout: ${workout.workout} </div>
  ${detailsHTML}
  <button class="btn border-none bg-blue-500 editBtn" data-editBtn="${workout.id}">Edit</button>
  <button class="btn border-none  bg-red-700 deleteBtn" data-deleteBtn="${workout.id}">Delete</button>
</div>
<hr/>
</li>
` 

    workoutTimeline.insertAdjacentHTML("beforeend", li);
  
})
}
viewWorkouts(completedWorkouts)

// 5. As a user, I can edit previously submitted workouts
function editWorkout(){
  document.addEventListener('click', (event)=>{
    if (event.target.classList.contains('editBtn')) {
      editWorkoutPopout.showModal() 
    
    }
  })
}
editWorkout()
viewWorkouts(completedWorkouts)

document.addEventListener('click', (event)=>{
  if (event.target.classList.contains('deleteBtn')) {
    deleteWorkoutPopout.showModal() 
  }
})

deleteWorkoutPopout.addEventListener('submit', (event)=>{
  deleteWorkout(event)
})

// 6. As a user, I can delete workouts
function deleteWorkout(event){
  console.log(event.target)
  }




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
