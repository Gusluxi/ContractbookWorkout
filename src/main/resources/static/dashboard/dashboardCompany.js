const companyWorkoutWrapperYearly = document.getElementById("company-workout-yearly");
const companyWorkoutWrapperMonthly = document.getElementById("company-workout-monthly");
let dateFullYear = new Date();
let startDateFullYear = new Date(dateFullYear.getFullYear(),0, 1);
let endDateFullYear = new Date(dateFullYear.getFullYear(),0,365);
console.log(startDateFullYear + " & " + endDateFullYear);
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
        let workoutDates = new Date(workouts.workoutDate);
        return (startDateFullYear < workoutDates && workoutDates < endDateFullYear)
    });
    yearlyWorkoutsDiv.innerHTML = `
    <div>Company Total Yearly Workouts: ${yearlyWorkouts.length}</div>
    `;
    companyWorkoutWrapperYearly.appendChild(yearlyWorkoutsDiv);
}

function displayMonthlyWorkouts(workouts) {
    const monthlyWorkoutsDiv = document.createElement("div");
    const monthlyWorkouts = workouts.filter(workouts => {
        let workoutDates = new Date(workouts.workoutDate);
        return (startDate < workoutDates && workoutDates < endDate)
    });
    monthlyWorkoutsDiv.innerHTML = `
    <div>Company Total Monthly Workouts: ${monthlyWorkouts.length}</div>
    `;
    companyWorkoutWrapperMonthly.appendChild(monthlyWorkoutsDiv);
}


