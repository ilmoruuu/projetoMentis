package upe.br.ProjetoMentis.controller.dtos.patientAchievement;

import java.util.UUID;

public record CreatePatientAchievementDto(
        UUID patientId,
        UUID achievementId
) {
}
