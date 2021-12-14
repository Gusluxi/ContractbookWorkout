package dk.contractbook.contractbookworkout.controllers;

import dk.contractbook.contractbookworkout.models.ChallengeAmount;
import dk.contractbook.contractbookworkout.repositories.ChallengeAmountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ChallengeAmounts {

    @Autowired
    ChallengeAmountRepo challengeAmounts;


    @GetMapping("/challengeamounts")
    public Iterable<ChallengeAmount> getChallengeAmount() { return challengeAmounts.findAll();
    }


    @PostMapping("/challengeamounts")
    public ChallengeAmount addWorkout(@RequestBody ChallengeAmount newChallengeAmount) {
        newChallengeAmount.setId(null);
        return challengeAmounts.save(newChallengeAmount);
    }

    @PutMapping("/challengeamounts/{id}")
    public String updateChallengeAmount(@PathVariable Long id, @RequestBody ChallengeAmount challengeAmountToUpdate){
        if(challengeAmounts.existsById(id)) {
            challengeAmountToUpdate.setId(id);
            challengeAmounts.save(challengeAmountToUpdate);
            return "Challenge Amount was updated";
        } else {
            return "Challenge Amount not found";
        }
    }

    @DeleteMapping("/challengeAmount/{id}")
    public void deleteChallengeAmount(@PathVariable Long id) {
        challengeAmounts.deleteById(id);
    }

}