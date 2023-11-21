let trackBtn = document.querySelector('#trackBtn')
let my_modal_1 = document.querySelector('#my_modal_1')
let newWorkoutForm = document.querySelector('#newWorkoutForm')






// As a user, I can track a new workout
function trackNewWorkout(){
    trackBtn.addEventListener('click', (event)=>{
        newWorkoutForm.reset();
        my_modal_1.showModal();

        console.log('hello')
    })
    
}
trackNewWorkout()
// 2. As a user, I can add a date to each workout
// 3. As a user, I can add measurements to each workout (distance, time,
// weight, sets, etc.)
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