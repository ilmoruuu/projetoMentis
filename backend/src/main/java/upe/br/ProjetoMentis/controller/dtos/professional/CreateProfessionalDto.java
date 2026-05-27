package upe.br.ProjetoMentis.controller.dtos.professional;

import jakarta.validation.constraints.NotBlank;

public record CreateProfessionalDto(
        @NotBlank(message = "O registro profissional (CRFA) é obrigatório")
        String crfa,

        @NotBlank(message = "A especialidade é obrigatória")
        String specialty
) {}
