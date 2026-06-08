package upe.br.ProjetoMentis.infra.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import upe.br.ProjetoMentis.infra.entities.PatientAchievement;

import java.util.UUID;

public interface PatientAchievementRepository extends JpaRepository<PatientAchievement, UUID> {
}
