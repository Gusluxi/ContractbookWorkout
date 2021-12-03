const companyWorkoutWrapperMonthly = document.getElementById("company-workout-monthly");
const companyWorkoutWrapperYearly = document.getElementById("company-workout-yearly");
let date = new Date();
let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
let endDate = new Date(date.getFullYear(), date.getMonth() +1, 0);
console.log(startDate + " & " + endDate);
let fetchedWorkouts;

fetch(APIUrl + "/workouts")
    .then(response => response.json())
    .then(workouts => {
        workouts.map(addWorkOutInfoToDivList);
        fetchedWorkouts = workouts;
        createCompanyWorkoutCardYearly(workouts);

    });

fetch(APIUrl + "/workouts")
    .then(response => response.json())
    .then(workouts => {
        workouts.map(createCompanyWorkoutCardMonthly);
    });


function addWorkOutInfoToDivList(workout){
    const workoutInfoToDiv = document.createElement("div");
    companyWorkoutWrapperYearly.appendChild(workoutInfoToDiv);
    console.log(workout);
    console.log(workoutInfoToDiv);
    console.log("hej");

    displayYearlyWorkouts(workoutInfoToDiv, workout);
}


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
