package upe.br.ProjetoMentis.infra.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import upe.br.ProjetoMentis.infra.entities.Establishment;

import java.util.UUID;

public interface EstablishmentRepository extends JpaRepository<Establishment, UUID> {
}