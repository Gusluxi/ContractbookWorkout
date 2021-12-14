package dk.contractbook.contractbookworkout.repositories;

import dk.contractbook.contractbookworkout.models.ChallengeAmount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeAmountRepo extends JpaRepository<ChallengeAmount, Long> {
}

