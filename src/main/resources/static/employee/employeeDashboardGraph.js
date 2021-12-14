const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const employeeId = URLParams.get("employeeId");
let fetchedEmployee;
let date = new Date();
let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
let endDate = new Date(date.getFullYear(), date.getMonth() +1, 0);
console.log(startDate, endDate, date);

fetch(APIUrl + "/employees/" + employeeId )
    .then(response => response.json())
    .then(employee => {
        console.log(employee);
        fetchedEmployee = employee;

        fetch(APIUrl + "/workouts/employees/" + employeeId )
            .then(response => response.json())
            .then(employeeWorkouts => {
                console.log(employeeWorkouts);
                constructWorkoutGraph(employeeWorkouts);
                constructStats(employee, employeeWorkouts);
                fetch(APIUrl + "/challengedates")
                    .then(response => response.json())
                    .then(challengeDates => {
                        challengeDates.map(challengeDate =>{
                            displayTopEmployeeChallenges(employee, employeeWorkouts, challengeDate)
                        });
                    });
            });
    });

const employeeDashboardDateDiv = document.getElementById("employee-workout-dates");
const employeeDashboardGraphDiv = document.getElementById("employee-workout-graph");
const employeeDashboardCounterDiv = document.getElementById("employee-workout-counter");



function constructWorkoutGraph(employeeWorkouts) {
    const graphCountDiv = document.createElement("div");
    graphCountDiv.innerHTML = `
    <div id="graph-counter">
        <div>25</div>
        <div>20</div>
        <div>15</div>
        <div>10</div>
        <div>5</div>
    </div>
    `;
    employeeDashboardCounterDiv.appendChild(graphCountDiv);

    let graphBarHeight = 0;
    let trained;
    for (let d = startDate; d <= endDate; d.setDate(d.getDate()+1)) {
        const workoutGraphDateDiv = document.createElement("div");
        workoutGraphDateDiv.setAttribute("id", "date-wrapper");
        workoutGraphDateDiv.innerHTML = `
        <div class="date">${d.getDate() + "/" + (d.getMonth()+1)}</div>
        `;
        employeeDashboardDateDiv.appendChild(workoutGraphDateDiv);
        const workoutGraphBarDiv = document.createElement("div");
        workoutGraphBarDiv.setAttribute("id","bar-wrapper");
        trained = false;
        employeeWorkouts.map(workout => {
            if (new Date(workout.workoutDate).toDateString() === d.toDateString()) {
                graphBarHeight += 20.5;
                trained = true;
            }
        })
        workoutGraphBarDiv.innerHTML = `
        <div id="bar-${d.toDateString()}" style="height: ${graphBarHeight}px; width: 28px; margin-left: 6px; background-color: #497ae5;">
        `;

        employeeDashboardGraphDiv.appendChild(workoutGraphBarDiv);
        const dateDiv = document.getElementById(`bar-${d.toDateString()}`);
        console.log(dateDiv);
        if(trained) {
            dateDiv.style.backgroundColor = "#ee9c3e"
        }

    }

    const graphLineDiv = document.createElement("div");
    graphLineDiv.setAttribute("id", "line-wrapper");
    graphLineDiv.innerHTML = `
    <div class="graph-line"></div>
    <div class="graph-line"></div>
    <div class="graph-line"></div>
    <div class="graph-line"></div>
    <div class="graph-line"></div>
    `;
    employeeDashboardGraphDiv.appendChild(graphLineDiv);



}

