package upe.br.ProjetoMentis.controller.dtos.checkin;

import upe.br.ProjetoMentis.infra.entities.CheckIn;

import java.time.LocalDate;
import java.util.UUID;

public record CheckInResponseDto(
        UUID id,
        Boolean status,
        LocalDate date,
        UUID patientId
) {

    public static CheckInResponseDto toDto(
            CheckIn checkIn) {

        return new CheckInResponseDto(
                checkIn.getId(),
                checkIn.getStatus(),
                checkIn.getDate(),
                checkIn.getPatient().getId()
        );
    }
}