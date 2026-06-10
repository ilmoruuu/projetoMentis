package upe.br.ProjetoMentis.infra.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import upe.br.ProjetoMentis.infra.entities.HumorHistory;

import java.util.List;
import java.util.UUID;

public interface HumorHistoryRepository extends JpaRepository<HumorHistory, UUID> {
    List<HumorHistory> findByPatientId(UUID patientId);
}