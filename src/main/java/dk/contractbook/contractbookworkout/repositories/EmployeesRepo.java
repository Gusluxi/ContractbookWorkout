package dk.contractbook.contractbookworkout.repositories;

import dk.contractbook.contractbookworkout.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeesRepo extends JpaRepository<Employee, Long> {
}
