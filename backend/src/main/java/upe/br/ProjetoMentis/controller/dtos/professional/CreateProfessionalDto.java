package upe.br.ProjetoMentis.controller.dtos.professional;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import upe.br.ProjetoMentis.infra.entities.Professional;
import upe.br.ProjetoMentis.infra.enums.UserStatus;

public record CreateProfessionalDto(
        @NotBlank(message = "O nome é obrigatório")
        String name,

        @NotBlank(message = "O e-mail é obrigatório")
        @Email(message = "E-mail inválido")
        String email,

        @NotBlank(message = "O registro profissional (crp) é obrigatório")
        String crp
) {
        public static CreateProfessionalDto toDto(Professional professional) {
                return new CreateProfessionalDto(
                        professional.getUser().getName(),
                        professional.getUser().getEmail(),
                        professional.getCrp()
                );
        }
}
