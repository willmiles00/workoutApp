//DOM Elements
let trackBtn = document.querySelector('#trackBtn')
let addNewWorkoutPopout = document.querySelector('#addNewWorkoutPopout')
let newWorkoutForm = document.querySelector('#newWorkoutForm')
let editWorkoutForm = document.querySelector('#editWorkoutForm')
let workoutSelect = document.querySelector('#workoutSelect')
let workoutTimeline = document.querySelector('#workoutTimeline')
let editWorkoutPopout = document.querySelector('#editWorkoutPopout')
let deleteWorkoutPopout = document.querySelector('#deleteWorkoutPopout')
let editDateSelector = document.querySelector('#editDateSelector')
let editWorkoutSelector = document.querySelector('#editWorkoutSelector')
let cancelAction = document.querySelector('.cancelAction')



//server call to get completed workouts
fetch('/api/workouts')
.then(res => res.json())
.then(data => {
viewWorkouts(data)
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
  swimming: {
    fields: ['distance', 'time'], // Add the fields relevant to a swimming workout
    properties: ['distance', 'time'],
    displayNames: {
      distance: 'Distance (in meters)',
      time: 'Time (in minutes)'
    }
    // Add the properties relevant to a swimming workout
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
          <input class='input input-bordered w-1/2' required type="number" id="duration" name="duration" min="0" max="9999" />
  
          <label for="distance"><br>Distance (in miles):</label>
          <input class='input input-bordered w-1/2' required type="number" id="distance" name="distance" min="0" max="9999" />
        </div>
        </div>
      `;
    }
    else if (workoutType === "swimming") {
      // Generate cardio form elements
      return `
      <div id="dynamicForm">
        <div id="swimmingForm">
          <label for="distance"><br>Distance (in meters):</label>
          <input class='input input-bordered w-1/2' required type="number" id="distance" name="distance" min="0" max="9999" />
  
          <label for="time"><br>Time (in minutes):</label>
          <input class='input input-bordered w-1/2' required type="number" id="time" name="time" min="0" max="9999" />
        </div>
        </div>
      `;
    } 
    else {
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
  
  // Create a new workout object
  let newWorkout = {
    date: formData.get('dateSelector'),
    workout: selectedWorkoutType,
    details: {}
  };

  // Grab the mapping details defined at the top of the JS document
  const workoutType = workoutTypeMapping[selectedWorkoutType];

  // If else statement checks if workout is a defined workout, or a generic one
  if (workoutType && workoutType.fields.length > 0) {
    workoutType.properties.forEach(property => {
      newWorkout.details[property] = formData.get(property);
    });
  } else {
    // For "other" workout types, assuming it's a single details field
    newWorkout.details = formData.get('details');
  }

  // Send the new workout to the server
  fetch('/api/workout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newWorkout)
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    console.log(data);
    addNewWorkoutPopout.close();
    viewWorkouts(data); // Call viewWorkouts here
  });
}


// 4. As a user, I can view previous workouts in a timeline
// function timelineWhenNoWorkouts(){
//   if (completedWorkouts.length === 0){
//     workoutTimeline.innerHTML = `<div class="text-2xl h-screen text-center">Click "Track A Workout" to get started! </div>`
//   }
// }

function createWorkoutElement(workout) {
  let detailsHTML = '';

  const workoutType = workoutTypeMapping[workout.workout];

  if (workoutType) {
    detailsHTML = workoutType.fields
    .map((field, index) => {
      const value = workout.details[field];
      const propertyName = workoutType.displayNames[field] || field;
      return `<div>${propertyName}: ${value}</div>`;
    })
    .join('');
  } else {
    detailsHTML = `<div>Details: ${JSON.stringify(workout.details)}</div>`;
  }

  return `<li>
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
  </li>`;
}

function viewWorkouts(completedWorkouts){
  if (completedWorkouts.length > 0){
    
  
  completedWorkouts.sort((a, b) => new Date(b.date) - new Date(a.date));
  workoutTimeline.innerHTML = "";
  completedWorkouts.forEach((workout) => {
    workoutTimeline.insertAdjacentHTML("beforeend", createWorkoutElement(workout));
  });}
  else{
   workoutTimeline.innerHTML = `<div class="text-2xl h-screen text-center">Click "Track A Workout" to get started! </div>`
  }
}
// viewWorkouts(completedWorkouts)

// 5. As a user, I can edit previously submitted workouts

//mutable variable to store the id of the workout to be edited
let editBtnId;

document.addEventListener('click', (event)=>{
  if (event.target.classList.contains('editBtn')) {
    editBtnId = event.target.dataset.editbtn;
    console.log(editBtnId)
    //fetch the workout to be edited server side


    // gotta make this work server side


    // creates a new date selector with the current date of the workout to be edited
    editDateSelector.innerHTML = ``
    let date = `<input required type="date" id="dateSelector" name="dateSelector" value="" min="2018-01-01" max=""/>`
    editDateSelector.insertAdjacentHTML('afterbegin', date)

    // creates a new workout selector with the current workout of the workout to be edited
    editWorkoutSelector.innerHTML = ``
    let workout = `<select class="select select-bordered w-full" id="workoutSelect" name="workoutSelect">
    <option value="">--Please choose an option--</option>
    <option value="weights">Weights</option>
    <option value="running">Running</option>
    <option value="pushups">Pushups</option>
    <option value="swimming">Swimming</option>
    </select>`
    editWorkoutSelector.insertAdjacentHTML('afterbegin', workout)
    editWorkoutSelector.addEventListener('change', (event) => {
      const selectedWorkoutType = event.target.value;
      const formElementsHTML = generateFormElements(selectedWorkoutType);
    
      // Clear existing form elements
      const existingFormElements = document.getElementById('dynamicForm');
      if (existingFormElements) {
        existingFormElements.parentNode.removeChild(existingFormElements);
      }
    
      // Insert new form elements
      editWorkoutSelector.insertAdjacentHTML('afterend', formElementsHTML);
    }
    );


    // creates a new workout selector with the current workout of the workout to be edited
    editWorkoutPopout.showModal() 
    ;
  }
})

editWorkoutPopout.addEventListener('submit', (event)=>{
  event.preventDefault()
  editWorkout(editBtnId)

  editWorkoutPopout.close()
}
)


function editWorkout(editBtnId){
  let formData = new FormData(editWorkoutForm);
  let selectedWorkoutType = formData.get('workoutSelect');
  
  // Create a new workout object
  let updatedWorkout = {
    date: formData.get('dateSelector'),
    workout: selectedWorkoutType,
    details: {}
  };

  // Grab the mapping details defined at the top of the JS document
  const workoutType = workoutTypeMapping[selectedWorkoutType];


  
  // If else statement checks if workout is a defined workout, or a generic one
  if (workoutType && workoutType.fields.length > 0) {
    workoutType.properties.forEach(property => {
      updatedWorkout.details[property] = formData.get(property);
    });
  } else {
    // For "other" workout types, assuming it's a single details field
    updatedWorkout.details = formData.get('details');
  }

  // Send the updated workout to the server
  fetch(`/api/workouts/${editBtnId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedWorkout)
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    console.log(data);
    // Fetch all workouts again after editing
    fetch('/api/workouts')
    .then(res => res.json())
    .then(data => {
      viewWorkouts(data); // Call viewWorkouts here
    });
  });
}



// As a user, I can delete workouts

//mutable variable to store the id of the workout to be edited
let deleteBtnId;

document.addEventListener('click', (event)=>{
  if (event.target.classList.contains('deleteBtn')) {
    deleteBtnId = event.target.dataset.deletebtn
    deleteWorkoutPopout.showModal() 
  }
})

deleteWorkoutPopout.addEventListener('submit', (event)=>{
  event.preventDefault()
  deleteWorkout(deleteBtnId)
  deleteWorkoutPopout.close();
})

cancelAction.addEventListener('click', (event)=>{
  event.preventDefault()
  deleteWorkoutPopout.close();
}
)

function deleteWorkout(deleteBtnId){
  // Send the updated workout to the server
  fetch(`/api/workouts/${deleteBtnId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => {
    // Handle the response from the server
    console.log(data);
    // Fetch all workouts again after editing
    fetch('/api/workouts')
    .then(res => res.json())
    .then(data => {
      viewWorkouts(data); // Call viewWorkouts here
    });
  });

  
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
