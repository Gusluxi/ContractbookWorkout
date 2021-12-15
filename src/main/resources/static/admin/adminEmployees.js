const employeeTableBody = document.getElementById("employee-table-tbody");


fetch(APIUrl + "/employees")
.then(respose => respose.json())
.then(employees => {
    employees.map(createEmployeeTableRow);
});

function createEmployeeTableRow(employee) {
    const employeeTableRow = document.createElement("tr");
    employeeTableRow.id = employee.id;

    employeeTableBody.appendChild(employeeTableRow);

    constructEmployeeTableRow(employeeTableRow, employee);
}


function constructEmployeeTableRow(employeeTableRow, employee) {
    employeeTableRow.innerHTML = `
            <td>
                <a href="./employeeWorkoutEdit.html?employeeId=${employee.id}"><img src="${employee.slackImage}" alt="Employee Image" width="50px">${employee.name}</a>
            </td>
    `;

}

function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("name-search");
    filter = input.value.toUpperCase();
    table = document.getElementById("employee-table");
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