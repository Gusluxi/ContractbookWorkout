package dk.contractbook.contractbookworkout.repositories;

import dk.contractbook.contractbookworkout.models.Prize;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrizesRepo extends JpaRepository<Prize, Long> {
}
