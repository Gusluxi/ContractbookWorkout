package dk.contractbook.contractbookworkout.controllers;

import dk.contractbook.contractbookworkout.models.ChallengeAmount;
import dk.contractbook.contractbookworkout.models.Prize;
import dk.contractbook.contractbookworkout.repositories.PrizesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Prizes {

    @Autowired
    PrizesRepo prizes;


    @GetMapping("/prizes")
    public Iterable<Prize> getPrize() {
        return prizes.findAll();
    }

    @GetMapping("/prizes/{id}")
    public Prize getPrize(@PathVariable Long id) {
        return prizes.findById(id).get();
    }

    @PostMapping("/prizes")
    public Prize addPrize(@RequestBody Prize newPrize) {
        newPrize.setId(null);
        return prizes.save(newPrize);
    }

    @PutMapping("/prizes/{id}")
    public String updatePrize(@PathVariable Long id, @RequestBody Prize prizeToUpdate){
        if(prizes.existsById(id)) {
            prizeToUpdate.setId(id);
            prizes.save(prizeToUpdate);
            return "Prize was updated";
        } else {
            return "Prize not found";
        }
    }

    @PatchMapping("/prizes/{id}")
    public String patchPrizeAmount(@PathVariable Long id, @RequestBody Prize prizeToUpdate) {
        return prizes.findById(id).map( foundPrize -> {
            if(prizeToUpdate.getPrizeName() != null) foundPrize.setPrizeName(prizeToUpdate.getPrizeName());
            if(prizeToUpdate.getDescription() != null) foundPrize.setDescription(prizeToUpdate.getDescription());
            if(prizeToUpdate.getPrizeImage() != null) foundPrize.setPrizeImage(prizeToUpdate.getPrizeImage());
            if(prizeToUpdate.getChallengeGoal() != 0) foundPrize.setChallengeGoal(prizeToUpdate.getChallengeGoal());
            prizes.save(foundPrize);
            return "Prize updated";
        }).orElse("Prize not found");
    }

    @DeleteMapping("/prizes/{id}")
    public void deletePrize(@PathVariable Long id) {
        prizes.deleteById(id);
    }
}
