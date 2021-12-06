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
    <img src="https://assets-global.website-files.com/5a0ab23fd65a2f0001be1464/617075a4617cf63934304785_LOGO.svg"
    <div><br>Total Yearly Workouts: ${yearlyWorkouts.length}</div>
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
    <div>Total Monthly Workouts: ${monthlyWorkouts.length}</div>
    `;
    companyWorkoutWrapperMonthly.appendChild(monthlyWorkoutsDiv);
}


