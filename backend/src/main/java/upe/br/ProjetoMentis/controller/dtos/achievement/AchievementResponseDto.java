package upe.br.ProjetoMentis.controller.dtos.achievement;

import upe.br.ProjetoMentis.controller.dtos.patientAchievement.PatientAchievementDto;
import upe.br.ProjetoMentis.infra.entities.Achievement;
import upe.br.ProjetoMentis.infra.entities.PatientAchievement;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public record AchievementResponseDto(
        UUID id,
        String description,
        Integer goalInDays,
        List<PatientAchievementDto> patientAchievements
) {

    public static AchievementResponseDto toDto(Achievement achievement) {
        return new AchievementResponseDto(
                achievement.getId(),
                achievement.getDescription(),
                achievement.getGoalInDays(),
                achievement.getPatientAchievements() != null
                        ? achievement.getPatientAchievements().stream().map(PatientAchievementDto::toDto).toList()
                        : new ArrayList<>()
        );
    }

    public static Achievement toEntity(AchievementResponseDto dto) {
        Achievement achievement = new Achievement();
        achievement.setId(dto.id);
        achievement.setDescription(dto.description);
        achievement.setGoalInDays(dto.goalInDays);

        List<PatientAchievement> patientAchievementList = dto.patientAchievements
                .stream()
                .map(PatientAchievementDto::toEntity)
                .toList();

        achievement.setPatientAchievements(
                patientAchievementList
        );

        return achievement;
    }
}
