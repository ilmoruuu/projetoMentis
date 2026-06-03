package upe.br.ProjetoMentis.controller.dtos.patient;

import upe.br.ProjetoMentis.infra.enums.UserStatus;

import java.time.LocalDate;

public record UpdatePatientDto(
        String name,
        String email,
        String cbo,
        LocalDate dateOfBirth,
        String gender,
        String sex,
        String race,
        String observation,
        UserStatus status,
        String city,
        String uf,
        String cep,
        String address,
        String sobriedade
) {
}
