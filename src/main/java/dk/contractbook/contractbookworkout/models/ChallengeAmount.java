package dk.contractbook.contractbookworkout.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Table(name="challenge_amounts")
@Entity
public class ChallengeAmount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private int challengeAmount;

    @Column
    private int challengeYear;

    @Column
    private int challengeMonth;
}
