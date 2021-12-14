package dk.contractbook.contractbookworkout.controllers;

import dk.contractbook.contractbookworkout.models.ChallengeDate;
import dk.contractbook.contractbookworkout.repositories.ChallengeDatesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class ChallengeDates {

    @Autowired
    ChallengeDatesRepo challengeDates;


    @GetMapping("/challengedates")
    public Iterable<ChallengeDate> getChallengeDates() {
        return challengeDates.findAll();
    }

    @PutMapping("/challengedates/{id}")
    public String updateChallengeDate(@PathVariable Long id, @RequestBody ChallengeDate challengeDateToUpdate){
        if(challengeDates.existsById(id)) {
            challengeDateToUpdate.setId(id);
            challengeDates.save(challengeDateToUpdate);
            return "Date was updated";
        } else {
            return "Date not found";
        }
    }
}
