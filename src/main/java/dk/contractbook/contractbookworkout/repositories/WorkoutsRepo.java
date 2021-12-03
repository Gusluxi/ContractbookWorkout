package dk.contractbook.contractbookworkout.repositories;

import dk.contractbook.contractbookworkout.models.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkoutsRepo extends JpaRepository<Workout, Long> {

    @Query(value = "SELECT * FROM workouts WHERE employee_id = ?;", nativeQuery = true)
    List<Workout> findWorkoutsByEmployeeId(Long employeeId);
}
