const companyWorkoutWrapperYearly = document.getElementById("company-workout-yearly");
const companyWorkoutWrapperMonthly = document.getElementById("company-workout-monthly");

console.log(startDate + " & " + endDate);
let fetchedWorkouts;

fetch(APIUrl + "/workouts")
    .then(response => response.json())
    .then(workouts => {
        fetchedWorkouts = workouts;
        displayYearlyWorkouts(workouts);
        displayMonthlyWorkouts(workouts);

    });


function displayYearlyWorkouts(workouts) {
    const yearlyWorkoutsDiv = document.createElement("div");
    const yearlyWorkouts = workouts.filter(workouts => {
        let workoutDates = new Date(workouts.workoutDates);
        return (startDate < workoutDates && workoutDates < endDate)
    });
    yearlyWorkoutsDiv.innerHTML = `
    <div>${yearlyWorkouts.length}</div>
    `;
    companyWorkoutWrapperYearly.appendChild(yearlyWorkoutsDiv);
}

function displayMonthlyWorkouts(workouts) {
    const monthlyWorkoutsDiv = document.createElement("div");
    const monthlyWorkouts = workouts.filter(workouts => {
        let workoutDates = new Date(workouts.workoutDates);
        return (startDate < workoutDates && workoutDates < endDate)
    });
    monthlyWorkoutsDiv.innerHTML = `
    <div>${monthlyWorkouts.length}</div>
    `;
    companyWorkoutWrapperMonthly.appendChild(monthlyWorkoutsDiv);
}


