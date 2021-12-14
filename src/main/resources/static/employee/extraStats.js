const extraStatsDiv = document.getElementById("extra-stats")

function constructStats(employee, employeeWorkouts) {
    console.log("total workouts ", employeeWorkouts.length, "employee ", employee)
    const totalWorkoutDiv = document.createElement("div");
    totalWorkoutDiv.innerHTML = `
    <div>
        <div id="employee-name">${employee.name}<br></div>
        <div id="total-workouts">Total Workouts<br>${employeeWorkouts.length}</div>
    </div>
    `;
    extraStatsDiv.appendChild(totalWorkoutDiv);

}