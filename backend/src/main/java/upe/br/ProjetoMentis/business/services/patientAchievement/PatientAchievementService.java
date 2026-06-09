package upe.br.ProjetoMentis.business.services.patientAchievement;

import upe.br.ProjetoMentis.controller.dtos.patientAchievement.PatientAchievementDto;

import java.util.List;
import java.util.UUID;

public interface PatientAchievementService {

    PatientAchievementDto getPatientAchievementById(UUID achievementId, UUID patientId);
    List<PatientAchievementDto> getAllPatientAchievementByAchievementId(UUID achievementId);
    List<PatientAchievementDto> getAllPatientAchievementByPatientId(UUID patientId);
    List<PatientAchievementDto> getAllPatientAchievement();
    PatientAchievementDto assignAchievementToPatient(PatientAchievementDto dto);
    boolean hasPatientAchievement(UUID patientId, UUID achievementId);
    Integer countAchievementsByPatientId(UUID patientId);

}
