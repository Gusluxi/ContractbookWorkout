package dk.contractbook.contractbookworkout.models;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Table(name="workouts")
@Entity
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private LocalDate workoutDates;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    @Nullable
    private Employee employee;
}
