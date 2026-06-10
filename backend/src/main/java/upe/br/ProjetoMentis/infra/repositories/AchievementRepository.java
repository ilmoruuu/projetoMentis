package upe.br.ProjetoMentis.infra.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import upe.br.ProjetoMentis.infra.entities.Achievement;

import java.util.UUID;

public interface AchievementRepository extends JpaRepository<Achievement, UUID> {
}
