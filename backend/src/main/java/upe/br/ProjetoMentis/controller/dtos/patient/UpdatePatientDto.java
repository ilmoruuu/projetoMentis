package upe.br.ProjetoMentis.controller.dtos.patient;

import java.time.LocalDate;

public record UpdatePatientDto(
        String name,
        String email,
        String cbo,
        LocalDate dateOfBirth,
        String gender,
        String sex,
        String race,
        String city,
        String uf,
        String cep,
        String address,
        String sobriety
) {
}
