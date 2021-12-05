let startDateChallenge;
let endDateChallenge;

fetch(APIUrl + "/challengedates")
    .then(response => response.json())
    .then(challengeDates => {
        challengeDates.map(challengeDate =>{
            startDateChallenge = new Date(challengeDate.startDate)
            endDateChallenge = new Date(challengeDate.endDate)
            displayTopEmployeeChallenges(allEmployees, allWorkouts)
        })
    })
function displayTopEmployeeChallenges(employees, workouts) {
    let filteredChallengeWorkouts = workouts.filter(workout => { let workoutDate = new Date(workout.workoutDate);
    return (startDateChallenge < workoutDate && workoutDate < endDateChallenge)
    })
    console.log(filteredChallengeWorkouts)
    countChallenges(employees, filteredChallengeWorkouts)
}

function countChallenges(employees, workouts){
    employees.map(employee => {
        let employeeWorkouts = workouts.filter(workout => workout.employee.id === employee.id)
        employeeWorkouts.map(workout => )


    })


}