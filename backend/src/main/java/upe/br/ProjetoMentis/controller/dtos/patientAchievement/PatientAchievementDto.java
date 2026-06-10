package upe.br.ProjetoMentis.controller.dtos.patientAchievement;

import upe.br.ProjetoMentis.infra.entities.Achievement;
import upe.br.ProjetoMentis.infra.entities.Patient;
import upe.br.ProjetoMentis.infra.entities.PatientAchievement;
import upe.br.ProjetoMentis.infra.entities.PatientAchievementId;

import java.time.LocalDate;
import java.util.UUID;

public record PatientAchievementDto(
        UUID patientId,
        UUID achievementId,
        LocalDate acquisitionDate
) {
    public static PatientAchievementDto toDto(PatientAchievement entity) {
        return new PatientAchievementDto(
                entity.getPatient() != null ? entity.getPatient().getId() : null,
                entity.getAchievement() != null ? entity.getAchievement().getId() : null,
                entity.getAcquisitionDate()
        );
    }

    public static PatientAchievement toEntity(PatientAchievementDto dto) {
        if (dto == null) return null;

        PatientAchievement entity = new PatientAchievement();

        PatientAchievementId compositeId = new PatientAchievementId(dto.patientId(), dto.achievementId());
        entity.setId(compositeId);

        if (dto.patientId() != null) {
            Patient patient = new Patient();
            patient.setId(dto.patientId());
            entity.setPatient(patient);
        }

        if (dto.achievementId() != null) {
            Achievement achievement = new Achievement();
            achievement.setId(dto.achievementId());
            entity.setAchievement(achievement);
        }

        entity.setAcquisitionDate(dto.acquisitionDate());

        return entity;
    }
}
