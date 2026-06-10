package upe.br.ProjetoMentis.controller.dtos.checkin;

import java.time.LocalDate;
import java.util.UUID;

public record UpdateCheckInDto(
        UUID id,
        Boolean status,
        LocalDate date
) {
}