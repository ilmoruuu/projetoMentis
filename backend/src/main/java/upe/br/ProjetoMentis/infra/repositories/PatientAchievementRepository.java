package upe.br.ProjetoMentis.infra.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import upe.br.ProjetoMentis.infra.entities.PatientAchievement;
import upe.br.ProjetoMentis.infra.entities.PatientAchievementId;

import java.util.List;
import java.util.UUID;

public interface PatientAchievementRepository extends JpaRepository<PatientAchievement, PatientAchievementId> {

    List<PatientAchievement> findById_PatientId(UUID patientId);
    List<PatientAchievement> findById_AchievementId(UUID achievementId);
    long countById_PatientId(UUID patientId);
}
