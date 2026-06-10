package upe.br.ProjetoMentis.controller.dtos.checkin;

import java.time.LocalDate;
import java.util.UUID;

public record CreateCheckInDto(
        Boolean status,
        UUID patientId,
        LocalDate date
) {
}