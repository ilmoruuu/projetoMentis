package upe.br.ProjetoMentis.controller.dtos.achievement;

import upe.br.ProjetoMentis.controller.dtos.patientAchievement.PatientAchievementDto;
import upe.br.ProjetoMentis.infra.entities.Achievement;
import upe.br.ProjetoMentis.infra.entities.PatientAchievement;

import java.util.ArrayList;
import java.util.List;

public record AchievementDto(
        String description,
        Integer goalInDays,
        List<PatientAchievementDto> patientAchievements
) {

    public static AchievementDto toDto(Achievement achievement) {
        return new AchievementDto(
                achievement.getDescription(),
                achievement.getGoalInDays(),
                achievement.getPatientAchievements() != null
                        ? achievement.getPatientAchievements().stream().map(PatientAchievementDto::toDto).toList()
                        : new ArrayList<>()
        );
    }

    public static Achievement toEntity(AchievementDto dto) {
        Achievement achievement = new Achievement();
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
