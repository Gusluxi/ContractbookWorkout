package dk.contractbook.contractbookworkout.controllers;

import dk.contractbook.contractbookworkout.models.Employee;
import dk.contractbook.contractbookworkout.repositories.EmployeesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Employees {

    @Autowired
    EmployeesRepo employees;


    @GetMapping("/employees")
    public Iterable<Employee> getEmployee() {
        return employees.findAll();
    }

    @GetMapping("/employees/{id}")
    public Employee getEmployee(@PathVariable Long id) {
        return employees.findById(id).get();
    }

    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee newEmployees) {
        newEmployees.setId(null);
        return employees.save(newEmployees);
    }

    @PutMapping("/employees/{id}")
    public String updateEmployee(@PathVariable Long id, @RequestBody Employee employeeToUpdate){
        if(employees.existsById(id)) {
            employeeToUpdate.setId(id);
            employees.save(employeeToUpdate);
            return "Employees was updated";
        } else {
            return "Employees not found";
        }
    }

    @PatchMapping("/summoners/{id}")
    public String patchEmployee(@PathVariable Long id, @RequestBody Employee employeeToUpdate) {
        return employees.findById(id).map( foundEmployee -> {
            if(employeeToUpdate.getSummonerId() != null) foundEmployee.setSummonerId(employeeToUpdate.getName());
            if(employeeToUpdate.getPuuId() != null) foundEmployee.setPuuId(employeeToUpdate.getPuuId());
            if(employeeToUpdate.getName() != null) foundEmployee.setName(employeeToUpdate.getName());
            employees.save(employeeToUpdate);
            return "Employee updated";
        }).orElse("Employee not found");
    }

    @DeleteMapping("/employees/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employees.deleteById(id);
    }
}
