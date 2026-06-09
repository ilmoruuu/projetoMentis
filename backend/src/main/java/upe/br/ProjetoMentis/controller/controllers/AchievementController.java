package upe.br.ProjetoMentis.controller.achievement;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upe.br.ProjetoMentis.business.services.achievement.AchievementService;
import upe.br.ProjetoMentis.controller.dtos.achievement.AchievementResponseDto;
import upe.br.ProjetoMentis.controller.dtos.achievement.CreateAchievementDto;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/achievements")
@RequiredArgsConstructor
public class AchievementController {

    private final AchievementService achievementService;

    @GetMapping("/{id}")
    public ResponseEntity<AchievementResponseDto> getAchievementById(@PathVariable UUID id) {
        AchievementResponseDto response = achievementService.getAchievementById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<AchievementResponseDto>> getAllAchievements() {
        List<AchievementResponseDto> response = achievementService.getAllAchievements();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<AchievementResponseDto> createAchievement(@RequestBody @Valid CreateAchievementDto dto) {
        AchievementResponseDto response = achievementService.createAchievement(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AchievementResponseDto> updateAchievement(
            @PathVariable UUID id,
            @RequestBody @Valid CreateAchievementDto dto) {
        AchievementResponseDto response = achievementService.updateAchievement(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable UUID id) {
        achievementService.deleteAchievement(id);
        return ResponseEntity.noContent().build();
    }
}