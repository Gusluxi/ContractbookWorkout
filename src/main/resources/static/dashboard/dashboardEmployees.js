const dashboardEmployeesDiv = document.getElementById("dashboard-employees");
let fetchedEmployees
let date = new Date();
let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
let endDate = new Date(date.getFullYear(), date.getMonth() +1, 0);
console.log(startDate + " & " + endDate)
fetchEmployees();

function fetchEmployees() {
    fetch(APIUrl + "/employees")
        .then(response => response.json())
        .then(employees => {
            fetchedEmployees = employees;
            employees.map(employee => {
                fetchWorkouts(employee)
            });

        })
}
function fetchWorkouts(employee) {
    fetch(APIUrl + "/workouts/employees/"+employee.id)
        .then(response => response.json())
        .then(workouts => {

            displayEmployeeWorkouts(employee, workouts)
        });
}

function displayEmployeeWorkouts(employee, workouts) {
    const listEmployeesDiv = document.createElement("div");
    const currentWorkouts = workouts.filter(workout => {let workoutDate = new Date(workout.workoutDate);
         return (startDate < workoutDate && workoutDate < endDate)
    });
    let visualWorkout = currentWorkouts.length * 25;
    listEmployeesDiv.innerHTML = `
        <div>${employee.name} & ${currentWorkouts.length}
        <div id="visual-bar" style="background-color: aqua; height: 20px; width: ${visualWorkout}px"></div>
        </div>
    `
    dashboardEmployeesDiv.appendChild(listEmployeesDiv);
}