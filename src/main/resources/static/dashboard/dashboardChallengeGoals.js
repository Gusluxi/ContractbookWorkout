const dashboardChallengeDiv = document.getElementById("dashboard-challenge-goals");
const challengeHeader = document.createElement("header");
challengeHeader.innerHTML = `<div class="header">Top 5 as of ${date.toLocaleDateString()}</div>`
dashboardChallengeDiv.appendChild(challengeHeader);
let allChallengeAmounts;
let currentChallengeGoal = 20;

fetch(APIUrl + "/challengeamounts")
    .then(response => response.json())
    .then(challengeAmounts => {
        allChallengeAmounts = challengeAmounts;
        currentMonthsGoal()
    });

function currentMonthsGoal() {
    allChallengeAmounts.map(challengeAmount => {
        if (challengeAmount.challengeMonth === date.getMonth() && date.getFullYear() === challengeAmount.challengeYear) {
            currentChallengeGoal = challengeAmount.challengeAmount;
        }
    })
    const employeeHeader = document.createElement("header");
    employeeHeader.innerHTML = `<div class="header">Employee Workouts in ${monthNames[date.getMonth()]} <br> This months goal - ${currentChallengeGoal}</div>`
    dashboardEmployeesDiv.appendChild(employeeHeader);
}


function displayTopEmployeeChallenges(employees, workouts, challengeDate) {
    let filteredChallengeWorkouts = workouts.filter(workout => {let workoutDate = new Date(workout.workoutDate);
    return (new Date(challengeDate.startDate) <= workoutDate && workoutDate <= new Date(challengeDate.endDate))
    });
    countChallenges(employees, filteredChallengeWorkouts, challengeDate)
}

function countChallenges(employees, workouts, challengeDate){
    let monthCounter = [];
    employees.map(employee => {
        let employeeWorkouts = workouts.filter(workout => workout.employee.id === employee.id)
        for (let date = new Date(challengeDate.startDate); date <= new Date(challengeDate.endDate); date.setDate(date.getDate()+1)) {
            employeeWorkouts.map(workout => {
                let workoutDate = new Date(workout.workoutDate);
                if (workoutDate.toDateString() === date.toDateString()) {
                    monthCounter.push({
                        employeeId: employee.id,
                        month: workoutDate.getMonth(),
                        year: workoutDate.getFullYear()
                    })
                }
            })
        }
    })
    const employeesChallengeDone = Object.values(monthCounter.reduce((reduce, element) => {
        let key = `${element.employeeId}|${element.month}`;
        if (!reduce[key])
            reduce[key] = {...element, count: 1}
        else reduce[key].count += 1;
            return reduce;
    }, {})).filter(employeeMonth => {
        for (let i = 0; i < allChallengeAmounts.length; i++) {
            if (allChallengeAmounts[i].challengeMonth === employeeMonth.month && allChallengeAmounts[i].challengeYear === employeeMonth.year) {
                console.log("Employee: ",employeeMonth, "DB amount", allChallengeAmounts[i].challengeAmount,"Employee Amount", employeeMonth.count)
                return employeeMonth.count >= allChallengeAmounts[i].challengeAmount;
            }
        }
        return employeeMonth.count >= 20;
        })
    let topLimit = 0;
    employees.map(employee => {
        const challenges = employeesChallengeDone.filter(employeeDone => employeeDone.employeeId === employee.id).length
        topLimit += 1;
        if (topLimit <= 5) {
            displayChallenges(challenges, employee, topLimit)
        }
    })
}

function displayChallenges(challenges, employee, place) {
    const challengesDiv = document.createElement("div");
    challengesDiv.id = employee.id;
    challengesDiv.innerHTML = `
    <div class="challenge-card">
    <a href="../employee/employee.html?employeeId=${employee.id}"><img src="${employee.slackImage}" alt="Employee Image" width="50px"></a>
    <div class="challenge-name-count-wrapper">
        <div class="challenge-name" id="place-${place}">
            ${employee.name}
        </div>
        <div class="challenge-count">
            Challenges Completed: ${challenges}
        </div>
        </div>
    </div>
    `
    dashboardChallengeDiv.appendChild(challengesDiv);
    let placeColor;
    if (place === 1) {
        placeColor = "#ffc94e";
    } else if (place === 2) {
        placeColor = "#d7d7d7";
    } else if (place === 3) {
        placeColor = "#e07c35";
    } else {
        placeColor = "#4caaed";
    }

    document.getElementById("place-"+place).style.color = placeColor;
}

