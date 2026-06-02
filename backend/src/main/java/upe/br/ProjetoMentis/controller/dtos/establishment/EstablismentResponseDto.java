package upe.br.ProjetoMentis.controller.dtos.establishment;

import upe.br.ProjetoMentis.infra.entities.Establishment;
import upe.br.ProjetoMentis.infra.entities.Patient;
import upe.br.ProjetoMentis.infra.entities.Professional;
import upe.br.ProjetoMentis.infra.enums.FederativeUnit;

import java.util.List;
import java.util.UUID;

public record EstablismentResponseDto(
        UUID id,
        String establishmentName,
        String cnes,
        String city,
        FederativeUnit uf,
        List<Patient> patients,
        List<Professional> professionals
) {
    public static EstablismentResponseDto toDto (Establishment establishment) {
        return new EstablismentResponseDto(
                establishment.getId(),
                establishment.getEstablishmentName(),
                establishment.getCnes(),
                establishment.getCity(),
                establishment.getUf(),
                establishment.getPatients(),
                establishment.getProfessionals()
        );
    }
}
