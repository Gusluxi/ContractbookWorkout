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
    public ChallengeAmount addChallengeAmount(@RequestBody ChallengeAmount newChallengeAmount) {
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

    @PatchMapping("/challengeamounts/{id}")
    public String patchChallengeAmount(@PathVariable Long id, @RequestBody ChallengeAmount challengeAmountToUpdate) {
        return challengeAmounts.findById(id).map( foundChallengeAmount -> {
            if(challengeAmountToUpdate.getChallengeAmount() != 0) foundChallengeAmount.setChallengeAmount(challengeAmountToUpdate.getChallengeAmount());
            if(challengeAmountToUpdate.getChallengeMonth() != 0) foundChallengeAmount.setChallengeMonth(challengeAmountToUpdate.getChallengeMonth());
            if(challengeAmountToUpdate.getChallengeYear() != 0) foundChallengeAmount.setChallengeYear(challengeAmountToUpdate.getChallengeYear());
            challengeAmounts.save(foundChallengeAmount);
            return "ChallengeAmount updated";
        }).orElse("ChallengeAmount not found");
    }

    @DeleteMapping("/challengeamounts/{id}")
    public void deleteChallengeAmount(@PathVariable Long id) {
        challengeAmounts.deleteById(id);
    }

}