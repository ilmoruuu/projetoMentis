package upe.br.ProjetoMentis.controller.dtos.diagnosis;

import upe.br.ProjetoMentis.infra.enums.Cid10;

import java.util.UUID;

public record UpdateDiagnosisDto(
        UUID id,
        Cid10 cid10Principal,
        Cid10 cid10Secondary,
        String observation
) {
}