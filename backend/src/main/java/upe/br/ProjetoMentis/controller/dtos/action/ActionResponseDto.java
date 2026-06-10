package upe.br.ProjetoMentis.controller.dtos.action;

import upe.br.ProjetoMentis.infra.entities.Actions;
import upe.br.ProjetoMentis.infra.enums.ActionCode;

import java.time.YearMonth;
import java.util.UUID;

public record ActionResponseDto(
        UUID id,
        YearMonth competence,
        ActionCode actionCode,
        String description,
        UUID patientId,
        UUID professionalId,
        UUID establishmentId,
        UUID diagnosisId
) {

    public static ActionResponseDto toDto(
            Actions action) {

        return new ActionResponseDto(
                action.getId(),
                action.getCompetence(),
                action.getActionCode(),
                action.getDescription(),
                action.getPatient().getId(),
                action.getProfessional().getId(),
                action.getEstablishment().getId(),
                action.getDiagnosis().getId()
        );
    }
}