package upe.br.ProjetoMentis.infra.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import upe.br.ProjetoMentis.infra.entities.Diagnosis;

import java.util.UUID;

public interface DiagnosisRepository extends JpaRepository<Diagnosis, UUID> {
}
