package upe.br.ProjetoMentis.controller.dtos.patient;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CreatePatientDto(
        @NotNull(message = "Data de nascimento é obrigatória")
        LocalDate dateOfBirth,

        String gender,

        String sex,

        String race,

        @NotBlank(message = "Cidade é obrigatória")
        String city,

        @NotBlank(message = "UF é obrigatória")
        String uf,

        @NotBlank(message = "CEP é obrigatório")
        String cep,

        @NotBlank(message = "Endereço é obrigatório")
        String address
) {}
