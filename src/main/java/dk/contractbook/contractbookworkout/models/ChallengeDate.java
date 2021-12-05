package dk.contractbook.contractbookworkout.models;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Table(name="challenge_dates")
@Entity
public class ChallengeDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;
}
