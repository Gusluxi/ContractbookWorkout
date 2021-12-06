const dashboardEmployeesDiv = document.getElementById("dashboard-employees");
let allEmployees;
let allWorkouts;
let date = new Date();
let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
let endDate = new Date(date.getFullYear(), date.getMonth() +1, 0);


fetch(APIUrl + "/employees")
    .then(response => response.json())
    .then(employees => {
        allEmployees = employees;
        console.log("Employees",employees);
        fetch(APIUrl + "/workouts")
            .then(response => response.json())
            .then(workouts => {
                allWorkouts = workouts;
                console.log("Workouts",workouts)
                filterEmployees(allEmployees, allWorkouts)
                fetch(APIUrl + "/challengedates")
                    .then(response => response.json())
                    .then(challengeDates => {
                        challengeDates.map(challengeDate =>{
                            displayTopEmployeeChallenges(allEmployees, allWorkouts, challengeDate)
                        })
                    })
            });
    })




function filterEmployees(employees, workouts) {
    let newWorkouts = workouts.filter(workout => filterWorkoutsForMonth(workout))
    employees.sort((employeeA,employeeB) => sortEmployeeByWorkoutCount(employeeA,employeeB,newWorkouts));

    employees.map(filteredEmployee => {
        let filteredWorkoutsByEmployee = workouts.filter(workout => workout.employee.id === filteredEmployee.id)
        if (filteredWorkoutsByEmployee.length !== 0) {
            displayEmployeeWorkouts(filteredEmployee, filteredWorkoutsByEmployee)
        }
    })

}

function displayEmployeeWorkouts(employee, workouts) {
    const listEmployeesDiv = document.createElement("div");
    listEmployeesDiv.id=employee.id;
    const currentWorkouts = workouts.filter(workout => filterWorkoutsForMonth(workout));
    listEmployeesDiv.innerHTML = `
        <div class="employee-card">
            <a href="../employee/employee.html?employeeId=${employee.id}"><img src="${employee.slackImage}" alt="Employee Image" width="50px"></a>
            <div class="name-bar-wrapper">
                <div class="name-wrapper"><a href="../employee/employee.html?employeeId=${employee.id}">${employee.name}s Workouts: ${currentWorkouts.length}</a></div>
                <div id="visual-bar-${employee.id}" class="visual-bar"></div>
            </div>
        </div>
    `
    dashboardEmployeesDiv.appendChild(listEmployeesDiv);
    const visualBar = document.getElementById(`visual-bar-${employee.id}`);

    let progressBar = currentWorkouts.length * 4.25+"%";
    if (currentWorkouts.length > 23) {
        progressBar = "100%";
    }
    visualBar.style.backgroundColor = "#4c58ed";
    if (currentWorkouts.length >= 20) {
        visualBar.style.backgroundColor = "#00de9f";
    }
    visualBar.style.width = progressBar;
    visualBar.addEventListener("mouseover", event => {
        //event.target.style.backgroundColor = "#515757";
        event.target.innerHTML = currentWorkouts.length;
    })
    visualBar.addEventListener("mouseout", event => {
        //event.target.style.backgroundColor = "#a5a7a7";
        event.target.innerHTML = "";
    })
}


function filterWorkoutsForMonth(workout) {
    let workoutDate = new Date(workout.workoutDate);
    return (startDate < workoutDate && workoutDate < endDate)
}

function sortEmployeeByWorkoutCount(employeeA, employeeB, workouts) {
    let employeeAWorkouts = workouts.filter(workoutA => workoutA.employee.id === employeeA.id);
    let employeeBWorkouts = workouts.filter(workoutB => workoutB.employee.id === employeeB.id);
    if (employeeAWorkouts.length > employeeBWorkouts.length) {
        return -1;
    } if (employeeAWorkouts.length < employeeBWorkouts.length) {
        return 1;
    } else {
        return 0;
    }
}