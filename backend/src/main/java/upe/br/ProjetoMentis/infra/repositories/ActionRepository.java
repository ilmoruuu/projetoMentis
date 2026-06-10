package upe.br.ProjetoMentis.infra.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import upe.br.ProjetoMentis.infra.entities.Actions;

import java.util.List;
import java.util.UUID;

public interface ActionRepository
        extends JpaRepository<Actions, UUID> {

    List<Actions> findByPatientId(UUID patientId);

    List<Actions> findByProfessionalId(UUID professionalId);

    List<Actions> findByEstablishmentId(UUID establishmentId);

    List<Actions> findByDiagnosisId(UUID diagnosisId);
}