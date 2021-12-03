const dashboardEmployeesDiv = document.getElementById("dashboard-employees");
let fetchedEmployees

fetchEmployees();
function fetchEmployees() {
    fetch(APIUrl + "/employees")
        .then(response => response.json())
        .then(employees => {
            fetchedEmployees = employees;
            console.log(employees)
        })
}