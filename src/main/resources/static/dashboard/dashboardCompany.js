const companyWorkoutWrapperYearly = document.getElementById("company-workout-yearly");
const companyWorkoutWrapperMonthly = document.getElementById("company-workout-monthly");


fetch(APIUrl + "/workouts")
    .then(response => response.json())
    .then(workouts => {
        workouts.map(createCompanyWorkoutCardYearly);
    });

fetch(APIUrl + "/workouts")
    .then(response => response.json())
    .then(workouts => {
        workouts.map(createCompanyWorkoutCardMonthly(workouts));
    });


function createCompanyWorkoutCardYearly(workout) {
    const workoutDivYearlyElement = document.createElement("div");
    workoutDivYearlyElement.innerText = workout.name;

    companyWorkoutWrapperYearly.appendChild(workoutDivYearlyElement);
}

function createCompanyWorkoutCardMonthly(workout) {

    const workoutDivMonthlyElement = document.createElement("div");
    workoutDivMonthlyElement.innerText = workout.name;

    companyWorkoutWrapperMonthly.appendChild(workoutDivMonthlyElement);
}

