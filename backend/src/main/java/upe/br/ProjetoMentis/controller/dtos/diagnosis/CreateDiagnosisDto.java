package upe.br.ProjetoMentis.controller.dtos.diagnosis;

import upe.br.ProjetoMentis.infra.enums.Cid10;

public record CreateDiagnosisDto(
        Cid10 cid10Principal,
        Cid10 cid10Secondary,
        String observation
) {
}