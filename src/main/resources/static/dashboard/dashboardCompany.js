const companyWorkoutWrapperYearly = document.getElementById("company-workout-monthly-yearly");
let dateFullYear = new Date();
let startDateFullYear = new Date(dateFullYear.getFullYear(),0, 1);
let endDateFullYear = new Date(dateFullYear.getFullYear(),0,365);
console.log(startDateFullYear + " & " + endDateFullYear);
let fetchedWorkouts;

function displayYearlyWorkouts(workouts) {
    const companyWorkoutDiv = document.createElement("div");
    companyWorkoutDiv.setAttribute("id", "company-workout-div");
    const yearlyWorkouts = workouts.filter(workouts => {
        let workoutDates = new Date(workouts.workoutDate);
        return (startDateFullYear < workoutDates && workoutDates < endDateFullYear)
    });

    const monthlyWorkouts = workouts.filter(workouts => {
        let workoutDates = new Date(workouts.workoutDate);
        return (startDate < workoutDates && workoutDates < endDate)
    });
    companyWorkoutDiv.innerHTML = `
    <div id="monthly-count" class="workout-counters">Total Workouts This Month: ${monthlyWorkouts.length}</div>
    <div id="yearly-count" class="workout-counters">Total Workouts This Year: ${yearlyWorkouts.length}</div>
    `;
    companyWorkoutWrapperYearly.appendChild(companyWorkoutDiv);
}
