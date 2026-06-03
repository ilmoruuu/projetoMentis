package upe.br.ProjetoMentis.controller.dtos.patient;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import upe.br.ProjetoMentis.infra.entities.Patient;

import java.time.LocalDate;

public record CreatePatientDto(
        @NotBlank(message = "O nome é obrigatório")
        String name,

        @NotBlank(message = "O e-mail é obrigatório")
        @Email(message = "E-mail inválido")
        String email,

        String cbo,

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
) {
        public static CreatePatientDto toDto(Patient patient){
                return new CreatePatientDto(
                        patient.getUser().getName(),
                        patient.getUser().getEmail(),
                        patient.getCbo(),
                        patient.getDateOfBirth(),
                        patient.getGender(),
                        patient.getSex(),
                        patient.getRace(),
                        patient.getCity(),
                        patient.getUf(),
                        patient.getCep(),
                        patient.getAddress()
                );
        }
}
