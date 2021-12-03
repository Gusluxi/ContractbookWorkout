package dk.contractbook.contractbookworkout.repositories;

import dk.contractbook.contractbookworkout.models.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutsRepo extends JpaRepository<Workout, Long> {
}
