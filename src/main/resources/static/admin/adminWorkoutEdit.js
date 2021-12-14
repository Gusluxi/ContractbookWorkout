const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const employeeId = URLParams.get("employeeId");
let currentEmployee;
const employeeWorkoutTableBody = document.getElementById("employee-workout-table-tbody");

fetch(APIUrl + "/workouts/employees/" + employeeId )
    .then(response => response.json())
    .then(employeeWorkouts => {
        employeeWorkouts.map(createWorkoutTableRow);
    });

fetch(APIUrl + "/employees/" + employeeId )
    .then(response => response.json())
    .then(employee => {
        currentEmployee = employee;


    });

function createWorkoutTableRow(workout) {
    const workoutTableRow = document.createElement("tr");
    workoutTableRow.id = workout.id;

    employeeWorkoutTableBody.appendChild(workoutTableRow);

    constructWorkoutTableRow(workoutTableRow, workout);
}

function constructWorkoutTableRow(workoutTableRow, workout) {
    workoutTableRow.innerHTML = `
    <td>
        <p class="row-workout-date">${workout.workoutDate}</p>
    </td>
    <td>
        <button onclick="deleteWorkout(${workout.id})">❌</button>
    </td>
    `;
}

function deleteWorkout(workoutId) {
    fetch(APIUrl + "/workouts/" + workoutId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(workoutId).remove();
        } else {
            console.log(response.status);
        }
    });
}

function addWorkout() {
    const date = document.getElementById("new-workout-date").value;

    const newWorkout = {
        workoutDate: date,
        employee: currentEmployee
    };

    fetch(APIUrl + "/workouts", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newWorkout)
    })
        .then(response => {
            if (response.status === 200) {
                createWorkoutTableRow(newWorkout);
            } else {
                console.log("New workout not created", response.status);
            }
        })
        .catch(error => console.log("Network related error: ", error));
}

document.getElementById("create-new-workout-button")
    .addEventListener("click", addWorkout);

function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("date-search");
    filter = input.value.toUpperCase();
    table = document.getElementById("workout-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}