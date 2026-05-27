package upe.br.ProjetoMentis.controller.dtos.user;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import upe.br.ProjetoMentis.controller.dtos.patient.CreatePatientDto;
import upe.br.ProjetoMentis.controller.dtos.professional.CreateProfessionalDto;
import upe.br.ProjetoMentis.infra.enums.UserRole;


public record CreateUserDto(

        @NotNull(message = "A role é obrigatória")
        UserRole role,

        @NotNull(message = "O nome é obrigatório")
        String name,

        @NotNull(message = "O email é obrigatório")
        String email,

        @Valid
        CreatePatientDto patient,

        @Valid
        CreateProfessionalDto professional
) {
}
