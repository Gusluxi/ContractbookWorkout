const extraStatsDiv = document.getElementById("extra-stats")

function constructStats(employee, employeeWorkouts) {
    console.log("total workouts ", employeeWorkouts.length, "employee ", employee)
    const totalWorkoutDiv = document.createElement("div");
    totalWorkoutDiv.innerHTML = `
    <div>
        Employee: ${employee.name}<br>
        Total Workouts: ${employeeWorkouts.length}
    </div>
    `;
    extraStatsDiv.appendChild(totalWorkoutDiv);

}