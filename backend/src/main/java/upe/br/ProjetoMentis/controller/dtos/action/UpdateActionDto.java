package upe.br.ProjetoMentis.controller.dtos.action;

import upe.br.ProjetoMentis.infra.enums.ActionCode;

import java.time.YearMonth;
import java.util.UUID;

public record UpdateActionDto(
        UUID id,
        YearMonth competence,
        ActionCode actionCode,
        String description,
        UUID patientId,
        UUID professionalId,
        UUID establishmentId,
        UUID diagnosisId
) {
}