package dk.contractbook.contractbookworkout.controllers;

import dk.contractbook.contractbookworkout.models.Workout;
import dk.contractbook.contractbookworkout.repositories.WorkoutsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Workouts {

    @Autowired
    WorkoutsRepo workouts;


    @GetMapping("/workouts")
    public Iterable<Workout> getWorkout() {
        return workouts.findAll();
    }

    @GetMapping("/workouts/{id}")
    public Workout getWorkout(@PathVariable Long id) {
        return workouts.findById(id).get();
    }

    @GetMapping("/workouts/employees/{id}")
    public List<Workout> getEmployeeWorkouts(@PathVariable Long id) {
        return workouts.findWorkoutsByEmployeeId(id);
    }

    @PostMapping("/workouts")
    public Workout addWorkout(@RequestBody Workout newWorkout) {
        System.out.println(newWorkout);
        newWorkout.setId(null);
        System.out.println(newWorkout);
        return workouts.save(newWorkout);
    }

    @PutMapping("/workouts/{id}")
    public String updateWorkout(@PathVariable Long id, @RequestBody Workout workoutsToUpdate){
        if(workouts.existsById(id)) {
            workoutsToUpdate.setId(id);
            workouts.save(workoutsToUpdate);
            return "Workout was updated";
        } else {
            return "Workout not found";
        }
    }

    /*
    @PatchMapping("/workouts/{id}")
    public String patchWorkout(@PathVariable Long id, @RequestBody Workout workoutsToUpdate) {
        return workouts.findById(id).map( foundWorkout -> {
            if(workoutsToUpdate.getWorkoutsId() != null) foundWorkout.setWorkoutId(workoutsToUpdate.getName());
            if(workoutsToUpdate.getPuuId() != null) foundWorkout.setPuuId(workoutsToUpdate.getPuuId());
            if(workoutsToUpdate.getName() != null) foundWorkout.setName(workoutsToUpdate.getName());
            workouts.save(foundWorkout);
            return "Workout updated";
        }).orElse("Workout not found");
    }
*/
    @DeleteMapping("/workouts/{id}")
    public void deleteWorkout(@PathVariable Long id) {
        workouts.deleteById(id);
    }

}
