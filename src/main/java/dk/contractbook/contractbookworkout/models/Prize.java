package dk.contractbook.contractbookworkout.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="prizes")
public class Prize {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String prizeName;

    @Column
    private int challengeGoal;

    @Column
    private String description;

    @Column(length=10000)
    private String prizeImage;

}
