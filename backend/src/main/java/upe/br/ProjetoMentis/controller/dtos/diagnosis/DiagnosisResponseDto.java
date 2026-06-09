package upe.br.ProjetoMentis.controller.dtos.diagnosis;

import upe.br.ProjetoMentis.infra.entities.Diagnosis;
import upe.br.ProjetoMentis.infra.enums.Cid10;

import java.util.UUID;

public record DiagnosisResponseDto(
        UUID id,
        Cid10 cid10Principal,
        Cid10 cid10Secondary,
        String observation
) {

    public static DiagnosisResponseDto toDto(
            Diagnosis diagnosis) {

        return new DiagnosisResponseDto(
                diagnosis.getId(),
                diagnosis.getCid10_principal(),
                diagnosis.getCid10_secondary(),
                diagnosis.getObservation()
        );
    }
}