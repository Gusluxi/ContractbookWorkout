const dashboardChallengeDiv = document.getElementById("dashboard-challenge-goals");



function displayTopEmployeeChallenges(employees, workouts, challengeDate) {
    let filteredChallengeWorkouts = workouts.filter(workout => {let workoutDate = new Date(workout.workoutDate);
    return (new Date(challengeDate.startDate) <= workoutDate && workoutDate <= new Date(challengeDate.endDate))
    });
    console.log("filtered Workouts:", filteredChallengeWorkouts)
    countChallenges(employees, filteredChallengeWorkouts, challengeDate)
}

function countChallenges(employees, workouts, challengeDate){
    let monthCounter = [];
    employees.map(employee => {
        console.log(employee)
        let employeeWorkouts = workouts.filter(workout => workout.employee.id === employee.id)
        for (let date = new Date(challengeDate.startDate); date <= new Date(challengeDate.endDate); date.setDate(date.getDate()+1)) {
            employeeWorkouts.map(workout => {
                let workoutDate = new Date(workout.workoutDate);
                if (workoutDate.toDateString() === date.toDateString()) {
                    monthCounter.push({
                        employeeId: employee.id,
                        month: workoutDate.getMonth()
                    })
                }
            })
        }
    })
    console.log(monthCounter);
    const employeesChallengeDone = Object.values(monthCounter.reduce((reduce, element) => {
        let key = `${element.employeeId}|${element.month}`;
        if (!reduce[key])
            reduce[key] = {...element, count: 1}
        else reduce[key].count += 1;
            return reduce;
    }, {})).filter(employeeMonth => employeeMonth.count >= 20)
    console.log(employeesChallengeDone)
    employees.map(employee => {
        const challenges = employeesChallengeDone.filter(employeeDone => employeeDone.employeeId === employee.id).length

        displayChallenges(challenges, employee)
    })
}
function displayChallenges(challenges, employee) {
    const challengesDiv = document.createElement("div");
    challengesDiv.id = employee.id;
    challengesDiv.innerHTML = `
    <div class="challenge-card">
        <div class="challenge-name">
            Name: ${employee.name}
        </div>
        <div class="challenge-count">
            Challenges Completed: ${challenges}
        </div>
    </div>
    `
    dashboardChallengeDiv.appendChild(challengesDiv);
}
