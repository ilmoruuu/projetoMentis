package upe.br.ProjetoMentis.controller.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upe.br.ProjetoMentis.business.services.patientAchievement.PatientAchievementService;
import upe.br.ProjetoMentis.controller.dtos.achievement.CreateAchievementDto;
import upe.br.ProjetoMentis.controller.dtos.patientAchievement.CreatePatientAchievementDto;
import upe.br.ProjetoMentis.controller.dtos.patientAchievement.PatientAchievementDto;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/patient-achievements")
@RequiredArgsConstructor
public class PatientAchievementController {

    private final PatientAchievementService patientAchievementService;

    @PostMapping
    public ResponseEntity<PatientAchievementDto> assignAchievementToPatient(
            @RequestBody @Valid CreatePatientAchievementDto dto) {
        PatientAchievementDto response = patientAchievementService.assignAchievementToPatient(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/find")
    public ResponseEntity<PatientAchievementDto> getPatientAchievementById(
            @RequestParam UUID achievementId,
            @RequestParam UUID patientId) {
        PatientAchievementDto response = patientAchievementService.getPatientAchievementById(achievementId, patientId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PatientAchievementDto>> getAllPatientAchievement() {
        List<PatientAchievementDto> response = patientAchievementService.getAllPatientAchievement();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<PatientAchievementDto>> getAllPatientAchievementByPatientId(
            @PathVariable UUID patientId) {
        List<PatientAchievementDto> response = patientAchievementService.getAllPatientAchievementByPatientId(patientId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/achievement/{achievementId}")
    public ResponseEntity<List<PatientAchievementDto>> getAllPatientAchievementByAchievementId(
            @PathVariable UUID achievementId) {
        List<PatientAchievementDto> response = patientAchievementService.getAllPatientAchievementByAchievementId(achievementId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> hasPatientAchievement(
            @RequestParam UUID patientId,
            @RequestParam UUID achievementId) {
        boolean hasAchievement = patientAchievementService.hasPatientAchievement(patientId, achievementId);
        return ResponseEntity.ok(hasAchievement);
    }

    @GetMapping("/patient/{patientId}/count")
    public ResponseEntity<Integer> countAchievementsByPatientId(
            @PathVariable UUID patientId) {
        Integer count = patientAchievementService.countAchievementsByPatientId(patientId);
        return ResponseEntity.ok(count);
    }
}