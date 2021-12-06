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
                constructWorkoutGraph();
            })
    })

const employeeDashboardGraphDiv = document.getElementById("employee-workout-dates");


function constructWorkoutGraph() {
    for (let d = startDate; d <= endDate; d.setDate(d.getDate()+1)) {
        const workoutGraphDateDiv = document.createElement("div");
        workoutGraphDateDiv.setAttribute("id", "date-wrapper");
        console.log(d);
        workoutGraphDateDiv.innerHTML = `
        <div class="date">${d.getDate() + "/" + (d.getMonth()+1)}</div>
        `;
        employeeDashboardGraphDiv.appendChild(workoutGraphDateDiv);
    }
}