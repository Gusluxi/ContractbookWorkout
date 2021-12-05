package dk.contractbook.contractbookworkout.repositories;

import dk.contractbook.contractbookworkout.models.ChallengeDate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeDatesRepo extends JpaRepository<ChallengeDate, Long> {
}
